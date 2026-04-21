"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillListProps {
  skills: string[]
  className?: string
  maxVisible?: number
}

export function SkillList({ skills, className, maxVisible = 8 }: SkillListProps) {
  const t = useTranslations("sidebar")
  const [showAll, setShowAll] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const displayedSkills = showAll ? skills : skills.slice(0, maxVisible)
  const hasMore = skills.length > maxVisible

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {displayedSkills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-300",
              "border border-gray-700 bg-gray-800",
              hoveredSkill === skill ? "scale-110 z-10" : "scale-100 z-0",
              index % 4 === 0
                ? "hover:border-cyan-400 hover:text-cyan-400"
                : index % 4 === 1
                  ? "hover:border-fuchsia-400 hover:text-fuchsia-400"
                  : index % 4 === 2
                    ? "hover:border-emerald-400 hover:text-emerald-400"
                    : "hover:border-amber-400 hover:text-amber-400",
            )}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              boxShadow: hoveredSkill === skill ? "0 0 10px rgba(0, 238, 255, 0.5)" : "none",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2"
        >
          {showAll ? t("showLess") : t("showMore", { count: skills.length - maxVisible })}
        </button>
      )}
    </div>
  )
}
