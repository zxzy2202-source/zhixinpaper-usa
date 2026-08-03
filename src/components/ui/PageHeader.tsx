import type { ReactNode } from "react";

export interface PageHeaderAction {
  icon: ReactNode;
  label: string;
}

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: PageHeaderAction[];
}

export default function PageHeader({ eyebrow, title, description, actions = [] }: PageHeaderProps) {
  return (
    <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
      <div className="container-site">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-0.5 w-8 bg-[#9c661d]" />
          <span className="text-xs font-bold text-[#0f5f5c]">{eyebrow}</span>
        </div>
        <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">{description}</p>
        )}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-4 text-xs text-[#4f5f5a]">
            {actions.map((a) => (
              <div key={a.label} className="flex items-center gap-1.5">
                {a.icon}
                <span>{a.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
