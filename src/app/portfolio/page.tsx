"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [

{
    title: "🖥️ This very website",
    year: "2025",
    location: "Personal Project",
    description: "A chaotic yet functional portfolio that reflects both my love for tech and my search for existencial meaning.",
    tags: ["Web Development", "Creative Coding"],
    image: "/images/website.jpeg", // Add a relevant screenshot of your site here
    links: [{ text: "Read more", url: "/projects/website" }]
    },
  {
    title: "🕵️‍♂️ GlassBox AI",
    year: "2025",
    location: "Personal Project",
    description: "A tool that reveals how AI models make decisions, highlights token importance, reasoning, and influences behind AI-generated text.",
    tags: ["AI Explainability", "Machine Learning", "NLP", "OpenAI"],
    image: "/images/glassbox-ai.png",
    links: [{ text: "GitHub Repo", url: "https://github.com/gabmansur/glassbox-ai" }]
  },
  {
    title: "🎮 Flappy Cat – Arcade Game Dev",
    year: "2025",
    location: "Personal Project",
    description: "A cat flying through chaos.",
    tags: ["Game Dev", "Pixel Art", "Physics-Based Mechanics", "Creative Coding"],
  },
];

const uniqueTags = [...new Set(projects.flatMap((project) => project.tags))];

export default function PortfolioPage() {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredProjects = selectedTags.length
    ? projects.filter((project) =>
        selectedTags.some((tag) => project.tags.includes(tag))
      )
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
              selectedTags.includes(tag)
                ? "bg-green-500 text-black"
                : "border-green-500 text-green-400"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* INTRO */}
      <div className="mb-8 p-4 border border-green-500 bg-black text-green-300 max-w-8xl mx-auto text-left">

      <p className="mt-2 text-green-300">
  👾 Hey frens! Welcome to my rabbit hole.  
  This is a collection of the (exclusively not-so-unpolitically-correct) things I’ve built, broken, and obsessed over at 2 AM.  
  You’ll find personal projects, experiments, and some of the work I did during my bachelor, master, and doctorate, at least the parts I still have and am allowed to share.  
</p>

<hr className="border-green-500 my-4" />

<p className="mt-2">
  🛠️ <b>How It Started</b>
  <br/>
  My journey has always been about understanding how things work at their core.
  It began with robots and mechanical systems, breaking things apart (sometimes literally) to figure out how movement, force, and intelligence emerge from simple principles.  
</p>

<p className="mt-2">
  🌀 <b>Going Deeper</b>
  <br />
  But understanding how things move wasn’t enough, I wanted to know why.
  That curiosity led me into computational physics and simulations, where I modeled the invisible forces that shape our world, from fluid dynamics to complex systems.  
  The deeper I went, the more I realized patterns govern everything, from physics to human behavior itself.  

  At some point, I realized that understanding reality wasn’t enough, I wanted to shape it.
  That’s when I found myself in data, AI, and machine learning, where knowledge isn’t just observed or simulated but actively used to optimize, predict, and create.  
  But that shift also made me ask bigger questions, not just about technology, but about existence itself.
</p>

<p className="mt-2 text-green-400">
<b> 🧠 My current questions... </b> <br/>
  - How does AI reshape the way we think, interact, and make decisions?  <br/>
  - What happens when we build systems we no longer fully understand?  <br/>
  - Are we moving toward a future where AI enhances humanity, or replaces it?  <br/>
  - What does it even mean to be human in a world increasingly shaped by machines?  <br/>
  - If we create superintelligent AI, are we its gods... or its pets?  <br/>
  - Can AI make me a pizza while contemplating Nietzschean existential dread?  <br/>
  - And last but not least, why don't we have rivers made of chocolate and separate taps for ice cream? Hello?
</p>

<p className="mt-2 text-green-300">
I don’t have all the answers. And maybe that’s the point.  
  But I do know that reverse-engineering reality is the closest thing we have to understanding it.  
  So I’ll keep experimenting, breaking things, and questioning everything.   
  Thanks for coming to my **TED Talk**.  </p>
<hr className="border-green-500 my-4" />

        
        <br />
        <p className="text-green-400">
          <strong>🤔 What You’ll Find Here:</strong>  
          <ul className="mt-1 list-none">
            <li>✔ Experimental builds solving real-world AI issues, game dev experiments, and physics madness</li>
            <li>✔ A mix of serious engineering, reckless creativity, and a few *questionable* life decisions</li>
            <li>✔ Just a girl on a mission to reverse-engineer reality, who may or may not have accidentally uploaded herself into the AI Matrix</li>
          </ul>
        </p>
        <br />
        <p className="text-green-400">
          <strong>🚫 What You Won’t Find Here:</strong>  
          <ul className="mt-1 list-none">
            <li>❌ Corporate job projects. Because data privacy, NDAs, and common sense exist.</li>
            <li>❌ A boring, bullet-pointed CV. This isn’t LinkedIn and I’m not listing every SQL query I’ve ever written.</li>
            <li>❌ Overly polished nonsense. Expect things to be raw, hands-on, and built with love ❤️ (and occasional chaos)</li>
          </ul>
        </p>
      </div>

      {/* PROJECTS LISTING */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div key={index} className="border border-green-500 p-4">
            <Image src={project.image} alt={project.title} width={400} height={200} className="mb-4 border border-green-500" />
            <h2 className="text-xl text-green-300">{project.title}</h2>
            <p className="text-green-400">📌 {project.year} | {project.location}</p>
            <p className="mt-2">{project.description}</p>
            <div className="mt-2 flex flex-wrap">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="bg-green-800 text-white px-2 py-1 text-xs mr-2 rounded">{tag}</span>
              ))}
            </div>
            <div className="mt-2">
              {project.links.map((link, idx) => (
                <a key={idx} href={link.url} className="text-green-500 hover:text-green-300 mr-4">{link.text}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
