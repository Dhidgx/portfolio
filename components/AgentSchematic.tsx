import type { CSSProperties } from "react";

// Schematic of the multi-agent assistant built at Webevis Technologies.
// Solid boxes are task agents; dashed boxes are the shared data and models.

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
  edge: string;
  kind: "agent" | "resource";
};

const nodes: Node[] = [
  { id: "email", x: 16, y: 24, w: 140, title: "Email scheduling", edge: "M190 155 L128 76", kind: "agent" },
  { id: "meetings", x: 324, y: 24, w: 140, title: "Meeting booking", edge: "M290 155 L352 76", kind: "agent" },
  { id: "data", x: 16, y: 164, w: 112, title: "Company data", sub: "pgvector RAG", edge: "M165 190 L128 190", kind: "resource" },
  { id: "llm", x: 352, y: 164, w: 112, title: "Local LLMs", sub: "Ollama", edge: "M315 190 L352 190", kind: "resource" },
  { id: "leads", x: 16, y: 304, w: 140, title: "Lead checks", edge: "M190 225 L128 304", kind: "agent" },
  { id: "sessions", x: 324, y: 304, w: 140, title: "Session tracking", edge: "M290 225 L352 304", kind: "agent" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function AgentSchematic() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 480 380"
        role="img"
        aria-label="Schematic of a multi-agent assistant: an orchestrator built with LangGraph and AutoGen connects four agents (email scheduling, meeting booking, lead checks, session tracking) to company data through pgvector RAG and to local LLMs through Ollama."
        className="h-auto w-full"
      >
        {nodes.map((n, i) => (
          <path
            key={`edge-${n.id}`}
            d={n.edge}
            pathLength={1}
            className="schematic-edge"
            style={delay(250 + i * 90)}
            fill="none"
            stroke="var(--color-graphite)"
            strokeWidth={1.25}
          />
        ))}

        <g className="schematic-node" style={delay(0)}>
          <rect
            x={165}
            y={155}
            width={150}
            height={70}
            rx={10}
            fill="var(--color-signal-tint)"
            stroke="var(--color-signal)"
            strokeWidth={2}
          />
          <text x={240} y={185} textAnchor="middle" fontSize={16} fontWeight={650} fill="var(--color-ink)">
            Orchestrator
          </text>
          <text x={240} y={205} textAnchor="middle" fontSize={13} fill="var(--color-graphite)">
            LangGraph + AutoGen
          </text>
        </g>

        {nodes.map((n, i) => (
          <g key={n.id} className="schematic-node" style={delay(700 + i * 90)}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={52}
              rx={8}
              fill="#ffffff"
              stroke={n.kind === "agent" ? "var(--color-ink)" : "var(--color-graphite)"}
              strokeOpacity={n.kind === "agent" ? 0.35 : 1}
              strokeDasharray={n.kind === "resource" ? "4 3" : undefined}
              strokeWidth={1.25}
            />
            {n.sub ? (
              <>
                <text x={n.x + n.w / 2} y={n.y + 23} textAnchor="middle" fontSize={15} fontWeight={550} fill="var(--color-ink)">
                  {n.title}
                </text>
                <text x={n.x + n.w / 2} y={n.y + 40} textAnchor="middle" fontSize={13} fill="var(--color-graphite)">
                  {n.sub}
                </text>
              </>
            ) : (
              <text x={n.x + n.w / 2} y={n.y + 31} textAnchor="middle" fontSize={15} fontWeight={550} fill="var(--color-ink)">
                {n.title}
              </text>
            )}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-[14px] leading-snug text-graphite">
        The multi-agent assistant I built at Webevis Technologies. Solid boxes are agents; dashed boxes are the data and
        models they share.
      </figcaption>
    </figure>
  );
}
