import './BarChart.css'
import type { StatsEntry } from '../api'

type Props = {
  data: StatsEntry[]
}

const CHART_HEIGHT = 160
const BAR_WIDTH = 12
const GAP = 32

function BarChart({ data }: Props) {
  if (data.length === 0) {
    return <p className="chart-empty">No telemetry data available.</p>
  }

  const maxValue = Math.max(
    ...data.map((d) => d.user_count + d.bot_count),
    10 // Minimum scale to prevent huge bars for small numbers
  )

  const totalWidth = Math.max(data.length * (BAR_WIDTH * 2 + GAP) + GAP, 400)

  function getBarHeight(count: number): number {
    return (count / maxValue) * CHART_HEIGHT
  }

  // Generate grid line values
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(p => ({
    y: CHART_HEIGHT - (CHART_HEIGHT * p),
    val: Math.round(maxValue * p)
  }));

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-scroll">
        <svg
          width={totalWidth}
          height={CHART_HEIGHT + 60}
          viewBox={`0 0 ${totalWidth} ${CHART_HEIGHT + 60}`}
        >
          {/* Background Grid */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1="0" y1={line.y} x2={totalWidth} y2={line.y}
                stroke="#f0f0f0" strokeWidth="1"
              />
              <text x="5" y={line.y - 5} fontSize="10" fill="#bbb" fontWeight="500">
                {line.val}
              </text>
            </g>
          ))}

          {data.map((entry, i) => {
            const x = GAP + i * (BAR_WIDTH * 2 + GAP)
            const userHeight = getBarHeight(entry.user_count)
            const botHeight = getBarHeight(entry.bot_count)

            return (
              <g key={entry.date}>
                {/* User Bar */}
                <rect
                  x={x}
                  y={CHART_HEIGHT - userHeight}
                  width={BAR_WIDTH}
                  height={userHeight}
                  fill="#1a1a1a"
                  rx="2"
                />
                {/* Bot Bar */}
                <rect
                  x={x + BAR_WIDTH + 6}
                  y={CHART_HEIGHT - botHeight}
                  width={BAR_WIDTH}
                  height={botHeight}
                  fill="#a0a0a0"
                  rx="2"
                />
                <text
                  x={x + BAR_WIDTH}
                  y={CHART_HEIGHT + 25}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#999"
                  fontWeight="600"
                >
                  {entry.date}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="chart-legend">
        <span className="legend-user">User Activity</span>
        <span className="legend-bot">Bot Logic</span>
      </div>
    </div>
  )
}

export default BarChart
