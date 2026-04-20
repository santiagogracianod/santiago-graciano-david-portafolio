"use client";

import { useTranslations } from "next-intl";
import Avatar from "../atoms/avatar";
import { personal } from "../../lib/data";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { ContactCard } from "../molecules/contact-card";
import { LanguageCard } from "../molecules/language-card";
import { ProgrammingCard } from "../molecules/programming-card";
import { SkillList } from "../molecules/skill-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import LocaleSwitcher from "../molecules/locale-switcher";
import { programming } from "../../lib/data";

export default function SidebarLeft() {
  const t = useTranslations();

  const languages = t.raw("sidebar.languages") as Array<{
    name: string;
    percent: number;
  }>;
  const skills = t.raw("sidebar.skills") as string[];
  const personalTitle = t("personal.title");

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="text-center border-gray-800 bg-gray-900 shadow-lg overflow-hidden">
        <div className="h-16 animated-gradient" />
        <CardContent className="pt-6 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden">
            <Avatar
              src={personal.avatar}
              alt={personal.name}
              size={80}
              variant="neon"
            />
          </div>

          <div className="flex flex-col items-center mt-8 py-6">
            <Heading level={2} variant="gradient" className="mb-1">
              {personal.name}
            </Heading>
            <Text size="md" variant="muted">
              {personalTitle}
            </Text>
          </div>
        </CardContent>
      </Card>

      <ContactCard
        location={personal.location}
        phone={personal.phone}
        email={personal.email}
      />
      <LanguageCard
        languages={languages}
        title={t("sidebar.languagesTitle")}
        fluentLabel={t("sidebar.fluent")}
      />
      <ProgrammingCard stacks={programming} />

      <Card className="border-gray-800 bg-gray-900 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 pb-3 pt-4">
          <Heading level={3} variant="neon" className="m-0">
            {t("sidebar.skillsTitle")}
          </Heading>
        </CardHeader>
        <CardContent className="pt-4">
          <SkillList skills={skills} />
        </CardContent>
      </Card>

      <div className="flex justify-center pb-4">
        <LocaleSwitcher />
      </div>
    </motion.div>
  );
}
