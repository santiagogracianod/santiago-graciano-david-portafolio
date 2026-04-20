"use client";

import { useTranslations } from "next-intl";
import { Heading } from "../atoms/heading";
import EducationCard, { EducationItem } from "../molecules/education-card";
import { motion } from "framer-motion";

export default function EducationSection() {
  const t = useTranslations();
  const education = t.raw("education.items") as EducationItem[];
  const sectionTitle = t("sections.education");

  return (
    <motion.section
      id="educacion"
      className="mb-8 bg-gray-900/70 rounded-xl border border-cyan-500/20 max-w-5xl mx-auto px-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Heading level={2} variant="gradient" className="pt-10 mb-6 text-center">
        {sectionTitle}
      </Heading>

      {education.map((ed, idx, arr) => (
        <EducationCard
          key={ed.institute}
          item={ed}
          isLast={idx === arr.length - 1}
        />
      ))}

      <div className="pb-10" />
    </motion.section>
  );
}
