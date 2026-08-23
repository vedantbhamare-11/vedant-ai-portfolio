// src/components/ChatMessage.tsx
import { motion } from "framer-motion";
import { User, Bot, Code, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export default function ChatMessage({ msg }: { msg: any }) {
  const textParts = msg.parts?.filter((p: any) => p.type === "text") || [];
  const fallbackText = msg.text || msg.content || "";

  const extractedTools: any[] = [];
  if (Array.isArray(msg.toolInvocations)) {
    extractedTools.push(...msg.toolInvocations);
  }
  if (Array.isArray(msg.parts)) {
    msg.parts.forEach((p: any) => {
      if (p.type === 'tool-invocation' || p.type === 'tool-call' || p.type?.startsWith('tool-')) {
        extractedTools.push(p.toolInvocation || p);
      }
    });
  }
  
  const uniqueTools = Array.from(new Map(extractedTools.map(t => [t.toolCallId || Math.random(), t])).values());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 rounded-2xl p-4",
        msg.role === "user" ? "bg-neutral-50" : "bg-transparent"
      )}
    >
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-1",
        msg.role === "user" ? "bg-neutral-200 text-neutral-600" : "bg-blue-600 text-white"
      )}>
        {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden text-neutral-800">
        {/* TEXT RENDERER */}
        {textParts.length > 0 ? (
          textParts.map((part: any, index: number) => (
            <ReactMarkdown 
              key={`text-${index}`}
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="mb-4 list-disc pl-6 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="mb-4 list-decimal pl-6 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-neutral-950" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                img: ({node, ...props}) => <img className="rounded-xl shadow-sm border border-neutral-200 my-4 max-w-full h-auto max-h-72 object-cover" alt={props.alt || "Vedant"} {...props} />,
              }}
            >
              {part.text}
            </ReactMarkdown>
          ))
        ) : fallbackText ? (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
              img: ({node, ...props}) => <img className="rounded-xl shadow-sm border border-neutral-200 my-4 max-w-full h-auto max-h-72 object-cover" alt={props.alt || "Vedant"} {...props} />,
            }}
          >
            {fallbackText}
          </ReactMarkdown>
        ) : null}

        {/* TOOL RENDERER (PROJECT CARDS) */}
        {uniqueTools.map((tool: any, index: number) => {
          const toolName = tool.toolName || (tool.type === 'tool-showProjectCard' ? 'showProjectCard' : null);

          if (toolName === "showProjectCard") {
            const project = tool.input || tool.output || tool.args || tool.result;

            if (!project || Object.keys(project).length === 0) {
              return (
                <div key={`loading-${index}`} className="my-4 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-50 p-5 h-32 flex items-center justify-center">
                  <span className="text-sm font-medium text-neutral-400">Loading project details...</span>
                </div>
              );
            }

            return (
              <motion.div 
                key={`tool-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-4 flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-neutral-900 text-lg">
                    {project.title || "Featured Project"}
                  </h3>
                </div>
                
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies?.map((tech: string, i: number) => (
                    <span key={i} className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-semibold tracking-wide text-neutral-600 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 w-fit inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    View Live Project <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
}