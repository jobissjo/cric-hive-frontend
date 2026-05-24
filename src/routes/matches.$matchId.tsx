import { Link, createFileRoute } from '@tanstack/react-router'
import { getMatchById, type MatchSummary, type MatchTeam } from '../data/matches'

export const Route = createFileRoute('/matches/$matchId')({ component: MatchDetailPage })

function MatchDetailPage() {
  const { matchId } = Route.useParams()
  const match = getMatchById(matchId)

  if (!match) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <Link to="/matches" className="text-sm font-bold text-neon-green">
          ← Back to matches
        </Link>
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="font-display text-3xl font-black text-primary">Match not found</h1>
          <p className="mt-2 text-sm text-on-surface-variant">This match summary is not available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-8 md:py-8 rise-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/matches" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-neon-green">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to matches
          </Link>
          <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
            {match.league} • {match.format} • {match.startTime}
          </p>
          <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-primary">{match.title}</h1>
          <p className="mt-1 text-sm text-on-surface-variant">{match.venue}</p>
        </div>
        <div className="rounded-2xl border border-neon-green/20 bg-neon-green/10 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-neon-green">Result</p>
          <p className="mt-1 text-sm font-black text-primary">{match.result}</p>
        </div>
      </div>

      <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
        <div className="grid md:grid-cols-2">
          <TeamScore team={match.team1} />
          <TeamScore team={match.team2} />
        </div>
        <div className="border-t border-white/10 p-5">
          <h2 className="font-display text-xl font-black text-primary">Match Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{match.note}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {match.summary.map((point) => (
              <div key={point} className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-4">
                <p className="text-sm leading-relaxed text-primary">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl border border-white/10 p-6">
        <h2 className="font-display text-xl font-black text-primary">Key Details</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {match.keyDetails.map((detail) => (
            <div key={detail} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs leading-relaxed text-on-surface-variant">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {match.scorecard && <DetailedScorecard match={match} />}
    </div>
  )
}

function TeamScore({ team }: { team: MatchTeam }) {
  return (
    <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-sm font-black text-black"
          style={{ backgroundColor: team.logoColor }}
        >
          {team.shortName}
        </span>
        <div>
          <p className="font-display text-lg font-black text-primary">{team.fullName}</p>
          <p className="text-xs text-on-surface-variant">{team.overs ? `${team.overs} overs` : 'Innings complete'}</p>
        </div>
      </div>
      <p className="mt-4 font-display text-4xl font-black text-primary">{team.score ?? 'Yet to bat'}</p>
    </div>
  )
}

function DetailedScorecard({ match }: { match: MatchSummary }) {
  if (!match.scorecard) return null

  return (
    <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
      <div className="border-b border-white/10 bg-[#05070a]/50 p-5">
        <h2 className="font-display text-xl font-black text-primary">Full Score Summary</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          {match.scorecard.extras} • {match.scorecard.fallOfWickets}
        </p>
      </div>
      <div className="grid gap-6 p-5 xl:grid-cols-2">
        <div>
          <TableHeader title={match.scorecard.battingTeam} meta={match.scorecard.total} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
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
        </div>

        <div>
          <TableHeader title={match.scorecard.bowlingTeam} meta="Bowling card" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
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
      </div>
    </section>
  )
}

function TableHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
      <h3 className="font-display text-sm font-black text-primary">{title}</h3>
      <span className="text-xs font-bold text-on-surface-variant">{meta}</span>
    </div>
  )
}
