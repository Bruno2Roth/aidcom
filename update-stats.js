#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const STATS_FILE = path.join(__dirname, "public", "stats.json")

function loadStats() {
  try {
    const raw = fs.readFileSync(STATS_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return {
      totalVisits: 0,
      firstVisit: null,
      lastVisit: null,
      sessions: 0,
      dailyVisits: {},
    }
  }
}

function saveStats(stats) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2) + "\n", "utf-8")
}

function getToday() {
  return new Date().toISOString().split("T")[0]
}

function addVisit() {
  const stats = loadStats()
  const now = new Date().toISOString()
  const today = getToday()

  stats.totalVisits += 1
  stats.sessions += 1
  stats.firstVisit = stats.firstVisit || now
  stats.lastVisit = now
  stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + 1

  saveStats(stats)
  console.log(`✅ Visita registrada. Total: ${stats.totalVisits}`)
}

function addVisits(n) {
  const stats = loadStats()
  const now = new Date().toISOString()
  const today = getToday()

  stats.totalVisits += n
  stats.sessions += n
  stats.firstVisit = stats.firstVisit || now
  stats.lastVisit = now
  stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + n

  saveStats(stats)
  console.log(`✅ ${n} visitas registradas. Total: ${stats.totalVisits}`)
}

function showStats() {
  const stats = loadStats()
  console.log("\n📊 Estadísticas de Aidcom Argentina")
  console.log("─".repeat(40))
  console.log(`  Visitas totales:  ${stats.totalVisits}`)
  console.log(`  Sesiones:         ${stats.sessions}`)
  console.log(`  Primera visita:   ${stats.firstVisit || "N/A"}`)
  console.log(`  Última visita:    ${stats.lastVisit || "N/A"}`)
  console.log("")

  const daily = Object.entries(stats.dailyVisits)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7)

  if (daily.length > 0) {
    console.log("  Visitas por día:")
    for (const [date, count] of daily) {
      const bar = "█".repeat(Math.min(count, 30))
      console.log(`    ${date}  ${bar} ${count}`)
    }
  }
  console.log("")
}

function resetStats() {
  const stats = {
    totalVisits: 0,
    firstVisit: null,
    lastVisit: null,
    sessions: 0,
    dailyVisits: {},
  }
  saveStats(stats)
  console.log("🔄 Estadísticas reiniciadas.")
}

const [,, cmd, arg] = process.argv

switch (cmd) {
  case "add":
    if (arg && !isNaN(parseInt(arg))) {
      addVisits(parseInt(arg))
    } else {
      addVisit()
    }
    break
  case "show":
    showStats()
    break
  case "reset":
    resetStats()
    break
  default:
    console.log(`
📊 Gestor de estadísticas - Aidcom Argentina

Uso:
  node update-stats.js add       Registrar 1 visita
  node update-stats.js add 10    Registrar 10 visitas
  node update-stats.js show      Ver estadísticas
  node update-stats.js reset     Reiniciar contador

El archivo se guarda en: public/stats.json
Subilo junto con el build al deploy.
`)
}
