import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="container-px flex h-16 items-center justify-between">
        <Link href="/" aria-label="Accueil">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink-800 md:flex">
          <a href="/#fonctionnalites" className="hover:text-brand-600">Fonctionnalités</a>
          <a href="/#comment" className="hover:text-brand-600">Comment ça marche</a>
          <a href="/#tarifs" className="hover:text-brand-600">Tarifs</a>
          <a href="/#faq" className="hover:text-brand-600">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-semibold text-ink-800 hover:text-brand-600 sm:block">
            Se connecter
          </Link>
          <Link href="/signup" className="btn-primary">
            Essai gratuit
          </Link>
        </div>
      </nav>
    </header>
  );
}
