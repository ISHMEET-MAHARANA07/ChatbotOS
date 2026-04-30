import './StatsCard.css'

type Props = {
  label: string
  value: number | string
}

function StatsCard({ label, value }: Props) {
  return (
    <div className="stats-card">
      <span className="stats-card-label">{label}</span>
      <span className="stats-card-value">{value}</span>
    </div>
  )
}

export default StatsCard
