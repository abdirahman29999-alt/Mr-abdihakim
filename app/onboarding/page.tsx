"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { Logo } from "@/components/Logo";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import {
  currentAccount,
  saveAccount,
  type Account,
  type KnowledgeItem,
} from "@/lib/store";

const STEPS = [
  { id: 1, label: "Agent IA" },
  { id: 2, label: "Base de connaissances" },
  { id: 3, label: "CRM" },
  { id: 4, label: "Connexion WhatsApp" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [step, setStep] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const acc = currentAccount();
    if (!acc) {
      router.replace("/login");
      return;
    }
    setAccount(acc);
    setReady(true);
  }, [router]);

  function update(mutate: (a: Account) => void) {
    setAccount((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      mutate(next);
      saveAccount(next);
      return next;
    });
  }

  function finish() {
    update((a) => {
      a.onboardingDone = true;
    });
    router.push("/dashboard");
  }

  if (!ready || !account) {
    return (
      <main className="grid min-h-screen place-items-center text-slate-500">
        Chargement…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-px flex h-16 items-center justify-between">
          <Logo />
          <p className="text-sm text-slate-500">
            Bonjour {account.fullName.split(" ")[0] || "👋"}
          </p>
        </div>
      </header>

      <div className="container-px py-10">
        <div className="mx-auto max-w-3xl">
          {/* Progression */}
          <ol className="mb-8 flex items-center gap-2">
            {STEPS.map((s, i) => {
              const done = step > s.id;
              const active = step === s.id;
              return (
                <li key={s.id} className="flex flex-1 items-center gap-2">
                  <span
                    className={
                      "grid h-8 w-8 flex-none place-items-center rounded-full text-sm font-semibold " +
                      (done
                        ? "bg-brand-600 text-white"
                        : active
                        ? "bg-brand-100 text-brand-700 ring-2 ring-brand-500"
                        : "bg-slate-200 text-slate-500")
                    }
                  >
                    {done ? <CheckIcon className="h-4 w-4" /> : s.id}
                  </span>
                  <span
                    className={
                      "hidden text-sm sm:block " +
                      (active ? "font-semibold text-ink-900" : "text-slate-500")
                    }
                  >
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="mx-1 hidden h-px flex-1 bg-slate-200 sm:block" />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="card">
            {step === 1 && (
              <AgentStep account={account} update={update} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <KnowledgeStep
                account={account}
                update={update}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <CrmStep
                account={account}
                update={update}
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}
            {step === 4 && (
              <WhatsAppStep
                account={account}
                update={update}
                onBack={() => setStep(3)}
                onFinish={finish}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Étape 1 : Agent IA ---------- */
function AgentStep({
  account,
  update,
  onNext,
}: {
  account: Account;
  update: (m: (a: Account) => void) => void;
  onNext: () => void;
}) {
  const a = account.agent;
  return (
    <div>
      <h2 className="text-xl font-bold">Configurez votre agent IA</h2>
      <p className="mt-1 text-sm text-slate-500">
        Ces informations aident l'agent à répondre dans le ton et la langue de votre marque.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Nom affiché de l'entreprise</label>
          <input
            className="input"
            value={a.businessName}
            onChange={(e) => update((x) => (x.agent.businessName = e.target.value))}
          />
        </div>
        <div>
          <label className="label">Secteur d'activité</label>
          <input
            className="input"
            placeholder="E-commerce, restaurant, services…"
            value={a.sector}
            onChange={(e) => update((x) => (x.agent.sector = e.target.value))}
          />
        </div>
        <div>
          <label className="label">Ton de l'agent</label>
          <select
            className="input"
            value={a.tone}
            onChange={(e) =>
              update((x) => (x.agent.tone = e.target.value as Account["agent"]["tone"]))
            }
          >
            <option value="amical">Amical</option>
            <option value="professionnel">Professionnel</option>
            <option value="direct">Direct</option>
          </select>
        </div>
        <div>
          <label className="label">Langue principale</label>
          <select
            className="input"
            value={a.language}
            onChange={(e) =>
              update((x) => (x.agent.language = e.target.value as Account["agent"]["language"]))
            }
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="ar">Arabe</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="label">Message de bienvenue</label>
        <textarea
          className="input min-h-24"
          value={a.welcomeMessage}
          onChange={(e) => update((x) => (x.agent.welcomeMessage = e.target.value))}
        />
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-ink-800">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          checked={a.escalateToHuman}
          onChange={(e) => update((x) => (x.agent.escalateToHuman = e.target.checked))}
        />
        Transférer à un agent humain pour les demandes complexes
      </label>

      <div className="mt-8 flex justify-end">
        <button className="btn-primary" onClick={onNext}>
          Continuer
        </button>
      </div>
    </div>
  );
}

/* ---------- Étape 2 : Base de connaissances ---------- */
function KnowledgeStep({
  account,
  update,
  onBack,
  onNext,
}: {
  account: Account;
  update: (m: (a: Account) => void) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [type, setType] = useState<KnowledgeItem["type"]>("link");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  function addItem() {
    if (!label.trim() || !value.trim()) return;
    update((x) =>
      x.knowledge.push({
        id: Math.random().toString(36).slice(2),
        type,
        label: label.trim(),
        value: value.trim(),
      })
    );
    setLabel("");
    setValue("");
  }

  function remove(id: string) {
    update((x) => {
      x.knowledge = x.knowledge.filter((k) => k.id !== id);
    });
  }

  const typeLabels: Record<KnowledgeItem["type"], string> = {
    link: "Lien",
    document: "Document",
    text: "Texte",
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Base de connaissances</h2>
      <p className="mt-1 text-sm text-slate-500">
        Ajoutez tout ce dont l'agent a besoin pour répondre : liens (site, FAQ, catalogue),
        documents et informations clés.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[140px_1fr_1fr_auto]">
        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value as KnowledgeItem["type"])}
        >
          <option value="link">Lien</option>
          <option value="document">Document</option>
          <option value="text">Texte</option>
        </select>
        <input
          className="input"
          placeholder="Intitulé (ex : FAQ livraison)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          className="input"
          placeholder={
            type === "link"
              ? "https://…"
              : type === "document"
              ? "Nom ou URL du document"
              : "Information à retenir"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button className="btn-outline" onClick={addItem} type="button">
          Ajouter
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {account.knowledge.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            Aucune source pour l'instant. Ajoutez au moins votre site web ou votre FAQ.
          </p>
        ) : (
          account.knowledge.map((k) => (
            <div
              key={k.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-900">
                  <span className="mr-2 rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                    {typeLabels[k.type]}
                  </span>
                  {k.label}
                </p>
                <p className="truncate text-xs text-slate-500">{k.value}</p>
              </div>
              <button
                className="ml-4 flex-none text-sm font-medium text-red-600 hover:underline"
                onClick={() => remove(k.id)}
              >
                Retirer
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Continuer
        </button>
      </div>
    </div>
  );
}

/* ---------- Étape 3 : CRM ---------- */
function CrmStep({
  account,
  update,
  onBack,
  onNext,
}: {
  account: Account;
  update: (m: (a: Account) => void) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const c = account.crm;
  const [connecting, setConnecting] = useState(false);

  function connect() {
    if (!c.provider) return;
    setConnecting(true);
    // MVP : connexion simulée. En production, OAuth / clé API réelle côté backend.
    setTimeout(() => {
      update((x) => (x.crm.connected = true));
      setConnecting(false);
    }, 900);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Connexion CRM (optionnel)</h2>
      <p className="mt-1 text-sm text-slate-500">
        Connectez votre CRM pour que l'agent retrouve les informations du client
        (commandes, historique) et donne des réponses personnalisées.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Votre CRM</label>
          <select
            className="input"
            value={c.provider}
            onChange={(e) =>
              update((x) => {
                x.crm.provider = e.target.value as Account["crm"]["provider"];
                x.crm.connected = false;
              })
            }
          >
            <option value="">— Aucun pour l'instant —</option>
            <option value="hubspot">HubSpot</option>
            <option value="zoho">Zoho CRM</option>
            <option value="salesforce">Salesforce</option>
            <option value="sheet">Google Sheets</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="label">Clé API / jeton</label>
          <input
            className="input"
            type="password"
            placeholder="Collez votre clé API"
            value={c.apiKey}
            onChange={(e) =>
              update((x) => {
                x.crm.apiKey = e.target.value;
                x.crm.connected = false;
              })
            }
            disabled={!c.provider}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {c.connected ? (
          <span className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
            <CheckIcon className="h-4 w-4" /> CRM connecté
          </span>
        ) : (
          <button
            className="btn-outline"
            onClick={connect}
            disabled={!c.provider || !c.apiKey || connecting}
            type="button"
          >
            {connecting ? "Connexion…" : "Connecter le CRM"}
          </button>
        )}
      </div>

      <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Vous pouvez passer cette étape et connecter votre CRM plus tard depuis votre tableau de bord.
      </p>

      <div className="mt-8 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Continuer
        </button>
      </div>
    </div>
  );
}

/* ---------- Étape 4 : Connexion WhatsApp (QR) ---------- */
function WhatsAppStep({
  account,
  update,
  onBack,
  onFinish,
}: {
  account: Account;
  update: (m: (a: Account) => void) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [qr, setQr] = useState<string>("");
  const [scanning, setScanning] = useState(false);

  // Jeton d'appairage factice (en production, fourni par le service WhatsApp).
  const pairingToken = useMemo(
    () => `replio:pair:${account.email}:${Date.now().toString(36)}`,
    [account.email]
  );

  useEffect(() => {
    QRCode.toDataURL(pairingToken, { width: 260, margin: 1 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [pairingToken]);

  function simulateScan() {
    setScanning(true);
    setTimeout(() => {
      update((x) => (x.whatsappConnected = true));
      setScanning(false);
    }, 1400);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Connectez votre WhatsApp</h2>
      <p className="mt-1 text-sm text-slate-500">
        Ouvrez WhatsApp sur votre téléphone → Appareils connectés → Connecter un appareil,
        puis scannez ce QR code. C'est la dernière étape !
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-6">
          {account.whatsappConnected ? (
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700">
                <CheckIcon className="h-8 w-8" />
              </span>
              <p className="mt-3 font-semibold text-ink-900">WhatsApp connecté ✅</p>
              <p className="text-sm text-slate-500">Votre agent est prêt à répondre.</p>
            </div>
          ) : qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt="QR code de connexion WhatsApp" className="h-56 w-56" />
          ) : (
            <div className="h-56 w-56 animate-pulse rounded-xl bg-slate-100" />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <ol className="space-y-3 text-sm text-ink-800">
            <li className="flex gap-2">
              <span className="font-semibold text-brand-700">1.</span> Ouvrez WhatsApp sur votre téléphone.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand-700">2.</span> Allez dans Réglages → Appareils connectés.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand-700">3.</span> Touchez « Connecter un appareil » et scannez le QR.
            </li>
          </ol>

          {!account.whatsappConnected && (
            <button
              className="btn-primary mt-6"
              onClick={simulateScan}
              disabled={scanning || !qr}
              type="button"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {scanning ? "Connexion en cours…" : "J'ai scanné le QR code"}
            </button>
          )}
          <p className="mt-3 text-xs text-slate-400">
            Démo MVP : la connexion WhatsApp réelle sera activée via le service d'appairage.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          Retour
        </button>
        <button
          className="btn-primary"
          onClick={onFinish}
          disabled={!account.whatsappConnected}
        >
          Terminer et accéder au tableau de bord
        </button>
      </div>
    </div>
  );
}
