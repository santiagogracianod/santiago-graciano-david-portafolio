"use client";

import { useTranslations } from "next-intl";
import BaseModal from "../molecules/base-modal";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { personal } from "../../lib/data";

export default function AboutMeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("aboutModal");

  return (
    <BaseModal open={open} onClose={onClose}>
      <Heading level={2} className="text-center mb-4 text-cyan-400">
        {t("title")}
      </Heading>
      <Text size="lg" className="text-slate-200 leading-relaxed">
        {t("para1", { name: personal.name })}
      </Text>
      <Text size="lg" className="text-slate-200 leading-relaxed">
        {t("para2")}
      </Text>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg bg-gray-800 border border-cyan-600 text-center">
          <span className="block text-3xl font-bold text-cyan-400">5+</span>
          <span className="text-sm text-slate-300">{t("projectsLabel")}</span>
        </div>
        <div className="p-4 rounded-lg bg-gray-800 border border-fuchsia-600 text-center">
          <span className="block text-3xl font-bold text-fuchsia-400">4</span>
          <span className="text-sm text-slate-300">{t("experienceLabel")}</span>
        </div>
      </div>
    </BaseModal>
  );
}
