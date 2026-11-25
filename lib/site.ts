// Everything about you that appears on the site lives here, in projects.ts and in experience.ts.
// Edit these values; the pages update automatically.

export const site = {
  name: "Mudassar Hussain",
  url: "https://mudassar-hussain.vercel.app",
  title: "Mudassar Hussain | AI Engineer (RAG, Agents, Python)",
  description:
    "AI engineer in Lahore building LLM agents, RAG pipelines and Python/Next.js apps. Available for remote contract and full-time roles with US and Canadian teams.",
  email: "Mudassirhussain4391@gmail.com",
  linkedin: "https://www.linkedin.com/in/mudassar-hussain-825678432",
  github: "https://github.com/Dhidgx",
  // Export your resume doc as a PDF, name it resume.pdf and put it in /public.
  resume: "/resume.pdf",
};

// Header and footer links. Each one points at a section on the home page.
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const facts = [
  { term: "Education", detail: "MS Computer Science, UET Lahore, CGPA 3.67" },
  { term: "Experience", detail: "4 roles across AI and full-stack engineering" },
  { term: "Research", detail: "Fairness in AI-driven assessment" },
];

export const skills = [
  {
    group: "AI & LLMs",
    items: ["LangChain", "LangGraph", "AutoGen", "Ollama", "RAG", "Multi-agent systems"],
  },
  {
    group: "ML & vision",
    items: ["YOLOv6", "VGG", "ST-GCN", "LightGBM", "Hugging Face"],
  },
  { group: "Speech", items: ["Tacotron", "wav2vec", "Vocoders"] },
  {
    group: "Backend & web",
    items: ["Python", "Django", "FastAPI", "Flask", "JavaScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
  },
  {
    group: "Data & tools",
    items: ["PostgreSQL", "pgvector", "MySQL", "Docker", "Vercel", "Git", "Roboflow", "CVAT"],
  },
];
