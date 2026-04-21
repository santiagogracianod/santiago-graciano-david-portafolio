import { Laptop, Cloud, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const personal = {
  name: "Santiago Graciano",
  title: "Estudiante de Ingeniería de Sistemas",
  avatar: "/avatar.jpeg",
  location: "Medellín, CO",
  phone: "+57 314‑646‑7003",
  email: "santiago.gracianod@gmail.com",
};

export const languages = [
  { name: "Español", percent: 100 },
  { name: "Inglés", percent: 65 },
];

export const programming = [
  { name: "PHP", percent: 90 },
  { name: "JavaScript", percent: 80 },
  { name: "Java", percent: 60 },
  { name: "TypeScript", percent: 60 },
  { name: "Python", percent: 65 },
  { name: "HTML", percent: 75 },
  { name: "CSS", percent: 70 },
];

export const skills = [
  "Programación frontend",
  "Programación backend",
  "Bases de datos", 
  "Laravel", 
  "Git", 
  "AWS", 
  "CI/CD",
  "Trabajo en equipo",
  "Resolución de problemas",
  "Comunicación efectiva",
  "Adaptabilidad",
  "Aprendizaje continuo",
  "Gestión del tiempo",
  "Pensamiento crítico",
];

export type KnowledgeItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const knowledge: KnowledgeItem[] = [
  {
    icon: Laptop,
    title: "Desarrollo Web",
    description: "React, Next.js, Tailwind, CSS, HTML, JavaScript, TypeScript",
  },
  { icon: Cloud, title: "Cloud Computing", description: "AWS, CI/CD" },
  { icon: Server, title: "Desarrollo Backend", description: "PHP, Laravel, Java, NodeJS, Phyton" },
];

export const education = [
  {
    institute: "Universidad de Antioquia",
    period: "2019 – Presente",
    degree: "Ingeniería de Sistemas",
    description: "Carrera orientada a la creación de software robusto y a la aplicación de algoritmos para modelar, simular y analizar grandes volúmenes de datos. Potencia el trabajo en equipos multidisciplinarios, el uso de estándares de calidad, y el desarrollo de proyectos tecnológicos con responsabilidad ética y visión sostenible.",
    status: "Estudiante",
  },
  {
    institute: "SENA",
    period: "2015 – 2017",
    degree: "Tecnología en Analisis y Desarrollo de Sistemas de Información",
    description: "Formación tecnológica de 24 meses centrada en el análisis y desarrollo de sistemas de información. Capacita para planificar, diseñar, construir, probar y ajustar aplicaciones que sistematicen u automaticen procesos organizacionales",
    status: "Finalizado",
  },
  {
    institute: "Academia de Idiomas Blendex",
    period: "2023 - 2024",
    degree: "Inglés ",
    description: "Curso de inglés  con enfoque en conversación y comprensión auditiva.",
    status: "Finalizado",
  },
  {
    institute: "Talento Tech",
    period: "2025",
    degree: "Computación en la Nube",
    description: "Servicios fundamentales de AWS y mejores prácticas cloud.",
    status: "Finalizado",
  },
]

export interface Project {
  id: number
  title: string
  description: string
  image?: string
  url: string
  tech?: string[]
}

export type HobbyMedia = "video" | "image";

export interface Hobby {
  id: string;
  media: HobbyMedia;
  src: string;
  poster?: string;
}

export const hobbies: Hobby[] = [
  { id: "senderismo", media: "video", src: "/video-senderismo.mp4", poster: "/senderismo.jpeg" },
  { id: "baile",      media: "image", src: "/baile.jpeg" },
  { id: "viajar",     media: "image", src: "/viajar.jpeg" },
  { id: "voluntariado", media: "image", src: "/voluntariado.jpeg" },
];

export const projects: Project[] = [
  {
    id: 1,
    image: "/telconova.jpeg",
    title: "TelcoNova",
    description: "Sistema SaaS para seguimiento de órdenes en proceso.",
    url: "https://github.com/santiagogracianod/telconona-frontend.git",
  },
  {
    id: 2,
    image: "/la-rookola.png",
    title: "La Rookola",
    description: "Proyecto de música en línea con React y API spotify.",
    url: "https://github.com/santiagogracianod/la-rookola.git",
  },
  {
    id: 3,
    image: "/kaggle.png",
    title: "Reto Kaggle",
    description: "Desarrollo de modelo para predicciones en Python.",
    url: "https://github.com/santiagogracianod/Kaggle-UdeA.git",
  },
  {
    id: 4,
    image: "/project2.png",
    title: "Backend sistema de vuelos",
    description:
      "Módulo de reservas para sistema de vuelos con Java SprinBoot.",
    url: "https://github.com/santiagogracianod/lab1FligthSearchBackend.git",
  }
];
