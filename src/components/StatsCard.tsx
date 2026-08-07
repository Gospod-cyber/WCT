type StatsCardProps = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}