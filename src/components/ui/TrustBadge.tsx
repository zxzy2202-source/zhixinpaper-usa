import { ShieldCheck, Leaf, Award, FileCheck, CheckCircle2 } from "lucide-react";

type BadgeVariant = "iso" | "bpa" | "fsc" | "fda" | "reach" | "custom";

interface TrustBadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

const BADGE_CONFIG: Record<BadgeVariant, { icon: React.ElementType; label: string; color: string }> = {
  iso:   { icon: Award,        label: "ISO 9001:2015",   color: "bg-[#f4f0e8] text-[#0f5f5c] border-[#ded6c8]" },
  bpa:   { icon: ShieldCheck,  label: "BPA-Free",        color: "bg-green-50 text-green-700 border-green-100" },
  fsc:   { icon: Leaf,         label: "FSC Certified",   color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  fda:   { icon: FileCheck,    label: "FDA Compliant",   color: "bg-sky-50 text-sky-700 border-sky-100" },
  reach: { icon: CheckCircle2, label: "REACH / RoHS",    color: "bg-violet-50 text-violet-700 border-violet-100" },
  custom:{ icon: ShieldCheck,  label: "",                color: "bg-slate-50 text-slate-700 border-slate-100" },
};

export default function TrustBadge({ variant = "iso", label, className = "" }: TrustBadgeProps) {
  const cfg = BADGE_CONFIG[variant];
  const Icon = cfg.icon;
  const text = label ?? cfg.label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm ${cfg.color} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {text}
    </span>
  );
}
