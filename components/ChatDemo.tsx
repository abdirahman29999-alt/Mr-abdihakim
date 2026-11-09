import { WhatsAppIcon } from "./icons";

type Msg = { from: "client" | "bot"; text: string };

const messages: Msg[] = [
  { from: "client", text: "Bonjour, vos bureaux sont ouverts le samedi ?" },
  { from: "bot", text: "Bonjour 👋 Oui ! Nous sommes ouverts le samedi de 9h à 13h. Puis-je vous aider pour autre chose ?" },
  { from: "client", text: "Je veux suivre ma commande #4821" },
  { from: "bot", text: "Votre commande #4821 a été expédiée hier et arrive demain avant 17h 🚚. Voulez-vous le lien de suivi ?" },
];

export function ChatDemo() {
  return (
    <div className="animate-float rounded-[2rem] border border-white/10 bg-ink-800 p-3 shadow-2xl">
      <div className="overflow-hidden rounded-[1.5rem] bg-[#0b141a]">
        <div className="flex items-center gap-3 bg-[#1f2c33] px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Support — Agent IA</p>
            <p className="text-[11px] text-brand-300">en ligne • répond en &lt; 5s</p>
          </div>
        </div>
        <div className="space-y-2.5 px-4 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.from === "client" ? "flex justify-start" : "flex justify-end"}
            >
              <p
                className={
                  "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug " +
                  (m.from === "client"
                    ? "rounded-tl-sm bg-[#202c33] text-slate-100"
                    : "rounded-tr-sm bg-[#005c4b] text-white")
                }
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
