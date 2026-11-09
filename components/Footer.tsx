import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="container-px grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm text-slate-400">{site.description}</p>
          <p className="mt-4 text-sm text-slate-400">
            Conçu à Djibouti 🇩🇯 — disponible partout dans le monde.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Produit</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/#fonctionnalites" className="hover:text-white">Fonctionnalités</a></li>
            <li><a href="/#tarifs" className="hover:text-white">Tarifs</a></li>
            <li><Link href="/signup" className="hover:text-white">Essai gratuit</Link></li>
            <li><Link href="/login" className="hover:text-white">Se connecter</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`mailto:${site.contactEmail}`} className="hover:text-white">{site.contactEmail}</a></li>
            <li className="text-slate-400">WhatsApp : {site.whatsapp}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
          <p>Support WhatsApp automatisé par IA.</p>
        </div>
      </div>
    </footer>
  );
}
