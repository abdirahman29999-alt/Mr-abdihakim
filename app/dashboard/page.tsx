"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import {
  currentAccount,
  logout,
  saveAccount,
  trialDaysLeft,
  type Account,
} from "@/lib/store";
import { plans, site } from "@/lib/site";

export default function DashboardPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
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

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function toggleAgent() {
    setAccount((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      next.whatsappConnected = !next.whatsappConnected;
      saveAccount(next);
      return next;
    });
  }

  if (!ready || !account) {
    return (
      <main className="grid min-h-screen place-items-center text-slate-500">
        Chargement…
      </main>
    );
  }

  const daysLeft = trialDaysLeft(account);
  const plan = plans.find((p) => p.id === account.plan);
  const checklist = [
    { label: "Agent IA configuré", done: !!account.agent.sector },
    { label: "Base de connaissances ajoutée", done: account.knowledge.length > 0 },
    { label: "CRM connecté", done: account.crm.connected },
    { label: "WhatsApp connecté", done: account.whatsappConnected },
  ];
  const completion = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-px flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:block">
              {account.company}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-slate-600 hover:text-brand-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="container-px py-10">
        <div className="mx-auto max-w-5xl">
          {/* En-tête */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Bonjour {account.fullName.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Voici l'état de votre agent WhatsApp.
              </p>
            </div>
            <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm">
              <span className="font-semibold text-brand-700">
                Essai gratuit : {daysLeft} jour{daysLeft > 1 ? "s" : ""} restant
                {daysLeft > 1 ? "s" : ""}
              </span>
              <span className="text-brand-700/70"> • offre {plan?.name}</span>
            </div>
          </div>

          {/* Bannière statut agent */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink-900 p-6 text-white">
            <div className="flex items-center gap-4">
              <span
                className={
                  "grid h-12 w-12 place-items-center rounded-xl " +
                  (account.whatsappConnected ? "bg-brand-500" : "bg-white/10")
                }
              >
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold">
                  Agent {account.whatsappConnected ? "actif" : "en pause"}
                </p>
                <p className="text-sm text-slate-300">
                  {account.whatsappConnected
                    ? "Vos clients reçoivent des réponses automatiques."
                    : "Connectez WhatsApp pour activer les réponses."}
                </p>
              </div>
            </div>
            <button
              onClick={toggleAgent}
              className={account.whatsappConnected ? "btn-ghost" : "btn-primary"}
            >
              {account.whatsappConnected ? "Mettre en pause" : "Activer l'agent"}
            </button>
          </div>

          {/* Cartes */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Progression */}
            <div className="card lg:col-span-1">
              <h3 className="font-semibold">Configuration</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-brand-500 transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-brand-700">{completion}%</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-sm">
                    <span
                      className={
                        "grid h-5 w-5 place-items-center rounded-full " +
                        (c.done ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-400")
                      }
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className={c.done ? "text-ink-900" : "text-slate-500"}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="btn-outline mt-5 w-full">
                Modifier la configuration
              </Link>
            </div>

            {/* Stats simulées */}
            <div className="card lg:col-span-2">
              <h3 className="font-semibold">Aperçu (démo)</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Conversations", v: account.whatsappConnected ? "128" : "0" },
                  { k: "Réponses auto", v: account.whatsappConnected ? "112" : "0" },
                  { k: "Temps moyen", v: account.whatsappConnected ? "4 s" : "—" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-2xl font-extrabold text-ink-900">{s.v}</p>
                    <p className="text-xs text-slate-500">{s.k}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-ink-900">Base de connaissances</p>
                <p className="mt-1 text-sm text-slate-500">
                  {account.knowledge.length} source
                  {account.knowledge.length > 1 ? "s" : ""} active
                  {account.knowledge.length > 1 ? "s" : ""}.{" "}
                  {account.crm.connected
                    ? `CRM ${account.crm.provider} connecté.`
                    : "Aucun CRM connecté."}
                </p>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Les statistiques sont des exemples de démonstration. Elles seront réelles
                une fois le service WhatsApp relié à votre compte.
              </p>
            </div>
          </div>

          {/* Mise à niveau */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <div>
              <p className="font-semibold text-ink-900">
                Passez à l'offre payante avant la fin de l'essai
              </p>
              <p className="text-sm text-slate-600">
                Continuez à automatiser votre support sans interruption.
              </p>
            </div>
            <a href={`mailto:${site.contactEmail}?subject=Abonnement ${site.name}`} className="btn-primary">
              Choisir mon offre
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
