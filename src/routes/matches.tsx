import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { matches, type MatchFormat, type MatchStatus, type MatchSummary, type MatchTeam } from '../data/matches'
import { useCommentaries } from '../hooks/useCricketData'

export const Route = createFileRoute('/matches')({ component: MatchesCenter })

const matchFormats: Array<'all' | MatchFormat> = ['all', 'T20', 'ODI', 'Test']

function MatchesCenter() {
  const { data: commentaries, isLoading: commentaryLoading } = useCommentaries()
  const [activeStatus, setActiveStatus] = useState<MatchStatus>('live')
  const [activeFormat, setActiveFormat] = useState<'all' | MatchFormat>('all')
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id)
  const [predictions, setPredictions] = useState<Record<string, string>>({})

  const selectedMatch = matches.find((match) => match.id === selectedMatchId) ?? matches[0]
  const groupedMatches = useMemo(
    () =>
      matches.filter(
        (match) => match.status === activeStatus && (activeFormat === 'all' || match.format === activeFormat),
      ),
    [activeFormat, activeStatus],
  )

  const selectStatus = (status: MatchStatus) => {
    setActiveStatus(status)
    const nextMatch =
      matches.find((match) => match.status === status && (activeFormat === 'all' || match.format === activeFormat)) ??
      matches.find((match) => match.status === status) ??
      matches[0]
    setSelectedMatchId(nextMatch.id)
  }

  const selectFormat = (format: 'all' | MatchFormat) => {
    setActiveFormat(format)
    const nextMatch =
      matches.find((match) => match.status === activeStatus && (format === 'all' || match.format === format)) ??
      matches.find((match) => format === 'all' || match.format === format) ??
      matches[0]
    setSelectedMatchId(nextMatch.id)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8 rise-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-primary">Match Center</h1>
          <p className="text-sm text-on-surface-variant">
            Live scores, recent results, upcoming fixtures, full scorecards, and quick prediction games.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-green live-pulse" />
          <span className="font-bold text-primary">Scores updating every 15 seconds</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#05070a]/70 p-2">
            {[
              ['live', 'Current'],
              ['recent', 'Recent'],
              ['upcoming', 'Upcoming'],
            ].map(([status, label]) => (
              <button
                key={status}
                onClick={() => selectStatus(status as MatchStatus)}
                className={`rounded-xl px-3 py-2 text-xs font-black ${
                  activeStatus === status
                    ? 'bg-neon-green text-black'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeStatus === 'recent' && (
            <div className="rounded-2xl border border-white/10 bg-[#05070a]/70 p-3">
              <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Filter by format</p>
              <div className="grid grid-cols-4 gap-2">
                {matchFormats.map((format) => (
                  <button
                    key={format}
                    onClick={() => selectFormat(format)}
                    className={`rounded-xl px-3 py-2 text-xs font-black ${
                      activeFormat === format
                        ? 'bg-electric-blue text-black'
                        : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                    }`}
                  >
                    {format === 'all' ? 'All' : format}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {groupedMatches.map((match) => (
              <article
                key={match.id}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  selectedMatch.id === match.id
                    ? 'border-neon-green bg-neon-green/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-primary/25'
                }`}
              >
                <button type="button" onClick={() => setSelectedMatchId(match.id)} className="w-full text-left">
                  <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                    {match.league} • {match.format}
                  </span>
                    <StatusPill status={match.status} />
                  </div>
                  <div className="space-y-3">
                    <TeamLine team={match.team1} />
                    <TeamLine team={match.team2} />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-primary">{match.result}</p>
                  <p className="mt-1 text-[11px] text-on-surface-variant">{match.startTime} • {match.venue}</p>
                </button>
                <Link
                  to="/matches/$matchId"
                  params={{ matchId: match.id }}
                  className="mt-3 inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-neon-green hover:border-neon-green/40 hover:bg-neon-green/10"
                  aria-label={`Open details for ${match.title}`}
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Detail
                </Link>
              </article>
            ))}
            {groupedMatches.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-on-surface-variant">
                No matches found for this format yet.
              </div>
            )}
          </div>
        </aside>

        <main className="space-y-6">
          <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
            <div className="border-b border-white/10 bg-[#05070a]/50 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <StatusPill status={selectedMatch.status} />
                    <span className="text-xs font-bold text-on-surface-variant">
                      {selectedMatch.league} • {selectedMatch.format}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-black text-primary">{selectedMatch.title}</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{selectedMatch.venue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Match time</p>
                  <p className="font-display text-sm font-black text-primary">{selectedMatch.startTime}</p>
                  <Link
                    to="/matches/$matchId"
                    params={{ matchId: selectedMatch.id }}
                    className="mt-3 inline-flex items-center gap-1 rounded-xl bg-neon-green px-3 py-2 text-[11px] font-black uppercase tracking-wider text-black"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Detail view
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <ScorePanel team={selectedMatch.team1} />
              <ScorePanel team={selectedMatch.team2} />
            </div>

            <div className="border-t border-white/10 p-5">
              <p className="text-sm font-bold text-primary">{selectedMatch.result}</p>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{selectedMatch.note}</p>
              {selectedMatch.recentBalls && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-on-surface-variant">Recent balls</span>
                  <div className="flex gap-2">
                    {selectedMatch.recentBalls.map((ball, index) => (
                      <Ball key={`${ball}-${index}`} ball={ball} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {(selectedMatch.status === 'live' || selectedMatch.status === 'upcoming') && (
            <PredictionGame
              match={selectedMatch}
              selected={predictions[selectedMatch.id]}
              onPick={(pick) => setPredictions((current) => ({ ...current, [selectedMatch.id]: pick }))}
            />
          )}

          {selectedMatch.scorecard ? (
            <Scorecard match={selectedMatch} />
          ) : (
            <section className="glass-panel rounded-3xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-black text-primary">Match Details</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {selectedMatch.keyDetails.map((detail) => (
                  <div key={detail} className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-4">
                    <p className="text-xs leading-relaxed text-on-surface-variant">{detail}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedMatch.status === 'live' && (
            <section className="glass-panel rounded-3xl border border-white/10 p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                  <span className="material-symbols-outlined text-neon-green">list_alt</span>
                  Ball-by-Ball
                </h3>
                <span className="text-xs text-on-surface-variant">Latest over</span>
              </div>
              {commentaryLoading ? (
                <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
              ) : (
                <div className="space-y-4">
                  {commentaries?.map((commentary) => (
                    <div key={commentary.id} className="grid grid-cols-[56px_42px_1fr] gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-on-surface-variant">{commentary.ball}</span>
                      <span className="rounded-full border border-neon-green/30 bg-neon-green/10 px-2 py-0.5 text-center text-[10px] font-black text-neon-green">
                        {commentary.tagValue}
                      </span>
                      <p className="text-sm leading-relaxed text-primary">{commentary.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: MatchStatus }) {
  const label = status === 'live' ? 'Live' : status === 'recent' ? 'Completed' : 'Upcoming'
  const className =
    status === 'live'
      ? 'border-red-400/35 bg-red-500/15 text-red-300'
      : status === 'recent'
        ? 'border-electric-blue/30 bg-electric-blue/10 text-electric-blue'
        : 'border-neon-green/30 bg-neon-green/10 text-neon-green'

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}>
      {label}
    </span>
  )
}

function TeamLine({ team }: { team: MatchTeam }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: team.logoColor }} />
        <span className="truncate text-sm font-black text-primary">{team.shortName}</span>
      </div>
      <span className="shrink-0 text-sm font-bold text-on-surface">{team.score ?? '-'}</span>
    </div>
  )
}

function ScorePanel({ team }: { team: MatchTeam }) {
  return (
    <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl font-display text-sm font-black text-black" style={{ backgroundColor: team.logoColor }}>
          {team.shortName}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-black text-primary">{team.fullName}</p>
          <p className="text-xs text-on-surface-variant">{team.overs ? `${team.overs} overs` : 'Fixture team'}</p>
        </div>
      </div>
      <p className="font-display text-3xl font-black text-primary">{team.score ?? 'Yet to bat'}</p>
    </div>
  )
}

function Ball({ ball }: { ball: string }) {
  let className = 'border-white/10 bg-white/5 text-on-surface-variant'
  if (ball === '6' || ball === '4') className = 'border-neon-green bg-neon-green text-black'
  if (ball === 'W') className = 'border-red-500 bg-red-500 text-white'
  if (ball.includes('wd') || ball.includes('nb')) className = 'border-electric-blue/30 bg-electric-blue/10 text-electric-blue'

  return (
    <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black ${className}`}>
      {ball}
    </span>
  )
}

function PredictionGame({
  match,
  selected,
  onPick,
}: {
  match: MatchSummary
  selected?: string
  onPick: (pick: string) => void
}) {
  return (
    <section className="glass-panel rounded-3xl border border-neon-green/20 p-6">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-neon-green">Prediction game</p>
          <h3 className="mt-1 font-display text-xl font-black text-primary">
            {match.status === 'live' ? 'Play the live call' : 'Lock your pre-match pick'}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
            AI edge: {match.winProbability ?? 50}% toward {match.team1.shortName}. Your pick is saved locally for this session.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {match.predictionOptions.map((option) => (
            <button
              key={option}
              onClick={() => onPick(option)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-black transition-all ${
                selected === option
                  ? 'border-neon-green bg-neon-green text-black'
                  : 'border-white/10 bg-[#05070a]/60 text-primary hover:border-neon-green/40'
              }`}
            >
              {option}
              {selected === option && <span className="mt-1 block text-[10px] uppercase tracking-wider">Picked</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Scorecard({ match }: { match: MatchSummary }) {
  if (!match.scorecard) return null

  return (
    <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
      <div className="border-b border-white/10 bg-[#05070a]/50 p-5">
        <h3 className="font-display text-xl font-black text-primary">Scorecard & Details</h3>
        <p className="mt-1 text-sm text-on-surface-variant">{match.keyDetails.join(' • ')}</p>
      </div>

      <div className="p-5">
        <TableTitle title={match.scorecard.battingTeam} meta={match.scorecard.total} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 font-black">Batter</th>
                <th className="py-3 text-right font-black">R</th>
                <th className="py-3 text-right font-black">B</th>
                <th className="py-3 text-right font-black">4s</th>
                <th className="py-3 text-right font-black">6s</th>
                <th className="py-3 text-right font-black">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {match.scorecard.batting.map((row) => (
                <tr key={row.player}>
                  <td className="py-3 font-bold text-primary">{row.player}</td>
                  <td className="py-3 text-right text-primary">{row.runs}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.balls}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.fours}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.sixes}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.strikeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-4 grid gap-3 sm:grid-cols-3">
          <InfoTile label="Extras" value={match.scorecard.extras} />
          <InfoTile label="Total" value={match.scorecard.total} />
          <InfoTile label="Fall of wickets" value={match.scorecard.fallOfWickets} />
        </div>

        <TableTitle title={match.scorecard.bowlingTeam} meta="Bowling card" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 font-black">Bowler</th>
                <th className="py-3 text-right font-black">O</th>
                <th className="py-3 text-right font-black">M</th>
                <th className="py-3 text-right font-black">R</th>
                <th className="py-3 text-right font-black">W</th>
                <th className="py-3 text-right font-black">ECO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {match.scorecard.bowling.map((row) => (
                <tr key={row.player}>
                  <td className="py-3 font-bold text-primary">{row.player}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.overs}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.maidens}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.runs}</td>
                  <td className="py-3 text-right font-black text-neon-green">{row.wickets}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function TableTitle({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
      <h4 className="font-display text-sm font-black text-primary">{title}</h4>
      <span className="text-xs font-bold text-on-surface-variant">{meta}</span>
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="mt-1 text-xs font-bold leading-relaxed text-primary">{value}</p>
    </div>
  )
}

