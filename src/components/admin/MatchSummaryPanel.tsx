import { useState } from 'react'
import { matchSummaries } from './adminData'

export function MatchSummaryPanel() {
  const [selectedMatchId, setSelectedMatchId] = useState(matchSummaries[0].id)
  const selectedMatch = matchSummaries.find((match) => match.id === selectedMatchId) ?? matchSummaries[0]

  return (
    <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div>
        <h2 className="font-display text-2xl font-black">Match Summary</h2>
        <p className="text-sm text-on-surface-variant">List match details and inspect a clean ball-by-ball summary.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                {['Match', 'Venue', 'Date', 'Score', 'Result', 'View'].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-black">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {matchSummaries.map((match) => (
                <tr key={match.id} className={selectedMatchId === match.id ? 'bg-neon-green/10' : 'hover:bg-white/[0.03]'}>
                  <td className="px-4 py-3 font-bold text-primary">{match.match}</td>
                  <td className="px-4 py-3 text-on-surface">{match.venue}</td>
                  <td className="px-4 py-3 text-on-surface">{match.date}</td>
                  <td className="px-4 py-3 text-on-surface">{match.score}</td>
                  <td className="px-4 py-3 text-on-surface">{match.result}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedMatchId(match.id)} className="rounded-lg border border-white/10 px-3 py-1 text-xs font-bold text-secondary">
                      Ball by ball
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-[#05070a]/60 p-4">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wider text-neon-green">{selectedMatch.match}</p>
            <h3 className="font-display text-xl font-black">Ball-by-ball</h3>
            <p className="text-xs text-on-surface-variant">{selectedMatch.result}</p>
          </div>
          <div className="space-y-3">
            {selectedMatch.balls.map(([ball, event, summary]) => (
              <div key={`${selectedMatch.id}-${ball}`} className="grid grid-cols-[52px_38px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                <span className="font-black text-on-surface-variant">{ball}</span>
                <span className={`text-center font-black ${event === 'W' ? 'text-red-300' : event === '4' || event === '6' ? 'text-neon-green' : 'text-secondary'}`}>{event}</span>
                <span className="text-on-surface">{summary}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
