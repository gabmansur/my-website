"use client";

import Image from "next/image";
import { useState } from "react";

// Define the TypeScript types
interface Project {
  title: string;
  year: string;
  location: string;
  description: string;
  tags: string[];
  image: string; // Ensures image is always defined
  links?: { text: string; url: string }[];
}

// Define the projects array with proper types
const projects: Project[] = [
  {
    title: "🖥️ This very website",
    year: "2025",
    location: "Personal Project",
    description:
      "A chaotic yet functional portfolio that reflects both my love for tech and my search for existential meaning.",
    tags: ["Web Development", "Creative Coding"],
    image: "/images/website.jpeg",
    links: [{ text: "Read more", url: "/projects/website" }],
  },
  {
    title: "🕵️‍♂️ GlassBox AI",
    year: "2025",
    location: "Personal Project",
    description:
      "A tool that reveals how AI models make decisions, highlights token importance, reasoning, and influences behind AI-generated text.",
    tags: ["AI Explainability", "Machine Learning", "NLP", "OpenAI"],
    image: "/images/glassbox-ai.png",
    links: [{ text: "GitHub Repo", url: "https://github.com/gabmansur/glassbox-ai" }],
  },
  {
    title: "🎮 Flappy Cat – Arcade Game Dev",
    year: "2025",
    location: "Personal Project",
    description: "A cat flying through chaos.",
    tags: ["Game Dev", "Pixel Art", "Physics-Based Mechanics", "Creative Coding"],
    image: "/images/default.png", // Provide a default image
  },
];

// Get unique tags for filtering
const uniqueTags = [...new Set(projects.flatMap((project) => project.tags))];

export default function PortfolioPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const filteredProjects = selectedTags.length
    ? projects.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
    : projects;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
        █ PROJECT ARCHIVES █
      </h1>

      {/* KEYWORDS */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 border rounded ${
              selectedTags.includes(tag) ? "bg-green-500 text-black" : "border-green-500 text-green-400"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* PROJECTS LISTING */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div key={index} className="border border-green-500 p-4">
            <Image
              src={project.image || "/images/default.png"}
              alt={project.title}
              width={400}
              height={200}
              className="mb-4 border border-green-500"
            />
            <h2 className="text-xl text-green-300">{project.title}</h2>
            <p className="text-green-400">📌 {project.year} | {project.location}</p>
            <p className="mt-2">{project.description}</p>
            <div className="mt-2 flex flex-wrap">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="bg-green-800 text-white px-2 py-1 text-xs mr-2 rounded">{tag}</span>
              ))}
            </div>
            <div className="mt-2">
              {project.links?.map((link, idx) => (
                <a key={idx} href={link.url} className="text-green-500 hover:text-green-300 mr-4">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
