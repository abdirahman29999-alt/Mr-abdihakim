import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatDemo } from "@/components/ChatDemo";
import { site, plans } from "@/lib/site";
import {
  BoltIcon,
  BookIcon,
  CheckIcon,
  ClockIcon,
  DatabaseIcon,
  GlobeIcon,
  UsersIcon,
  ArrowIcon,
} from "@/components/icons";

const features = [
  {
    icon: BoltIcon,
    title: "Réponses instantanées 24h/24",
    text: "Vos clients obtiennent une réponse en quelques secondes, de jour comme de nuit, même pendant les jours fériés.",
  },
  {
    icon: BookIcon,
    title: "Base de connaissances",
    text: "Ajoutez vos liens, documents et textes. L'agent s'appuie dessus pour répondre avec précision, sans inventer.",
  },
  {
    icon: DatabaseIcon,
    title: "Connexion à votre CRM",
    text: "L'agent retrouve les informations du client (commandes, historique) pour des réponses personnalisées.",
  },
  {
    icon: UsersIcon,
    title: "Transfert vers un humain",
    text: "Quand une demande est complexe, la conversation est transmise à votre équipe, sans rupture.",
  },
  {
    icon: GlobeIcon,
    title: "Multilingue",
    text: "Français, anglais, arabe… l'agent répond dans la langue de votre client.",
  },
  {
    icon: ClockIcon,
    title: "Installation en minutes",
    text: "Scannez un QR code pour connecter WhatsApp. Aucune compétence technique requise.",
  },
];

const steps = [
  {
    n: "1",
    title: "Créez votre compte",
    text: `Inscrivez-vous et profitez de ${site.trialDays} jours d'essai gratuit, sans engagement ni carte bancaire.`,
  },
  {
    n: "2",
    title: "Configurez votre agent",
    text: "Décrivez votre activité, ajoutez votre base de connaissances et connectez votre CRM si besoin.",
  },
  {
    n: "3",
    title: "Scannez le QR code",
    text: "Connectez votre numéro WhatsApp en scannant un QR code, comme pour WhatsApp Web.",
  },
  {
    n: "4",
    title: "L'agent répond pour vous",
    text: "Vos clients sont pris en charge automatiquement. Vous gardez le contrôle à tout moment.",
  },
];

const faqs = [
  {
    q: "Ai-je besoin de savoir coder ?",
    a: "Non. Tout se configure depuis une interface simple. La connexion à WhatsApp se fait en scannant un QR code.",
  },
  {
    q: "L'essai gratuit est-il vraiment sans engagement ?",
    a: `Oui. Vous disposez de ${site.trialDays} jours gratuits, sans carte bancaire. Vous ne payez que si vous décidez de continuer.`,
  },
  {
    q: "L'agent peut-il se tromper ?",
    a: "L'agent répond à partir de votre base de connaissances. Pour les cas sensibles ou complexes, il transmet la conversation à votre équipe.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos informations servent uniquement à répondre à vos clients. Vous pouvez à tout moment modifier ou supprimer votre base de connaissances.",
  },
  {
    q: "Fonctionne-t-il à Djibouti et à l'international ?",
    a: "Oui. Replio fonctionne partout où WhatsApp est disponible, aussi bien à Djibouti qu'à l'étranger.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="container-px relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              Nouveau • Support WhatsApp automatisé par IA
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Ne faites plus attendre vos clients sur{" "}
              <span className="text-brand-400">WhatsApp</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              {site.name} installe un agent IA qui répond automatiquement à vos clients,
              puise dans votre base de connaissances et se connecte à votre CRM.
              Vous gagnez du temps, vos clients sont satisfaits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn-primary text-base">
                Démarrer l'essai gratuit de {site.trialDays} jours
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a href="#comment" className="btn-ghost text-base">
                Voir comment ça marche
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Sans carte bancaire • Sans engagement • Installation en quelques minutes
            </p>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* PROBLÈME / BÉNÉFICE */}
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="container-px grid gap-8 py-14 sm:grid-cols-3">
          {[
            { stat: "< 5 sec", label: "pour répondre, au lieu de plusieurs heures" },
            { stat: "24h/24", label: "disponibilité, même la nuit et le week-end" },
            { stat: "-70 %", label: "de temps passé sur les questions répétitives" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-4xl font-extrabold text-brand-700">{item.stat}</p>
              <p className="mt-2 text-sm text-ink-800">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="container-px py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tout ce qu'il faut pour un support impeccable
          </h2>
          <p className="mt-4 text-slate-600">
            Un agent IA qui comprend vos clients et répond avec les bonnes informations.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card transition hover:-translate-y-1 hover:shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="bg-ink-900 py-20 text-white">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Opérationnel en 4 étapes
            </h2>
            <p className="mt-4 text-slate-300">
              Pas besoin d'être développeur. Vous êtes prêt en quelques minutes.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="container-px py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Des tarifs simples et transparents
          </h2>
          <p className="mt-4 text-slate-600">
            Essai gratuit de {site.trialDays} jours sur toutes les offres. Annulable à tout moment.
          </p>
        </div>
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={
                "flex flex-col rounded-2xl border p-7 " +
                (plan.highlight
                  ? "border-brand-500 bg-white shadow-soft ring-1 ring-brand-500"
                  : "border-slate-200 bg-white shadow-sm")
              }
            >
              {plan.highlight && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  Le plus populaire
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-extrabold">{plan.priceUsd}$</span>
                <span className="mb-1 text-sm text-slate-500">/ mois</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">≈ {plan.priceDjf} DJF / mois</p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-600" />
                    <span className="text-slate-700">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plan=${plan.id}`}
                className={
                  "mt-8 " + (plan.highlight ? "btn-primary" : "btn-outline")
                }
              >
                Commencer l'essai gratuit
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Prix en DJF indicatifs pour le marché de Djibouti. Facturation finale en USD.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-20">
        <div className="container-px mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink-900">
                  {f.q}
                  <span className="ml-4 text-brand-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-px py-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-16 text-center text-white shadow-soft">
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Prêt à automatiser votre support WhatsApp ?
            </h2>
            <p className="mt-4 text-brand-50">
              Rejoignez les entreprises qui répondent plus vite et vendent plus.
              Essayez {site.name} gratuitement pendant {site.trialDays} jours.
            </p>
            <Link href="/signup" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">
              Créer mon compte gratuitement
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
