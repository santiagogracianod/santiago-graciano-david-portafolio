"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { Laptop, Cloud, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { Card, CardContent } from "@/components/ui/card";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

const KNOWLEDGE_ICONS: LucideIcon[] = [Laptop, Cloud, Server];

type KnowledgeItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function KnowledgeSection() {
  const t = useTranslations();
  const items = t.raw("knowledge.items") as Array<{
    title: string;
    description: string;
  }>;
  const sectionTitle = t("sections.knowledge");

  const knowledge: KnowledgeItem[] = items.map((item, i) => ({
    ...item,
    icon: KNOWLEDGE_ICONS[i],
  }));

  return (
    <motion.section
      id="conocimientos"
      className="mb-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Heading level={2} variant="gradient" className="mb-8 text-center">
        {sectionTitle}
      </Heading>

      <div className="grid gap-8 md:grid-cols-2">
        {knowledge.map((k, index) => (
          <KnowledgeCard key={k.title} knowledge={k} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

function KnowledgeCard({
  knowledge,
  index,
}: {
  knowledge: KnowledgeItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<
    Array<{ x: number; y: number; size: number; color: string; speed: number }>
  >([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 25, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    if (!isHovered) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    particlesRef.current = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 300,
      y: Math.random() * 300,
      size: Math.random() * 3 + 1,
      color: index % 2 === 0 ? "#00eeff" : "#ff00aa",
      speed: Math.random() * 1 + 0.5,
    }));

    const animate = () => {
      if (!canvasRef.current || !isHovered) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 300, 300);

      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          y: p.y - p.speed,
          x: p.x + Math.sin(p.y * 0.05) * 0.5,
          size: p.size - 0.02,
        }))
        .filter((p) => p.size > 0);

      if (Math.random() < 0.1 && particlesRef.current.length < 30) {
        particlesRef.current.push({
          x: Math.random() * 300,
          y: 300,
          size: Math.random() * 3 + 1,
          color: index % 2 === 0 ? "#00eeff" : "#ff00aa",
          speed: Math.random() * 1 + 0.5,
        });
      }

      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        className="relative h-full"
        style={{ perspective: 2000, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          className="h-full"
        >
          <Card className="border-gray-800 bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
            <CardContent className="p-8 relative">
              {isHovered && (
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              )}

              {(() => {
                const Icon = knowledge.icon;
                return (
                  <Icon
                    size={48}
                    className="mb-6 mx-auto text-cyan-400 transition-transform duration-300"
                    style={{
                      transform: isHovered
                        ? "translateZ(40px) scale(1.2)"
                        : "translateZ(0) scale(1)",
                    }}
                  />
                );
              })()}

              <Heading
                level={3}
                variant={isHovered ? "neon" : "default"}
                className="text-center mb-4 transition-all duration-300"
              >
                {knowledge.title}
              </Heading>

              <Text
                size="md"
                className="text-center leading-relaxed transition-all duration-300"
              >
                {knowledge.description}
              </Text>

              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
