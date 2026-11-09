import { WhatsAppIcon } from "./icons";
import { site } from "@/lib/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white shadow-soft">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className={dark ? "text-white text-lg" : "text-ink-900 text-lg"}>
        {site.name}
      </span>
    </span>
  );
}
