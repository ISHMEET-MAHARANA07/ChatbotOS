import { useState, useEffect } from 'react'
import StatsCard from '../components/StatsCard'
import BarChart from '../components/BarChart'
import { getStats } from '../api'
import type { StatsEntry } from '../api'
import './DashboardPage.css'

type Filter = 'daily' | 'monthly'

function getStatTotals(data: StatsEntry[]) {
    const total = data.reduce((sum, d) => sum + d.user_count + d.bot_count, 0)
    const userTotal = data.reduce((sum, d) => sum + d.user_count, 0)
    const botTotal = data.reduce((sum, d) => sum + d.bot_count, 0)
    return { total, userTotal, botTotal }
}

function DashboardPage() {
    const [filter, setFilter] = useState<Filter>('daily')
    const [data, setData] = useState<StatsEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        setError('')

        getStats(filter)
            .then(setData)
            .catch(() => setError('Could not load stats.'))
            .finally(() => setLoading(false))
    }, [filter])

    const { total, userTotal, botTotal } = getStatTotals(data)

    return (
        <div className="page">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <div className="filter-toggle">
                    <button
                        className={filter === 'daily' ? 'active' : ''}
                        onClick={() => setFilter('daily')}
                    >
                        Daily
                    </button>
                    <button
                        className={filter === 'monthly' ? 'active' : ''}
                        onClick={() => setFilter('monthly')}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <div className="stats-row">
                <StatsCard label="Total messages" value={loading ? '--' : total} />
                <StatsCard label="User messages" value={loading ? '--' : userTotal} />
                <StatsCard label="Bot messages" value={loading ? '--' : botTotal} />
            </div>

            {error && <p className="dashboard-error">{error}</p>}

            {loading ? (
                <p className="dashboard-loading">Loading chart...</p>
            ) : (
                <BarChart data={data} />
            )}
        </div>
    )
}

export default DashboardPage
