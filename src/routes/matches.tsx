import { createFileRoute } from '@tanstack/react-router'
import { useLiveMatch, useCommentaries } from '../hooks/useCricketData'

export const Route = createFileRoute('/matches')({ component: MatchesCenter })

function MatchesCenter() {
  const { data: liveMatch, isLoading: matchLoading } = useLiveMatch()
  const { data: commentaries, isLoading: commentaryLoading } = useCommentaries()

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6 max-w-6xl mx-auto rise-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-primary tracking-tight">Hive Match Center</h1>
          <p className="text-on-surface-variant text-sm">Real-time pitch tracking, ball-by-ball micro-commentaries, and stadium acoustics analytics.</p>
        </div>
        
        <div className="flex gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl items-center text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green live-pulse" />
          <span className="font-bold text-primary">Live Commentary Feed Active</span>
        </div>
      </div>

      {/* Grid: Arena Metrics & Commentary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Commentary & Live Scorecard */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Stadium Scorecard Display */}
          {matchLoading || !liveMatch ? (
            <div className="glass-panel rounded-3xl p-8 animate-pulse h-52 flex flex-col justify-center items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-neon-green animate-spin">sync</span>
              <p className="text-on-surface-variant text-sm">Syncing Match Telemetry...</p>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 bg-gradient-to-br from-surface-container-low to-surface/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(204,255,0,0.04),transparent_70%)] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 border border-red-500/35 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Innings 1</span>
                    <span className="text-xs text-on-surface-variant font-semibold">{liveMatch.title} • CRR {((liveMatch.team1.score / (parseFloat(liveMatch.team1.overs) || 1)) || 0).toFixed(2)}</span>
                  </div>
                  <h2 className="font-display font-black text-2xl text-primary mt-2">{liveMatch.team1.fullName} vs {liveMatch.team2.fullName}</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">{liveMatch.venue}</p>
                </div>

                <div className="flex items-center gap-6 bg-[#05070a]/60 px-5 py-3 border border-white/5 rounded-2xl">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">Current Overs</p>
                    <p className="font-display font-black text-xl text-primary">{liveMatch.team1.overs}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">Required RR</p>
                    <p className="font-display font-black text-xl text-neon-green">9.25</p>
                  </div>
                </div>
              </div>

              {/* Batting/Bowling details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#05070a]/40 border border-white/5 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Active Batsmen</span>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-primary">{liveMatch.currentBatsman.name}</span>
                    <span className="text-neon-green font-display font-bold">{liveMatch.currentBatsman.stats}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant/80">
                    <span>V. Kohli</span>
                    <span>94*(56)</span>
                  </div>
                </div>

                <div className="bg-[#05070a]/40 border border-white/5 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Active Bowler</span>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-primary">{liveMatch.currentBowler.name}</span>
                    <span className="text-electric-blue font-display font-bold">{liveMatch.currentBowler.stats}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant/80">
                    <span>This spell</span>
                    <span>1.2-0-12-0</span>
                  </div>
                </div>
              </div>

              {/* Micro-interactive recent ball details */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/5">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Current Over Progression</span>
                <div className="flex gap-2">
                  {liveMatch.recentBalls.map((ball, i) => {
                    let styleClass = 'bg-white/5 text-on-surface-variant border-white/10'
                    if (ball === '6' || ball === '4') styleClass = 'bg-neon-green text-black font-extrabold border-neon-green'
                    else if (ball === 'W') styleClass = 'bg-red-500 text-white font-bold border-red-500'
                    else if (ball.includes('wd') || ball.includes('nb')) styleClass = 'bg-electric-blue/20 text-electric-blue font-bold border-electric-blue/30'

                    return (
                      <span key={i} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${styleClass} cursor-help`} title={`Event: ${ball}`}>
                        {ball}
                      </span>
                    )
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Live Commentary Feed */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-green">list_alt</span>
                Ball-By-Ball Broadcast
              </h3>
              <span className="text-xs text-on-surface-variant">Over 19 Commentary</span>
            </div>

            {commentaryLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4 animate-pulse">
                    <div className="w-12 h-6 bg-white/5 rounded" />
                    <div className="flex-1 h-12 bg-white/5 rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 divide-y divide-white/5">
                {commentaries?.map((c, i) => {
                  let tagColor = 'bg-white/5 text-on-surface-variant border-white/10'
                  if (c.tag === 'SIX' || c.tag === 'FOUR') tagColor = 'bg-neon-green text-black font-black border-neon-green'
                  else if (c.tag === 'WICKET') tagColor = 'bg-red-500 text-white font-bold border-red-500'
                  else if (c.tag === 'RUN') tagColor = 'bg-electric-blue/20 text-electric-blue border-electric-blue/30'

                  return (
                    <div key={c.id} className={`flex items-start gap-4 pt-5 ${i === 0 ? 'first:pt-0' : ''} rise-in`}>
                      <div className="text-right flex-shrink-0 w-16">
                        <span className="text-xs font-semibold text-on-surface-variant">Ball {c.ball}</span>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${tagColor} uppercase tracking-wider`}>
                          {c.tagValue}
                        </span>
                      </div>

                      <div className="flex-1 space-y-1">
                        <p className="text-sm text-primary leading-relaxed">{c.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right 1 Column: Stadium Telemetry */}
        <div className="space-y-6">
          
          {/* Stadium Metrics Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-5 bg-gradient-to-br from-surface-container-low to-surface/40">
            <h3 className="font-display font-bold text-md text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-electric-blue text-lg">stadium</span>
              Arena Telemetry
            </h3>
            
            <div className="border border-white/5 bg-[#05070a]/40 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs text-on-surface-variant border-b border-white/5 pb-2">
                <span>Location</span>
                <strong className="text-primary">Mumbai, India</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant border-b border-white/5 pb-2">
                <span>Elevation</span>
                <strong className="text-primary">14m above sea level</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant border-b border-white/5 pb-2">
                <span>Wind Velocity</span>
                <strong className="text-primary">12 km/h SSE</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant">
                <span>Humidity Factor</span>
                <strong className="text-electric-blue">+12% Swing Opt.</strong>
              </div>
            </div>

            {/* Pitch Cracking Map */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Pitch Cracking Index</span>
                <span className="text-neon-green font-bold">4.2 / 5.0 (Dry)</span>
              </div>
              <div className="relative h-20 rounded-2xl bg-[#1b2025] overflow-hidden border border-white/5 flex items-center justify-center">
                
                {/* Simulated Pitch Visuals */}
                <div className="absolute inset-x-8 h-1 bg-amber-800/30 blur-[1px]" />
                <div className="absolute inset-y-2 w-0.5 bg-amber-900/40 blur-[1px]" />
                
                {/* Dynamic Cracking Overlays */}
                <div className="absolute top-4 left-10 w-8 h-[2px] bg-red-400/20 rotate-45" />
                <div className="absolute bottom-6 right-12 w-12 h-[2px] bg-red-400/25 -rotate-12" />
                <div className="absolute top-8 right-8 w-6 h-[1.5px] bg-red-400/20 rotate-12" />
                
                <span className="text-[10px] font-bold text-white/50 relative z-10 bg-black/60 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                  Spin Zone Cracks
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">
                Dry patch indicators verified by AI pitch scanner. Second-innings spin turn is estimated to amplify by 18.5%.
              </p>
            </div>

            {/* Boundary dimensions */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs text-on-surface-variant font-semibold">Boundary Dimensions</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#05070a]/60 border border-white/5 p-2 rounded-xl">
                  <p className="text-[9px] text-on-surface-variant/60 uppercase">Off-side</p>
                  <p className="text-xs font-bold text-primary">68m</p>
                </div>
                <div className="bg-[#05070a]/60 border border-white/5 p-2 rounded-xl">
                  <p className="text-[9px] text-on-surface-variant/60 uppercase">Straight</p>
                  <p className="text-xs font-bold text-primary">74m</p>
                </div>
                <div className="bg-[#05070a]/60 border border-white/5 p-2 rounded-xl">
                  <p className="text-[9px] text-on-surface-variant/60 uppercase">Leg-side</p>
                  <p className="text-xs font-bold text-primary">65m</p>
                </div>
              </div>
            </div>

          </div>

          {/* Crowd Acoustics Analytics */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-md text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-neon-green text-lg">volume_up</span>
              Stadium Acoustics
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Decibel Level</span>
                <span className="text-red-400 font-bold">114 dB (Deafening)</span>
              </div>
              <div className="flex gap-1 h-8 items-end justify-between px-1">
                {[40, 70, 95, 60, 85, 110, 115, 90, 65, 80, 105, 50, 45].map((v, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm transition-all duration-300 ${v > 100 ? 'bg-red-400' : v > 80 ? 'bg-neon-green' : 'bg-electric-blue'}`} 
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">
                Crowd noise peaking at Virat Kohli's boundary sweeps. Noise impact factor triggers pressure modifiers on rookie bowler models.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
