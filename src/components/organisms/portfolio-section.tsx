"use client";

import { useTranslations } from "next-intl";
import { projects as projectsStatic } from "../../lib/data";
import type { Project } from "../../lib/data";
import { Heading } from "../atoms/heading";
import { Text } from "../atoms/text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Eye } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export default function PortfolioSection() {
  const t = useTranslations();
  const projectsTranslated = t.raw("projects.items") as Array<{
    title: string;
    description: string;
  }>;
  const sectionTitle = t("sections.portfolio");

  const projects: Project[] = projectsStatic.map((p, i) => ({
    ...p,
    title: projectsTranslated[i]?.title ?? p.title,
    description: projectsTranslated[i]?.description ?? p.description,
  }));

  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const projectElements =
      containerRef.current.querySelectorAll(".project-card");
    if (projectElements[index]) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const projectLeft = projectElements[index].getBoundingClientRect().left;
      containerRef.current.scrollBy({
        left: projectLeft - containerLeft - 40,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      id="portafolio"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <Heading
          level={2}
          variant="gradient"
          className="mb-4 md:mb-0 mx-auto text-center"
        >
          {sectionTitle}
        </Heading>

        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                activeProject === index
                  ? "bg-cyan-400 w-6"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => {
                setActiveProject(index);
                scrollToProject(index);
              }}
            />
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
      >
        {projects.map((prj, index) => (
          <ProjectCard
            key={prj.id}
            project={prj}
            index={index}
            isActive={activeProject === index}
            setActive={() => setActiveProject(index)}
          />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectCard({
  project,
  index,
  isActive,
  setActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  setActive: () => void;
}) {
  const t = useTranslations("portfolio");
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="min-w-[280px] sm:min-w-[340px] flex-shrink-0 snap-center project-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActive();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`border-gray-800 bg-gray-900 shadow-lg transition-all duration-500 h-full ${
          isActive ? "ring-2 ring-cyan-400 shadow-cyan-900/30" : ""
        }`}
      >
        <CardContent className="p-0 h-full">
          <div className="relative overflow-hidden rounded-t-lg h-52">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={350}
              height={200}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.1) rotate(2deg)" : "scale(1)",
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                isHovered
                  ? "from-black/80 to-black/40"
                  : "from-black/60 to-transparent"
              }`}
            />

            <div className="absolute bottom-0 left-0 p-4 w-full">
              <Heading
                level={3}
                variant={isHovered ? "neon" : "default"}
                className="mb-1 transition-all duration-300"
              >
                {project.title}
              </Heading>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black/50 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? (
                          <Code className="w-4 h-4 mr-2" />
                        ) : (
                          <Eye className="w-4 h-4 mr-2" />
                        )}
                        {showDetails ? t("hide") : t("details")}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-cyan-400 hover:bg-cyan-500 text-black"
                        onClick={() => window.open(project.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("view")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6">
                  <Text size="md" className="mb-4 leading-relaxed">
                    {project.description}
                  </Text>

                  {project.tech && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 border border-cyan-900 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:border-gray-600"
                      onClick={() => window.open(project.url, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t("code")}
                    </Button>

                    <Text size="xs" variant="muted">
                      ID: {project.id}
                    </Text>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
