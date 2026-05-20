import { useMemo, useState } from 'react'
import { AdminTable } from './AdminTable'
import {
  battingMetrics,
  bowlingMetrics,
  createEmptyPlayer,
  cricketFormats,
  initialPlayers,
  type AdminRow,
  type CricketFormat,
  type PlayerProfile,
  type SummaryTable,
} from './adminData'

type DrawerMode = 'add' | 'edit' | 'detail'

const playerTableColumns = [
  { key: 'name', label: 'Player' },
  { key: 'country', label: 'Country' },
  { key: 'role', label: 'Role' },
  { key: 'team', label: 'Team' },
  { key: 'battingStyle', label: 'Batting' },
  { key: 'bowlingStyle', label: 'Bowling' },
  { key: 'tournaments', label: 'Tournaments' },
]

export function PlayersPanel({ tournaments }: { tournaments: AdminRow[] }) {
  const [players, setPlayers] = useState<PlayerProfile[]>(initialPlayers)
  const [drawerMode, setDrawerMode] = useState<DrawerMode | null>(null)
  const [draft, setDraft] = useState<PlayerProfile | null>(null)

  const playerRows = useMemo(
    () =>
      players.map((player) => ({
        id: player.id,
        name: player.name,
        country: player.country,
        role: player.role,
        team: player.team,
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
        tournaments: player.availableTournamentIds
          .map((tournamentId) => tournaments.find((tournament) => tournament.id === tournamentId)?.name)
          .filter(Boolean)
          .join(', ') || 'Not assigned',
      })),
    [players, tournaments],
  )

  function openDrawer(mode: DrawerMode, player?: PlayerProfile) {
    setDrawerMode(mode)
    setDraft(player ? structuredClone(player) : createEmptyPlayer())
  }

  function closeDrawer() {
    setDrawerMode(null)
    setDraft(null)
  }

  function saveDraft() {
    if (!draft) return
    if (drawerMode === 'add') {
      setPlayers((currentPlayers) => [draft, ...currentPlayers])
    } else {
      setPlayers((currentPlayers) => currentPlayers.map((player) => (player.id === draft.id ? draft : player)))
    }
    closeDrawer()
  }

  function findPlayer(row: AdminRow) {
    return players.find((player) => player.id === row.id)
  }

  return (
    <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black">Players</h2>
          <p className="text-sm text-on-surface-variant">Table listing first. Add, edit, or view full player detail from the side panel.</p>
        </div>
        <button onClick={() => openDrawer('add')} className="rounded-2xl bg-neon-green px-5 py-2 text-sm font-black text-black">
          Add Player
        </button>
      </div>

      <AdminTable
        columns={playerTableColumns}
        rows={playerRows}
        onDetail={(row) => {
          const player = findPlayer(row)
          if (player) openDrawer('detail', player)
        }}
        onEdit={(row) => {
          const player = findPlayer(row)
          if (player) openDrawer('edit', player)
        }}
        onDelete={(rowId) => setPlayers((currentPlayers) => currentPlayers.filter((player) => player.id !== rowId))}
      />

      {drawerMode && draft && (
        <PlayerDrawer
          mode={drawerMode}
          player={draft}
          tournaments={tournaments}
          onClose={closeDrawer}
          onSave={saveDraft}
          onChange={setDraft}
        />
      )}
    </section>
  )
}

