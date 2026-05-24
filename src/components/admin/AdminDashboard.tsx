import type { AdminRow, AdminTab, PlayerProfile } from './adminData'

type DashboardProps = {
  grounds: AdminRow[]
  players: PlayerProfile[]
  tournaments: AdminRow[]
  matchups: AdminRow[]
  onOpenTab: (tab: AdminTab) => void
}

const operations = [
  ['Live score sync', 'Healthy', '99.8%', 'sync'],
  ['Prediction engine', 'Training', '84%', 'psychology'],
  ['Content moderation', 'Queued', '12', 'admin_panel_settings'],
]

const activity = [
  ['Match summary approved', 'RCB vs MI final over package', '12 min ago'],
  ['Player profile updated', 'Jasprit Bumrah bowling stats refreshed', '28 min ago'],
  ['Ground status changed', 'Chepauk marked maintenance', '1 hr ago'],
  ['Tournament draft saved', 'Asia Cup 2026 fixture shell', '2 hrs ago'],
]

export function AdminDashboard({ grounds, players, tournaments, matchups, onOpenTab }: DashboardProps) {
  const activeGrounds = grounds.filter((ground) => ground.status === 'Active').length
  const liveTournaments = tournaments.filter((tournament) => tournament.status === 'Live').length
  const playerCountries = new Set(players.map((player) => player.country)).size

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon="stadium" label="Grounds" value={grounds.length.toString()} detail={`${activeGrounds} active venues`} />
        <MetricCard icon="groups" label="Players" value={players.length.toString()} detail={`${playerCountries} countries covered`} />
        <MetricCard icon="emoji_events" label="Tournaments" value={tournaments.length.toString()} detail={`${liveTournaments} live event`} />
        <MetricCard icon="swords" label="Matchups" value={matchups.length.toString()} detail="AI duel records" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-black">Control Room</h2>
              <p className="text-sm text-on-surface-variant">Operational health for score data, prediction models, and moderation flow.</p>
            </div>
            <span className="rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 text-xs font-black text-neon-green">
              All systems visible
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {operations.map(([label, status, value, icon]) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="material-symbols-outlined text-electric-blue">{icon}</span>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                    {status}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{label}</p>
                <p className="font-display text-3xl font-black text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <QuickAction icon="add_location_alt" label="Manage Grounds" onClick={() => onOpenTab('grounds')} />
            <QuickAction icon="person_add" label="Manage Players" onClick={() => onOpenTab('players')} />
            <QuickAction icon="playlist_add" label="Match Summaries" onClick={() => onOpenTab('summaries')} />
            <QuickAction icon="query_stats" label="Player Matchups" onClick={() => onOpenTab('matchups')} />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-display text-2xl font-black">Recent Admin Activity</h2>
          <div className="mt-5 space-y-3">
            {activity.map(([title, description, time]) => (
              <div key={title} className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black text-primary">{title}</p>
                  <span className="shrink-0 text-[10px] font-bold text-on-surface-variant">{time}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function MetricCard({ icon, label, value, detail }: { icon: string; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="material-symbols-outlined text-neon-green">{icon}</span>
        <span className="h-2 w-2 rounded-full bg-neon-green" />
      </div>
      <p className="text-xs font-black uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="font-display text-4xl font-black text-primary">{value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{detail}</p>
    </div>
  )
}

function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#05070a]/60 px-4 py-3 text-left text-sm font-black text-primary hover:border-neon-green/30 hover:bg-white/[0.06]"
    >
      <span className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-neon-green">{icon}</span>
        {label}
      </span>
      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
    </button>
  )
}
