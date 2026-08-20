import React from 'react';
import Markdown from 'react-markdown';
import { CheckCircle2, ChevronRight, Sparkles, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
      <Markdown
        components={{
          h1: ({ children }) => (
            <div className="pt-6 pb-3 border-b border-slate-800/80 mb-4 first:pt-0">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>{children}</span>
              </h1>
            </div>
          ),
          h2: ({ children }) => (
            <div className="pt-6 pb-2 border-b border-slate-800/60 mb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>{children}</span>
              </h2>
            </div>
          ),
          h3: ({ children }) => (
            <div className="pt-5 pb-2 mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-300 tracking-tight flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{children}</span>
              </h3>
            </div>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold text-slate-100 mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed my-3 font-normal text-sm sm:text-[15px]">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-bold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2.5 my-4 pl-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-3 my-4 list-decimal list-inside text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-[15px]">
              <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          hr: () => (
            <div className="my-8 relative flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <div className="absolute px-4 bg-slate-900 text-slate-600 text-xs uppercase tracking-widest font-mono">
                •••
              </div>
            </div>
          ),
          blockquote: ({ children }) => (
            <div className="my-5 p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border-l-4 border-emerald-500 text-slate-200 text-sm sm:text-[15px] italic shadow-inner">
              {children}
            </div>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-medium transition-colors"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-slate-800 bg-slate-950/50">
              <table className="w-full text-left text-sm text-slate-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-900 text-xs uppercase text-slate-400 font-bold border-b border-slate-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-900/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs font-mono border border-slate-700">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
