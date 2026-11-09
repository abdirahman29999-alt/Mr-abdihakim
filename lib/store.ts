"use client";

// Gestion de compte côté navigateur (localStorage).
// ⚠️ MVP : ceci simule l'inscription et l'essai gratuit pour tester le marché.
// Pour la production, il faudra un vrai backend (authentification + base de données).

import { site } from "./site";

export type KnowledgeItem = {
  id: string;
  type: "link" | "document" | "text";
  label: string;
  value: string;
};

export type AgentConfig = {
  businessName: string;
  sector: string;
  tone: "amical" | "professionnel" | "direct";
  language: "fr" | "en" | "ar";
  welcomeMessage: string;
  escalateToHuman: boolean;
};

export type CrmConfig = {
  provider: "" | "hubspot" | "zoho" | "salesforce" | "sheet" | "autre";
  apiKey: string;
  connected: boolean;
};

export type Account = {
  email: string;
  fullName: string;
  company: string;
  password: string; // MVP uniquement — jamais stocker un mot de passe en clair en production.
  createdAt: number;
  trialEndsAt: number;
  plan: string;
  onboardingDone: boolean;
  whatsappConnected: boolean;
  agent: AgentConfig;
  knowledge: KnowledgeItem[];
  crm: CrmConfig;
};

const ACCOUNTS_KEY = "replio_accounts";
const SESSION_KEY = "replio_session";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readAccounts(): Record<string, Account> {
  if (typeof window === "undefined") return {};
  return safeParse(localStorage.getItem(ACCOUNTS_KEY), {});
}

function writeAccounts(accounts: Record<string, Account>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function defaultAgent(company: string): AgentConfig {
  return {
    businessName: company,
    sector: "",
    tone: "professionnel",
    language: "fr",
    welcomeMessage:
      "Bonjour 👋 Je suis l'assistant de " +
      (company || "votre entreprise") +
      ". Comment puis-je vous aider aujourd'hui ?",
    escalateToHuman: true,
  };
}

export function signUp(input: {
  fullName: string;
  email: string;
  company: string;
  password: string;
  plan?: string;
}): { ok: boolean; error?: string } {
  const accounts = readAccounts();
  const email = input.email.trim().toLowerCase();
  if (accounts[email]) {
    return { ok: false, error: "Un compte existe déjà avec cet email." };
  }
  const now = Date.now();
  const account: Account = {
    email,
    fullName: input.fullName.trim(),
    company: input.company.trim(),
    password: input.password,
    createdAt: now,
    trialEndsAt: now + site.trialDays * 24 * 60 * 60 * 1000,
    plan: input.plan || "pro",
    onboardingDone: false,
    whatsappConnected: false,
    agent: defaultAgent(input.company.trim()),
    knowledge: [],
    crm: { provider: "", apiKey: "", connected: false },
  };
  accounts[email] = account;
  writeAccounts(accounts);
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

export function login(email: string, password: string): { ok: boolean; error?: string } {
  const accounts = readAccounts();
  const key = email.trim().toLowerCase();
  const account = accounts[key];
  if (!account) return { ok: false, error: "Aucun compte trouvé avec cet email." };
  if (account.password !== password) {
    return { ok: false, error: "Mot de passe incorrect." };
  }
  localStorage.setItem(SESSION_KEY, key);
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function currentAccount(): Account | null {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const accounts = readAccounts();
  return accounts[email] || null;
}

export function saveAccount(account: Account) {
  const accounts = readAccounts();
  accounts[account.email] = account;
  writeAccounts(accounts);
}

export function trialDaysLeft(account: Account): number {
  const ms = account.trialEndsAt - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}
