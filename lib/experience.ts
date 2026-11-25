// Roles, newest first, then education. These match the LinkedIn profile and the resume.
// The home page's Experience timeline reads from here.

export type Role = {
  title: string;
  company: string;
  dates: string;
  summary: string;
};

export const roles: Role[] = [
  {
    title: "AI/ML Developer",
    company: "Webevis Technologies, Lahore",
    dates: "Jul 2026 – Sep 2026",
    summary:
      "Built a multi-agent assistant in LangGraph and AutoGen with a pgvector RAG layer and local LLMs through Ollama.",
  },
  {
    title: "Artificial Intelligence Engineer",
    company: "ViSigma Apparel Group, Lahore",
    dates: "Jan 2026 – Jun 2026",
    summary: "Built a custom CRM and Django and FastAPI web applications end to end.",
  },
  {
    title: "Associate Full-Stack AI Developer",
    company: "Globex IT Solutions, Lahore",
    dates: "Jul 2025 – Dec 2025",
    summary: "Built an email automation system and delivered multiple Django and FastAPI web applications.",
  },
  {
    title: "Full-Stack AI Intern",
    company: "InvoZone, Lahore",
    dates: "Mar 2025 – May 2025",
    summary:
      "Worked on object and pose-based activity recognition for a US healthcare-facilities client, and a text-to-speech pipeline.",
  },
];

export const education = {
  degree: "MS in Computer Science",
  school: "University of Engineering and Technology (UET), Lahore",
  dates: "Feb 2026 – Jul 2027 (expected)",
};
