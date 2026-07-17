interface StatCardProps {
  value: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ value, label, dark = false, className = "" }: StatCardProps) {
  return (
    <div
      className={`border p-5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        dark
          ? "border-white/12 bg-white/10 text-white backdrop-blur-sm"
          : "border-[#ded6c8] bg-white text-[#14211f]"
      } ${className}`}
    >
      <div className={`tabular-nums mb-1 text-3xl font-bold leading-none md:text-4xl ${dark ? "text-white" : "text-[#0f5f5c]"}`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${dark ? "text-[#c7d0cb]" : "text-[#4f5f5a]"}`}>
        {label}
      </div>
    </div>
  );
}
