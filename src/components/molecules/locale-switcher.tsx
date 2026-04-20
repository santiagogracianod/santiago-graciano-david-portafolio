"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
      <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-800 border border-gray-700">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleSwitch(loc)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all uppercase ${
              locale === loc
                ? "bg-cyan-500 text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
