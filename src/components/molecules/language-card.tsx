"use client";

import { useState, useRef, useEffect } from "react";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { ProgressBar } from "../atoms/progress-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageCard({
  languages,
  title,
  fluentLabel,
}: {
  languages: Array<{ name: string; percent: number }>;
  title: string;
  fluentLabel: string;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <Card
      ref={ref}
      className="overflow-hidden border-gray-800 bg-gray-900 shadow-lg hover:shadow-cyan-900/20 transition-all duration-500"
    >
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-fuchsia-400" />
            <Heading level={3} variant="neonPink" className="m-0">
              {title}
            </Heading>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full p-1 hover:bg-gray-700 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUp size={18} className="text-fuchsia-400" />
            ) : (
              <ChevronDown size={18} className="text-fuchsia-400" />
            )}
          </button>
        </div>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-4">
              <div className="space-y-4">
                {languages.map((l, index) => (
                  <motion.div
                    key={l.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onMouseEnter={() => setActiveLanguage(l.name)}
                    onMouseLeave={() => setActiveLanguage(null)}
                  >
                    <div className="flex justify-between items-center">
                      <Text
                        weight="medium"
                        variant={
                          activeLanguage === l.name ? "neonPink" : "default"
                        }
                        className="transition-all duration-300"
                      >
                        {l.name}
                      </Text>
                      <div className="flex items-center gap-2">
                        <Text
                          size="xs"
                          variant={
                            activeLanguage === l.name ? "neonPink" : "muted"
                          }
                          className="transition-all duration-300"
                        >
                          {l.percent}%
                        </Text>
                        {l.percent >= 90 && (
                          <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium bg-fuchsia-900 text-fuchsia-400 rounded">
                            {fluentLabel}
                          </span>
                        )}
                        {activeLanguage === l.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"
                          />
                        )}
                      </div>
                    </div>
                    <ProgressBar
                      value={l.percent}
                      className="bg-gray-800"
                      indicatorClassName="bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
