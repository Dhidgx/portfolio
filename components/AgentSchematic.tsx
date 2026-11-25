import type { CSSProperties } from "react";

// Schematic of the multi-agent assistant built at Webevis Technologies, drawn for a navy background.
// Solid boxes are task agents; dashed boxes are the shared data and models.
// Two layouts: landscape from 640px up, portrait on phones so the labels stay readable.

type Box = { x: number; y: number; w: number; h: number };
type NodeId = "email" | "meetings" | "sessions" | "leads" | "data" | "llm";
type Layout = {
  name: string;
  width: number;
  height: number;
  orchestrator: Box;
  nodes: { id: NodeId; box: Box; edge: string }[];
  className: string;
};

const labels: Record<NodeId, { title: string; sub?: string; kind: "agent" | "resource" }> = {
  email: { title: "Email scheduling", kind: "agent" },
  meetings: { title: "Meeting booking", kind: "agent" },
  sessions: { title: "Session tracking", kind: "agent" },
  leads: { title: "Lead checks", kind: "agent" },
  data: { title: "Company data", sub: "pgvector RAG", kind: "resource" },
  llm: { title: "Local LLMs", sub: "Ollama", kind: "resource" },
};

// Pulses leave the orchestrator for each agent in turn, clockwise from top left.
const pulseDelay: Partial<Record<NodeId, number>> = { email: 0, meetings: 350, sessions: 700, leads: 1050 };

const wide: Layout = {
  name: "wide",
  width: 520,
  height: 380,
  orchestrator: { x: 176, y: 148, w: 168, h: 84 },
  nodes: [
    { id: "email", box: { x: 8, y: 24, w: 156, h: 52 }, edge: "M214 148 L128 76" },
    { id: "meetings", box: { x: 356, y: 24, w: 156, h: 52 }, edge: "M306 148 L392 76" },
    { id: "data", box: { x: 8, y: 162, w: 132, h: 56 }, edge: "M176 190 H140" },
    { id: "llm", box: { x: 380, y: 162, w: 132, h: 56 }, edge: "M344 190 H380" },
    { id: "leads", box: { x: 8, y: 304, w: 156, h: 52 }, edge: "M214 232 L128 304" },
    { id: "sessions", box: { x: 356, y: 304, w: 156, h: 52 }, edge: "M306 232 L392 304" },
  ],
  className: "hidden sm:block",
};

const tall: Layout = {
  name: "tall",
  width: 340,
  height: 456,
  orchestrator: { x: 70, y: 188, w: 200, h: 80 },
  nodes: [
    { id: "data", box: { x: 95, y: 2, w: 150, h: 56 }, edge: "M170 188 V58" },
    { id: "email", box: { x: 2, y: 90, w: 152, h: 52 }, edge: "M120 188 L82 142" },
    { id: "meetings", box: { x: 186, y: 90, w: 152, h: 52 }, edge: "M220 188 L258 142" },
    { id: "leads", box: { x: 2, y: 314, w: 152, h: 52 }, edge: "M120 268 L82 314" },
    { id: "sessions", box: { x: 186, y: 314, w: 152, h: 52 }, edge: "M220 268 L258 314" },
    { id: "llm", box: { x: 95, y: 398, w: 150, h: 56 }, edge: "M170 268 V398" },
  ],
  className: "mx-auto max-w-[22rem] sm:hidden",
};

const description =
  "Schematic of a multi-agent assistant: an orchestrator built with LangGraph and AutoGen connects four agents (email scheduling, meeting booking, lead checks, session tracking) to company data through pgvector RAG and to local LLMs through Ollama.";

function Diagram({ layout }: { layout: Layout }) {
  const { name, width, height, orchestrator: o } = layout;
  const cx = o.x + o.w / 2;
  const cy = o.y + o.h / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={description} className={`h-auto w-full ${layout.className}`}>
      <defs>
        <filter id={`${name}-glow`} filterUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${name}-pulse`} filterUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {layout.nodes.map((n) => (
        <path key={`edge-${n.id}`} d={n.edge} fill="none" className="stroke-sky/50" strokeWidth={1.25} />
      ))}

      {layout.nodes
        .filter((n) => pulseDelay[n.id] !== undefined)
        .map((n) => {
          const style = { "--delay": `${pulseDelay[n.id]}ms` } as CSSProperties;
          return (
            <g key={`pulse-${n.id}`} aria-hidden="true">
              <path
                d={n.edge}
                pathLength={1}
                fill="none"
                className="pulse stroke-sky"
                strokeWidth={14}
                strokeOpacity={0.6}
                strokeLinecap="round"
                filter={`url(#${name}-pulse)`}
                style={style}
              />
              <path d={n.edge} pathLength={1} fill="none" className="pulse stroke-white" strokeWidth={5} strokeLinecap="round" style={style} />
            </g>
          );
        })}

      <rect x={o.x - 6} y={o.y - 6} width={o.w + 12} height={o.h + 12} rx={18} className="fill-sky" opacity={0.28} filter={`url(#${name}-glow)`} />
      <rect x={o.x} y={o.y} width={o.w} height={o.h} rx={14} className="fill-navy-800 stroke-sky" strokeWidth={1.5} />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={17} fontWeight={700} className="fill-white">
        Orchestrator
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize={13} className="fill-sky">
        LangGraph + AutoGen
      </text>

      {layout.nodes.map(({ id, box }) => {
        const label = labels[id];
        const mid = box.x + box.w / 2;
        return (
          <g key={id}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={10}
              className={label.kind === "agent" ? "fill-navy-800 stroke-sky" : "fill-navy-900 stroke-sky"}
              strokeOpacity={label.kind === "agent" ? 0.9 : 0.7}
              strokeDasharray={label.kind === "resource" ? "4 3" : undefined}
              strokeWidth={1}
            />
            {label.sub ? (
              <>
                <text x={mid} y={box.y + 24} textAnchor="middle" fontSize={15} fontWeight={600} className="fill-white">
                  {label.title}
                </text>
                <text x={mid} y={box.y + 42} textAnchor="middle" fontSize={13} className="fill-white" fillOpacity={0.72}>
                  {label.sub}
                </text>
              </>
            ) : (
              <text x={mid} y={box.y + 31} textAnchor="middle" fontSize={15} fontWeight={600} className="fill-white">
                {label.title}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function AgentSchematic() {
  return (
    <figure className="w-full">
      <Diagram layout={wide} />
      <Diagram layout={tall} />
      <figcaption className="mt-4 max-w-[52ch] text-small text-white/70">
        The multi-agent assistant I built at Webevis Technologies. Solid boxes are agents; dashed boxes are the data and
        models they share.
      </figcaption>
    </figure>
  );
}
