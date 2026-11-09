import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { CheckIcon } from "./icons";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Panneau gauche (branding) */}
      <aside className="relative hidden overflow-hidden bg-ink-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-10 top-20 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <Link href="/" className="relative">
          <Logo dark />
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">
            Votre support WhatsApp, automatisé par IA.
          </h2>
          <ul className="mt-8 space-y-4 text-slate-200">
            {[
              "Réponses instantanées 24h/24",
              "Base de connaissances sur mesure",
              "Connexion CRM & réponses personnalisées",
              `${site.trialDays} jours gratuits, sans engagement`,
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500">
                  <CheckIcon className="h-4 w-4 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-slate-400">
          Conçu à Djibouti 🇩🇯 — disponible partout dans le monde.
        </p>
      </aside>

      {/* Panneau droit (formulaire) */}
      <section className="flex min-h-screen flex-col justify-center px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
