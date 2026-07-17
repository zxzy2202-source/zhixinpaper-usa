interface SectionHeaderProps {
  as?: "h1" | "h2";
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean; // true = white text (for dark bg sections)
}

export default function SectionHeader({
  as: Heading = "h2",
  label,
  title,
  subtitle,
  align = "left",
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "text-center" : ""} ${className}`}>
      {label && (
        <div className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : ""}`}>
          <span className="accent-line" />
          <span className="section-label">{label}</span>
        </div>
      )}
      <Heading
        className={`font-bold text-4xl md:text-5xl leading-tight ${
          dark ? "text-white" : "text-[#14211f]"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"} ${
            dark ? "text-[#c7d0cb]" : "text-[#4f5f5a]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
