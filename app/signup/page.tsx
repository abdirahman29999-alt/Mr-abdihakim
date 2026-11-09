"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { signUp } from "@/lib/store";
import { plans, site } from "@/lib/site";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("pro");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("plan");
    if (p && plans.some((pl) => pl.id === p)) setPlan(p);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    setLoading(true);
    const res = signUp({ fullName, email, company, password, plan });
    if (!res.ok) {
      setError(res.error || "Une erreur est survenue.");
      setLoading(false);
      return;
    }
    router.push("/onboarding");
  }

  return (
    <AuthShell
      title="Créez votre compte"
      subtitle={`Essai gratuit de ${site.trialDays} jours. Sans carte bancaire, sans engagement.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="fullName">Nom complet</label>
          <input
            id="fullName"
            className="input"
            placeholder="Abdirahman A."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="company">Nom de l'entreprise</label>
          <input
            id="company"
            className="input"
            placeholder="Ma Boutique SARL"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email professionnel</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="vous@entreprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Au moins 6 caractères"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="plan">Offre souhaitée</label>
          <select
            id="plan"
            className="input"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.priceUsd}$/mois
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Création…" : "Démarrer mon essai gratuit"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">
          Se connecter
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-slate-400">
        En créant un compte, vous acceptez nos conditions d'utilisation.
      </p>
    </AuthShell>
  );
}
