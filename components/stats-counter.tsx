"use client"

import { useState, useEffect } from "react"
import { BarChart3, ChevronUp, ChevronDown, Clock, Eye, Calendar, Globe, TrendingUp } from "lucide-react"

interface Stats {
  totalVisits: number
  firstVisit: string | null
  lastVisit: string | null
  sessions: number
  dailyVisits: Record<string, number>
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

function getToday(): string {
  return new Date().toISOString().split("T")[0]
}

export function StatsCounter() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [sessionStart] = useState(() => Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    fetch("/stats.json")
      .then((r) => r.json())
      .then((data: Stats) => {
        setStats(data)
      })
      .catch(() => {
        setStats({
          totalVisits: 0,
          firstVisit: null,
          lastVisit: null,
          sessions: 0,
          dailyVisits: {},
        })
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - sessionStart)
    }, 1000)
    return () => clearInterval(interval)
  }, [sessionStart])

  if (!stats) return null

  const today = getToday()
  const visitsToday = stats.dailyVisits[today] || 0

  const last7 = Object.entries(stats.dailyVisits)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className={`overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1a]/95 shadow-2xl backdrop-blur-md transition-all duration-300 ${
          expanded ? "w-80" : "w-auto"
        }`}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-white/5"
        >
          <BarChart3 className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-white/90">
            {stats.totalVisits.toLocaleString("es-AR")} visitas
          </span>
          {expanded ? (
            <ChevronDown className="ml-auto h-3.5 w-3.5 text-white/40" />
          ) : (
            <ChevronUp className="ml-auto h-3.5 w-3.5 text-white/40" />
          )}
        </button>

        {expanded && (
          <div className="space-y-3 border-t border-white/10 px-4 pb-4 pt-3">
            <div className="grid grid-cols-2 gap-3">
              <StatItem
                icon={<Eye className="h-3.5 w-3.5" />}
                label="Visitas totales"
                value={stats.totalVisits.toLocaleString("es-AR")}
              />
              <StatItem
                icon={<TrendingUp className="h-3.5 w-3.5" />}
                label="Visitas hoy"
                value={visitsToday.toLocaleString("es-AR")}
              />
              <StatItem
                icon={<Globe className="h-3.5 w-3.5" />}
                label="Sesiones"
                value={stats.sessions.toLocaleString("es-AR")}
              />
              <StatItem
                icon={<Clock className="h-3.5 w-3.5" />}
                label="En esta sesión"
                value={formatDuration(elapsed)}
              />
            </div>

            {stats.firstVisit && (
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <p className="text-[11px] text-white/40">Primera visita</p>
                <p className="text-xs text-white/70">{formatDate(stats.firstVisit)}</p>
              </div>
            )}

            {stats.lastVisit && (
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <p className="text-[11px] text-white/40">Última visita</p>
                <p className="text-xs text-white/70">{formatDate(stats.lastVisit)}</p>
              </div>
            )}

            {last7.length > 0 && (
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <p className="mb-2 text-[11px] text-white/40">Últimos 7 días</p>
                <div className="flex items-end gap-1">
                  {last7.reverse().map(([date, count]) => {
                    const maxCount = Math.max(...last7.map(([, c]) => c), 1)
                    const height = Math.max((count / maxCount) * 40, 4)
                    return (
                      <div key={date} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[9px] text-white/40">{count}</span>
                        <div
                          className="w-full rounded-sm bg-cyan-500/60"
                          style={{ height: `${height}px` }}
                        />
                        <span className="text-[8px] text-white/30">
                          {date.slice(5)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <div className="mb-1 flex items-center gap-1.5 text-white/40">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="text-sm font-semibold text-white/90">{value}</p>
    </div>
  )
}
