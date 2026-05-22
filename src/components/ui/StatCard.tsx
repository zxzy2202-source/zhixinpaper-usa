interface StatCardProps {
  value: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ value, label, dark = false, className = "" }: StatCardProps) {
  return (
    <div
      className={`text-center p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
        dark
          ? "bg-white/10 backdrop-blur-sm text-white"
          : "bg-white border border-slate-100 text-slate-800"
      } ${className}`}
    >
      <div className={`text-3xl md:text-4xl font-extrabold leading-none mb-1 ${dark ? "text-white" : "text-blue-600"}`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${dark ? "text-blue-100" : "text-slate-500"}`}>
        {label}
      </div>
    </div>
  );
}
