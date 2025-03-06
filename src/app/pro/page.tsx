"use client";

import { useState, useEffect } from "react";

const bootLines = [
  "███ RECRUITER ACCESS GRANTED ███",
  "[LOADING CREDENTIALS...]",
  "[DECRYPTING EXPERIENCE...]",
  "[MATCH FOUND: CANDIDATE — G4B1.exe]",
  "[RETRIEVING DATA...]",
  "------------------------------------",
];

const profileSummary = `
> gabi.exe; elite basement-dwelling UNIX goblin crossbred with social butterfly;
> fluent in finding solutions where others only see chaos
> if it exists, it can be reverse-engineered;
> else, it can be built, automated, and probably broken again
> loves puzzles, cryptic challenges, and systems so broken they make normal engineers cry;
> alternates between being a hyper-focused debugging machine and accidentally adopting leadership roles in group projects 

[ STRENGTHS ]
> deciphering the undecipherable (APIs, legacy systems, cryptic errors)
> reverse-engineering problems until they make sense
> automating chaos into structured, scalable systems
> can learn literally anything if given a reason to (very food motivated)
> surprisingly social for someone who thrives in terminal windows
> has 2 cats (more like gremlins)

[ NEEDS WORK ]
> sometimes *too* deep in the rabbit hole
> unintentionally speed-running existential crises while debugging
> anything can and will become a homemade, dank meme
> claims to “do it later” then enters hyperfocus mode at 2 AM instead
`;

const experience = `
█ EXPERIENCE █
> WMC Group | Sept 2024 – Present | Data Engineer
- Automated business-critical data workflows & reporting pipelines
- Developed Azure Functions & Data Factory ETL processes
- Architected API integrations and data modeling solutions
- Bridged finance and commercial teams to collect and prioritize data needs
- Ran long-term strategy planning for infrastructure & optimizations

> TIP Group | May 2022 – Aug 2024 | Data Engineer / Product Manager
- Built API connectors, data pipelines, and SQL-based automation
- Migrated systems to Azure Databricks & refactored SQL to PySpark
- Designed metadata ingestion and data quality frameworks
- Led cross-functional data initiatives for Operations, Finance & IT
- Established CI/CD pipelines, PyTest-based testing, and IaC practices

> ASML | Sep 2018 – Apr 2019 | EUV Availability Engineer
- Conducted failure analysis and predictive maintenance workflows
- Coordinated cross-team debugging and system optimizations
`;

const skills = `
█ SKILLS █
- Python, SQL, PySpark, API Development
- Azure (Data Factory, Functions, DevOps)
- CI/CD, Infrastructure-as-Code (Bicep)
- AI/ML: Deep Learning, Computer Vision
- UNIX, Linux, Bash, Shell Scripting
- Reverse-engineering undocumented APIs and making them obey
- Multitasking between debugging & making jokes
`;

const education = `
█ EDUCATION █
> EngD Data Science | Eindhoven University of Technology
- Developed machine learning-based predictive models for industrial operations
- Built AI-driven anomaly detection systems for sensor data
- Applied data engineering techniques for large-scale infrastructure analytics
- Researched time-series forecasting models for operational optimizations

> MSc Petroleum Engineering | TU Delft
- Focus: Computational Physics, Fluid Flow Modeling & Simulation
- Developed an algorithm in MATLAB to simulate fluid flow in fractured media

> BSc Mechanical Engineering | PUC-Rio
- Focus: Robotics, Fluid Mechanics, Computational Modeling
- Robotics Team: Built & programmed competitive robots
- Volunteering: STEM outreach, mentoring, and technical education programs
`;

const extracurriculars = `
█ EXTRACURRICULAR & VOLUNTEERING █
> Robotics Team | 2011 – 2012
- Built & programmed combat robots, experimented with AI-driven automation
- Learned that making robots fight is *extremely* fun

> STEM Volunteering | 2015 – 2018
- Helped teach kids about robotics & programming
- Explained complex concepts using memes and bad drawings
- Accidentally inspired future nerds

> Various Chaos Projects | Ongoing
- Randomly decides to deep-dive into a new tech field at 2 AM for fun
- Built small arcade games, experimented with AI, played around with LLMs
- Will probably learn another technology before this page finishes loading
`;

export default function ProPage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + bootLines[currentLine] + "\n");
        setCurrentLine((prev) => prev + 1);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentLine]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <pre className="text-sm whitespace-pre-line leading-snug">
        {displayText}
        {currentLine >= bootLines.length && (
          <>
            {profileSummary}
            {experience}
            {skills}
            {education}
            {extracurriculars}
          </>
        )}
      </pre>
    </div>
  );
}
