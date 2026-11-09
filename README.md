# Replio — Support WhatsApp automatisé par IA

MVP d'un SaaS qui installe un **agent IA** répondant automatiquement aux clients sur
WhatsApp. Conçu pour le marché de Djibouti 🇩🇯 et l'international.

## Ce que contient ce MVP

- **Landing page** marketing (présentation, fonctionnalités, tarifs, FAQ, CTA).
- **Inscription / connexion** avec essai gratuit de 14 jours sans engagement.
- **Onboarding en 4 étapes** :
  1. Configuration de l'agent IA (ton, langue, message de bienvenue).
  2. Base de connaissances (liens, documents, textes).
  3. Connexion CRM (optionnelle).
  4. Connexion WhatsApp via **QR code**.
- **Tableau de bord** : état de l'agent, progression, aperçu des conversations.

## Pile technique

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- Tailwind CSS
- Génération de QR code avec `qrcode`

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Déploiement

Le projet se déploie automatiquement sur **Vercel** à chaque push.

## ⚠️ Important — étape MVP

Pour tester le marché rapidement, ce MVP fonctionne **côté navigateur** :
l'inscription, l'essai et la configuration sont stockés localement (localStorage).
La connexion WhatsApp est **simulée**.

Pour passer en production réelle, il faudra ajouter :

- une **authentification** et une **base de données** (comptes, abonnements) ;
- un **service d'appairage WhatsApp** (WhatsApp Business API ou équivalent) pour que
  le QR code connecte réellement le numéro ;
- un **moteur IA** (modèle de langage) branché sur la base de connaissances et le CRM ;
- la **facturation** (Stripe ou équivalent) à la fin de l'essai.