function PlayerDrawer({
  mode,
  player,
  tournaments,
  onClose,
  onSave,
  onChange,
}: {
  mode: DrawerMode
  player: PlayerProfile
  tournaments: AdminRow[]
  onClose: () => void
  onSave: () => void
  onChange: (player: PlayerProfile) => void
}) {
  const isDetail = mode === 'detail'
  const title = mode === 'add' ? 'Add Player' : mode === 'edit' ? 'Edit Player' : 'Player Detail'

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <button aria-label="Close player panel" className="hidden flex-1 cursor-default md:block" onClick={onClose} />
      <aside className="h-full w-full overflow-y-auto border-l border-white/10 bg-[#0c1218] p-5 shadow-2xl md:max-w-[760px]">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neon-green">Players</p>
            <h3 className="font-display text-2xl font-black">{title}</h3>
            <p className="text-sm text-on-surface-variant">{isDetail ? 'Read-only full profile view.' : 'Fill bio, tournament availability, and format-wise summaries.'}</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-on-surface-variant">
            Close
          </button>
        </div>

        <div className="space-y-5">
          <PlayerBioSection player={player} readonly={isDetail} onChange={onChange} />
          <TournamentSection player={player} tournaments={tournaments} readonly={isDetail} onChange={onChange} />
          <SummarySection title="Batting Summary" metrics={battingMetrics} summary={player.battingSummary} readonly={isDetail} onChange={(metric, format, value) => onChange({
            ...player,
            battingSummary: {
              ...player.battingSummary,
              [metric]: {
                ...player.battingSummary[metric],
                [format]: value,
              },
            },
          })} />
          <SummarySection title="Bowling Summary" metrics={bowlingMetrics} summary={player.bowlingSummary} readonly={isDetail} onChange={(metric, format, value) => onChange({
            ...player,
            bowlingSummary: {
              ...player.bowlingSummary,
              [metric]: {
                ...player.bowlingSummary[metric],
                [format]: value,
              },
            },
          })} />
        </div>

        {!isDetail && (
          <div className="sticky bottom-0 mt-6 flex gap-3 border-t border-white/10 bg-[#0c1218]/95 py-4 backdrop-blur">
            <button onClick={onSave} className="flex-1 rounded-2xl bg-neon-green px-5 py-3 text-sm font-black text-black">
              Save Player
            </button>
            <button onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-on-surface-variant">
              Cancel
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

function PlayerBioSection({ player, readonly, onChange }: { player: PlayerProfile; readonly: boolean; onChange: (player: PlayerProfile) => void }) {
  const fields: { key: keyof PlayerProfile; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'country', label: 'Country' },
    { key: 'born', label: 'Born' },
    { key: 'birthPlace', label: 'Birth Place' },
    { key: 'height', label: 'Height' },
    { key: 'role', label: 'Role' },
    { key: 'team', label: 'Team' },
    { key: 'battingStyle', label: 'Batting Style' },
    { key: 'bowlingStyle', label: 'Bowling Style' },
  ]

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="mb-4 font-display text-xl font-black">Basic Information</h4>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <label key={String(field.key)} className="block">
            <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{field.label}</span>
            <input
              value={String(player[field.key] ?? '')}
              readOnly={readonly}
              onChange={(event) => onChange({ ...player, [field.key]: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#05070a] px-3 py-2 text-sm outline-none read-only:text-on-surface-variant focus:border-neon-green"
            />
          </label>
        ))}
      </div>
    </section>
  )
}

function TournamentSection({
  player,
  tournaments,
  readonly,
  onChange,
}: {
  player: PlayerProfile
  tournaments: AdminRow[]
  readonly: boolean
  onChange: (player: PlayerProfile) => void
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="mb-1 font-display text-xl font-black">Tournament Availability</h4>
      <p className="mb-4 text-xs text-on-surface-variant">Select which tournaments this player is available for.</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tournaments.map((tournament) => {
          const isChecked = player.availableTournamentIds.includes(tournament.id)
          return (
            <label key={tournament.id} className={`rounded-2xl border p-4 ${isChecked ? 'border-neon-green bg-neon-green/10' : 'border-white/10 bg-[#05070a]'}`}>
              <input
                type="checkbox"
                checked={isChecked}
                disabled={readonly}
                onChange={(event) => onChange({
                  ...player,
                  availableTournamentIds: event.target.checked
                    ? [...player.availableTournamentIds, tournament.id]
                    : player.availableTournamentIds.filter((tournamentId) => tournamentId !== tournament.id),
                })}
                className="sr-only"
              />
              <span className="block font-display text-sm font-black text-primary">{tournament.name}</span>
              <span className="text-xs text-on-surface-variant">{tournament.format} • {tournament.season}</span>
            </label>
          )
        })}
      </div>
    </section>
  )
}

function SummarySection({
  title,
  metrics,
  summary,
  readonly,
  onChange,
}: {
  title: string
  metrics: string[]
  summary: SummaryTable
  readonly: boolean
  onChange: (metric: string, format: CricketFormat, value: string) => void
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="mb-4 font-display text-xl font-black">{title}</h4>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-3 py-3 font-black">Metric</th>
                {cricketFormats.map((format) => (
                  <th key={format} className="px-3 py-3 font-black">{format}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {metrics.map((metric) => (
                <tr key={metric}>
                  <td className="px-3 py-2 font-bold text-on-surface-variant">{metric}</td>
                  {cricketFormats.map((format) => (
                    <td key={format} className="px-3 py-2">
                      <input
                        value={summary[metric]?.[format] ?? '0'}
                        readOnly={readonly}
                        onChange={(event) => onChange(metric, format, event.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-[#05070a] px-2 py-1.5 text-sm text-primary outline-none read-only:text-on-surface-variant focus:border-neon-green"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
