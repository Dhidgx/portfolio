// Your four case studies. Each one becomes a card on the home page
// and its own page at /projects/<slug>.
// When you have real numbers (accuracy, emails handled per week, hours saved),
// add them to `results`. Don't publish a number you can't explain in an interview.

export type Project = {
  slug: string;
  title: string;
  context: string;
  privateWork: boolean;
  summary: string;
  pipeline: string[];
  problem: string;
  approach: string[];
  stack: string[];
  results: string;
  next?: string;
};

export const projects: Project[] = [
  {
    slug: "multi-agent-assistant",
    title: "Multi-Agent Business Assistant",
    context: "AI/ML Developer at Webevis Technologies",
    privateWork: true,
    summary:
      "Agents that schedule emails, book meetings, check leads and track website sessions, answering from company data.",
    pipeline: [
      "Incoming task",
      "LangGraph and AutoGen agents",
      "RAG over company data",
      "Local LLM through Ollama",
      "Email, meeting, lead or session update",
    ],
    problem:
      "The team needed routine sales and admin work handled automatically: scheduling emails, booking meetings, checking new leads and tracking how long visitors stay on the website.",
    approach: [
      "Multiple agents, coordinated with LangGraph and AutoGen, share the four workflows.",
      "A RAG layer built with LangChain and pgvector grounds the agents' answers in company data.",
      "Open-source LLMs are served locally through Ollama and connected to the agent workflows.",
    ],
    stack: ["Python", "LangGraph", "AutoGen", "LangChain", "PostgreSQL", "pgvector", "Ollama"],
    results: "Four recurring workflows now run through one assistant instead of manual steps.",
  },
  {
    slug: "activity-recognition",
    title: "Cleaning-Activity Recognition",
    context: "Full-Stack AI Intern at InvoZone, for a US healthcare-facilities client",
    privateWork: true,
    summary:
      "Object detection and pose-based activity recognition in video for a US healthcare-facilities client.",
    pipeline: [
      "Labelled video",
      "YOLOv6 object detection",
      "VGG pose keypoints",
      "ST-GCN classifier",
      "Cleaning activity",
    ],
    problem:
      "A US healthcare-facilities client needed to detect objects and recognize staff cleaning activities in video.",
    approach: [
      "Labelled the image and video training data in Roboflow and CVAT.",
      "YOLOv6 detects objects in each frame.",
      "VGG-based pose estimation extracts body keypoints, and an ST-GCN (spatial-temporal graph convolutional network) classifies the keypoint sequences into cleaning activities.",
    ],
    stack: ["Python", "YOLOv6", "VGG", "ST-GCN", "Roboflow", "CVAT"],
    results: "One pipeline turns raw footage into detected objects and labelled activities.",
  },
  {
    slug: "fair-verification",
    title: "Fair Verification in Adaptive Assessment",
    context: "MS research at UET Lahore",
    privateWork: false,
    summary:
      "Deciding which learners to ask to verify their results when ability and engagement don't match, measured for accuracy and fairness.",
    pipeline: [
      "Performance and engagement data",
      "LightGBM mismatch detection",
      "AutoGen agents",
      "Verification decision",
      "Accuracy and fairness metrics",
    ],
    problem:
      "When a learner's ability and engagement don't match, for example where generative AI may be involved, an adaptive assessment has to decide whom to ask to verify their results without unfairly flagging some groups.",
    approach: [
      "Combines LightGBM classification with AutoGen agents in a simulated adaptive-assessment setting.",
      "Evaluated on the ASSIST, Math1 and DAiSEE datasets across multiple random seeds.",
    ],
    stack: ["Python", "AutoGen", "LightGBM"],
    results:
      "Measures detection quality and fairness together, using AUC, F1 and false-positive rates.",
    next: "The manuscript is in preparation for the journal MDPI Algorithms.",
  },
  {
    slug: "text-to-speech",
    title: "Text-to-Speech Pipeline",
    context: "Full-Stack AI Intern at InvoZone",
    privateWork: true,
    summary:
      "Turns text into speech: wav2vec prepares the training clips, Tacotron generates spectrograms and a vocoder produces the audio.",
    pipeline: [
      "Raw recordings",
      "wav2vec clip segmentation",
      "Tacotron: text to mel spectrogram",
      "Vocoder",
      "Speech audio",
    ],
    problem: "Turn written text into speech, starting from raw, unsegmented recordings.",
    approach: [
      "wav2vec splits raw recordings into training clips.",
      "Tacotron learns to map text to mel spectrograms.",
      "A vocoder converts the spectrograms back into audio.",
    ],
    stack: ["Python", "wav2vec", "Tacotron", "Vocoder"],
    results: "An end-to-end path from raw recordings to synthesized speech.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
