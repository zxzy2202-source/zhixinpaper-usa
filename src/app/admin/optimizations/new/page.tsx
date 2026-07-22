import OptimizationLogForm from "./OptimizationLogForm";

export default function NewOptimizationLogPage() {
  const today = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(new Date());

  return <OptimizationLogForm defaultDate={today} />;
}
