"use client";

import { useTranslations } from "next-intl";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactCard({
  location,
  phone,
  email,
}: {
  location: string;
  phone: string;
  email: string;
}) {
  const t = useTranslations("sidebar");

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 pb-3 pt-4">
        <Heading level={3} variant="neon" className="m-0">
          {t("contactTitle")}
        </Heading>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
          <Text size="sm">{location}</Text>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
          <Text size="sm">{phone}</Text>
        </div>
        <div className="flex items-center gap-2 text-slate-300 min-w-0">
          <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
          <Text size="sm" className="truncate">{email}</Text>
        </div>
      </CardContent>
    </Card>
  );
}
