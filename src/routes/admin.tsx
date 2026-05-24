import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AdminDashboard } from '../components/admin/AdminDashboard'
import { AdminLogin } from '../components/admin/AdminLogin'
import { CrudPanel } from '../components/admin/AdminTable'
import { MatchSummaryPanel } from '../components/admin/MatchSummaryPanel'
import { PlayersPanel } from '../components/admin/PlayersPanel'
import type { AdminTab } from '../components/admin/adminData'
import {
  groundColumns,
  initialGrounds,
  initialMatchups,
  initialPlayers,
  initialTournaments,
  matchupColumns,
  tabs,
  tournamentColumns,
} from '../components/admin/adminData'

export const Route = createFileRoute('/admin')({ component: AdminPage })

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('crichive_admin_auth') === 'true'
  })
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#090d12] px-4 py-6 text-primary md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-green">CricHive Admin</p>
            <h1 className="font-display text-3xl font-black tracking-tight">Operations Console</h1>
            <p className="text-sm text-on-surface-variant">Dashboard, data management, match summaries, and prediction matchup controls.</p>
          </div>
          <button
            onClick={() => {
              window.localStorage.removeItem('crichive_admin_auth')
              setIsAuthenticated(false)
            }}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-on-surface-variant hover:border-red-400/50 hover:text-red-300"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-3">
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    activeTab === tab.id
                      ? 'bg-neon-green text-black'
                      : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">
            {activeTab === 'dashboard' && (
              <AdminDashboard
                grounds={initialGrounds}
                players={initialPlayers}
                tournaments={initialTournaments}
                matchups={initialMatchups}
                onOpenTab={setActiveTab}
              />
            )}
            {activeTab === 'grounds' && <CrudPanel title="Grounds" columns={groundColumns} initialRows={initialGrounds} />}
            {activeTab === 'players' && <PlayersPanel tournaments={initialTournaments} />}
            {activeTab === 'tournaments' && <CrudPanel title="Cricket Tournaments" columns={tournamentColumns} initialRows={initialTournaments} />}
            {activeTab === 'summaries' && <MatchSummaryPanel />}
            {activeTab === 'matchups' && <CrudPanel title="Player vs Player / Bowler vs Batter" columns={matchupColumns} initialRows={initialMatchups} />}
          </main>
        </div>
      </div>
    </div>
  )
}
