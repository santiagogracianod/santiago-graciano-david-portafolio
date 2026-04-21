"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Image from "next/image";
import { Mountain, Music2, Plane, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { motion } from "framer-motion";
import { hobbies, type Hobby } from "../../lib/data";

const HOBBY_ICONS: Record<string, LucideIcon> = {
  senderismo: Mountain,
  baile: Music2,
  viajar: Plane,
  voluntariado: Heart,
};

export default function HobbiesSection() {
  const t = useTranslations("hobbies");

  return (
    <motion.section
      id="hobbies"
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <Heading level={2} variant="gradient" className="mb-8 text-center">
        {t("sectionTitle")}
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {hobbies.map((hobby, index) => {
          const item = t.raw(`items.${hobby.id}`) as {
            title: string;
            description: string;
          };
          return (
            <HobbyCard
              key={hobby.id}
              hobby={hobby}
              title={item.title}
              description={item.description}
              index={index}
            />
          );
        })}
      </div>
    </motion.section>
  );
}

function HobbyCard({
  hobby,
  title,
  description,
  index,
}: {
  hobby: Hobby;
  title: string;
  description: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = HOBBY_ICONS[hobby.id] ?? Mountain;

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-72 rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media background */}
      {hobby.media === "video" ? (
        <video
          ref={videoRef}
          src={hobby.src}
          poster={hobby.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Image
          src={hobby.src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      )}

      {/* Gradient overlay — siempre presente, más oscuro en hover */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          hovered
            ? "bg-gradient-to-t from-black/90 via-black/60 to-black/20"
            : "bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        }`}
      />

      {/* Borde luminoso en hover */}
      <div
        className={`absolute inset-0 rounded-xl border transition-all duration-500 pointer-events-none ${
          index % 2 === 0
            ? "border-cyan-500/0 group-hover:border-cyan-500/60"
            : "border-fuchsia-500/0 group-hover:border-fuchsia-500/60"
        }`}
      />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Ícono + título — siempre visibles */}
        <div className="flex items-center gap-2 mb-2">
          <Icon
            className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
              index % 2 === 0 ? "text-cyan-400" : "text-fuchsia-400"
            }`}
          />
          <Heading
            level={3}
            variant={hovered ? (index % 2 === 0 ? "neon" : "neonPink") : "default"}
            className="text-lg transition-all duration-300"
          >
            {title}
          </Heading>
        </div>

        {/* Descripción — aparece con hover */}
        <motion.div
          initial={false}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
        >
          <Text size="sm" className="text-slate-200 leading-relaxed">
            {description}
          </Text>
        </motion.div>
      </div>
    </motion.div>
  );
}
