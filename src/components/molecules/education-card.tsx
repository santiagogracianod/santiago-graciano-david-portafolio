"use client"

import { Heading } from "../atoms/heading"
import { Text } from "../atoms/text"

export type EducationItem = {
  institute: string
  period: string
  degree: string
  description: string
  status?: string
}

export default function EducationCard({
  item,
  isLast,
}: {
  item: EducationItem
  isLast: boolean
}) {
  return (
    <div
      className={
        "flex flex-col sm:grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-6 py-6 sm:py-8" +
        (isLast ? "" : " border-b border-gray-700/60")
      }
    >
      {/* Columna IZQUIERDA */}
      <div className="space-y-2">
        <Heading level={4} className="text-sm sm:text-base font-semibold text-cyan-300 leading-snug">
          {item.institute}
        </Heading>
        <div className="flex items-center gap-2 flex-wrap">
          <Text size="sm" className="text-slate-400 m-0">
            {item.status}
          </Text>
          <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-2 py-0.5 rounded">
            {item.period}
          </span>
        </div>
      </div>

      {/* Columna DERECHA */}
      <div className="space-y-2">
        <Heading level={3} className="text-base sm:text-lg font-medium text-yellow-400 leading-snug">
          {item.degree}
        </Heading>
        <Text
          size="sm"
          className="text-slate-300 leading-relaxed text-justify"
        >
          {item.description}
        </Text>
      </div>
    </div>
  )
}
