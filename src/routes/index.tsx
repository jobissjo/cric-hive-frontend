import { createFileRoute, Link } from '@tanstack/react-router'
import { useLiveMatch } from '../hooks/useCricketData'

export const Route = createFileRoute('/')({ component: Dashboard })

function Dashboard() {
  const { data: liveMatch, isLoading } = useLiveMatch()

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6 max-w-6xl mx-auto rise-in">
      
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-container-low to-surface-container-lowest border border-white/5 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,218,243,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(204,255,0,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green live-pulse" />
            <span className="font-display font-bold text-[10px] text-neon-green tracking-widest uppercase">Arena Live</span>
          </div>
          <h1 className="font-display font-black text-3xl md:text-4xl text-primary tracking-tight">
            Welcome back to the Hive, <span className="text-neon-green">KingKohli</span>
          </h1>
          <p className="text-on-surface-variant/80 text-sm max-w-xl">
            Wankhede is roaring! Track live player match-ups, access expert neural predictions, and engage with the community in real time.
          </p>
        </div>
        
        <div className="relative z-10 flex gap-3">
          <Link
            to="/matches"
            className="flex items-center gap-2 bg-neon-green text-black font-bold px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-sm font-black">sports_cricket</span>
            <span>Match Center</span>
          </Link>
          <Link
            to="/predictions"
            className="flex items-center gap-2 bg-surface border border-white/10 hover:border-primary/50 text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">query_stats</span>
            <span>AI Predictor</span>
          </Link>
        </div>
      </section>

      {/* Main Grid: Scorecard + Sidebar Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Scorecard & Momentum */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live Scorecard Panel */}
          {isLoading || !liveMatch ? (
            <div className="glass-panel rounded-3xl p-8 border border-white/10 animate-pulse flex flex-col justify-center items-center h-64 gap-3">
              <span className="material-symbols-outlined text-4xl text-neon-green animate-spin">sync</span>
              <p className="text-on-surface-variant font-semibold text-sm">Syncing Match Engine Feed...</p>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden transition-all duration-300 hover:border-primary/20">
              
              {/* Scorecard Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-green live-pulse" />
                  <span className="font-display font-black text-sm uppercase text-primary tracking-wider">{liveMatch.title}</span>
                </div>
                <div className="text-xs text-on-surface-variant/80 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {liveMatch.venue}
                </div>
              </div>

              {/* Scorecard Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Team 1 Score */}
                <div className="flex items-center justify-between md:justify-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg text-black" style={{ backgroundColor: liveMatch.team1.logoColor }}>
                      {liveMatch.team1.shortName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">{liveMatch.team1.shortName}</h3>
                      <p className="text-xs text-on-surface-variant">{liveMatch.team1.fullName}</p>
                    </div>
                  </div>
                  <div className="text-right md:ml-auto">
                    <div className="font-display font-black text-2xl text-neon-green">
                      {liveMatch.team1.score}/{liveMatch.team1.wickets}
                    </div>
                    <p className="text-xs text-on-surface-variant">{liveMatch.team1.overs} Overs</p>
                  </div>
                </div>

                {/* Team 2 Score (Chasing) */}
                <div className="flex items-center justify-between md:justify-start gap-4 border-t border-white/5 md:border-t-0 md:border-l md:border-white/5 pt-4 md:pt-0 md:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg text-white" style={{ backgroundColor: liveMatch.team2.logoColor }}>
                      {liveMatch.team2.shortName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-primary">{liveMatch.team2.shortName}</h3>
                      <p className="text-xs text-on-surface-variant">{liveMatch.team2.fullName}</p>
                    </div>
                  </div>
                  <div className="text-right md:ml-auto">
                    {liveMatch.team2.score > 0 ? (
                      <>
                        <div className="font-display font-black text-2xl text-primary">
                          {liveMatch.team2.score}/{liveMatch.team2.wickets}
                        </div>
                        <p className="text-xs text-on-surface-variant">{liveMatch.team2.overs} Overs</p>
                      </>
                    ) : (
                      <>
                        <div className="font-display font-black text-lg text-on-surface-variant/40">
                          Yet to bat
                        </div>
                        <p className="text-xs text-on-surface-variant/60">Target: {liveMatch.target || 185}</p>
                      </>
                    )}
                  </div>
                </div>

              </div>

              {/* Dynamic Batter & Bowler Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="bg-[#05070a]/60 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-green text-sm">sports_cricket</span>
                    <span className="font-semibold text-sm text-primary">{liveMatch.currentBatsman.name}</span>
                  </div>
                  <span className="font-display font-bold text-sm text-neon-green">{liveMatch.currentBatsman.stats}</span>
                </div>
                
                <div className="bg-[#05070a]/60 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-electric-blue text-sm">sports_baseball</span>
                    <span className="font-semibold text-sm text-primary">{liveMatch.currentBowler.name}</span>
                  </div>
                  <span className="font-display font-bold text-sm text-electric-blue">{liveMatch.currentBowler.stats}</span>
                </div>
              </div>

              {/* Recent Balls Tracker */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Recent Balls</span>
                <div className="flex gap-2">
                  {liveMatch.recentBalls.map((ball, i) => {
                    let colorClass = 'bg-white/5 text-on-surface-variant'
                    if (ball === '6' || ball === '4') colorClass = 'bg-neon-green text-black font-extrabold'
                    else if (ball === 'W') colorClass = 'bg-red-500 text-white font-bold'
                    else if (ball.includes('wd') || ball.includes('nb')) colorClass = 'bg-electric-blue/20 text-electric-blue font-semibold'
                    
                    return (
                      <span 
                        key={i} 
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border border-white/5 ${colorClass}`}
                      >
                        {ball}
                      </span>
                    )
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Dynamic Momentum Panel */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative">
            <h3 className="font-display font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-electric-blue">query_stats</span>
              Live Momentum Tracker
            </h3>
            <p className="text-xs text-on-surface-variant/85 mb-6">
              AI-driven game sentiment analysis based on recent over velocity, batting runs/ball acceleration, and boundary pressure metrics.
            </p>
            
            <div className="h-28 flex items-end gap-3 justify-between px-2">
              {liveMatch?.momentumData?.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative bg-white/5 rounded-t-lg h-24 flex items-end overflow-hidden">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 ${idx % 2 === 0 ? 'bg-gradient-to-t from-neon-green/30 to-neon-green' : 'bg-gradient-to-t from-electric-blue/30 to-electric-blue'}`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-bold">O{13 + idx}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Bento Grid Cards & Insights */}
        <div className="space-y-6">
          
          {/* AI Win Probability Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between h-64 bg-gradient-to-br from-surface-container-low to-surface/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-neon-green uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Predictive Engine
                </span>
                <span className="bg-neon-green/10 border border-neon-green/20 text-neon-green text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
              </div>
              <h4 className="font-display font-black text-xl text-primary">Neural Win Chance</h4>
              <p className="text-xs text-on-surface-variant/80 mt-1">CSK holds statistical leverage on the current pitch map.</p>
            </div>
            
            <div className="my-2 flex items-center gap-4">
              <div className="text-4xl font-display font-black text-neon-green">75%</div>
              <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <div className="bg-neon-green h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <Link 
              to="/predictions" 
              className="w-full text-center text-xs font-bold bg-[#05070a]/80 hover:bg-[#05070a] border border-white/10 hover:border-neon-green text-primary py-2.5 rounded-xl transition-all"
            >
              Analyze Duel Metrics
            </Link>
          </div>

          {/* Trending Fantasy Pick */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between h-64 bg-gradient-to-br from-surface-container-low to-surface/40 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-electric-blue uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  Fantasy Hot Pick
                </span>
                <span className="text-xs font-bold text-primary">CRR 9.8</span>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  alt="R. Jadeja" 
                  className="w-12 h-12 rounded-xl border border-neon-green object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUnaPe8YtrE-dE6vyf5v4C7Q-sXfH3DAaQK9QD-f6L9pO_XKYWQIh-WUQ0g_rdsxiIp28SOYJbj6Fh3KMIcVcllx6G7QBQZ1XZddjYKsT_HvCgJAurshxwvZjApLjlqMgmfOC3dxGGTaeh87Yi7PPcwoHpgD7qsXkaaaDHwb8EDiOkqe5tCgXnI1UmauXdBqtzyo1zJI3Py8IcK8OxUjGl8GWSZnFnzNtZ5vL6RHf9-XpPrMZQG_-FMVboFGkDYICiaHY7SAg8r7U"
                />
                <div>
                  <h4 className="font-display font-bold text-md text-primary">Ravindra Jadeja</h4>
                  <p className="text-xs text-on-surface-variant">42* runs off 24 balls today</p>
                </div>
              </div>
            </div>

            <div className="my-2 bg-[#05070a]/40 border border-white/5 rounded-xl p-3 text-[11px] text-on-surface-variant">
              🏏 Jadeja striking at <strong className="text-neon-green">175.0%</strong> against death bowlers this season. Optimal captain choice.
            </div>

            <Link 
              to="/feed" 
              className="w-full text-center text-xs font-bold bg-[#05070a]/80 hover:bg-[#05070a] border border-white/10 hover:border-electric-blue text-primary py-2.5 rounded-xl transition-all"
            >
              Discuss with Community
            </Link>
          </div>

        </div>

      </div>

      {/* Social Spotlight & Latest News Bento Grid Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* News & Stories Section */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10">
          <h3 className="font-display font-bold text-lg text-primary mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-neon-green">breaking_news</span>
            Bento Grid: Hive Headlines
          </h3>
          <div className="space-y-4">
            
            <article className="group cursor-pointer flex gap-4 items-center p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                <img 
                  alt="Toss report" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ONXG76Te5gsZs0iFjJxnY2sd0qBv2J_09fsiv5fCVDlz6KsGkdpY54SdaiRuEI8elXBXvHjbXq2GCV8QFSusx_lIj0pyvCpQv7sA_61_llen_XPm6mGA0s4fNwxUA-J474Y20fPE6Tmgby9BGv3mKfm5wsF8Kh3-X-GawgjcDdEFZtMWwSOMXsWv_J-jglq9_YwHreOFiDd0vL4qLDhQjZ3y2464Dz0F7qfQ5vDCujiPMs4fCofD0uZzFLbaZFuT1j5alW-LLpA"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm text-primary group-hover:text-neon-green transition-colors line-clamp-1">Wankhede Pitch Report: Slow cracks appearing</h4>
                <p className="text-xs text-on-surface-variant line-clamp-2">Pitch curators suggest ball will grip more in the second half. Spinners will dominate match progression.</p>
              </div>
            </article>

            <article className="group cursor-pointer flex gap-4 items-center p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                <img 
                  alt="Stat updates" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPoRdZVU6aX6pJohCOLQ2aIBqUuc0VsycvZMRrLljYWdWvAcDS1f21NOt_CydLXzm16TmWHuBmacp-XkOMZAAsDUU0CGXQ0w4LU8Ye8ekj-X7nzNh8ED1lcl1Q73eYg5zKN0UeM5CJP9WgbGhdeS1BbZ2rGwy3n3UJE7_iqrfjD9z0V61StqKPSNJ7k8JAOGmTXiSGYTTtMP3AGVGMHF7WIkynrnjxia4aKv7tRmCCMLVJzZOOabqOYlRC2SXpKiJoJ7OftcL-H9Y"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm text-primary group-hover:text-neon-green transition-colors line-clamp-1">Kohli vs Starc: Battle of the Titans</h4>
                <p className="text-xs text-on-surface-variant line-clamp-2">Historical matchup details indicate a strong early swing favor for Starc. Will Kohli break the code tonight?</p>
              </div>
            </article>

          </div>
        </div>

        {/* Live Social Spotlight */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-electric-blue">forum</span>
                Social Spotlight
              </h3>
              <Link to="/feed" className="text-xs font-bold text-electric-blue hover:underline">View All Posts</Link>
            </div>
            
            <div className="bg-[#05070a]/40 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  alt="Harsha Bhogle" 
                  className="w-8 h-8 rounded-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkBOj0Dn5vo4Ger2opQjbnH6aOip7pfz6lrNiWqJSQkApsXNYoRG59VRHyqdjkH2xzLqC0Zyq5Cm2grh4RB9SQ4KYfh66TAPhKXt9v2HFt_gnKqHEFpKivjjtp1og9H5fc5K_rqlxByAkKmDyGKWx5AkDofomPl_VhIBV-F1SBP_HA51HVVbqmtNzM1bCn6QHZOsZghlz0lV_MPTrSOFlC-2sg-ESUwDdifsopWrkFKfvgghln7ImBpjjRtKgeoLeaql86JZxGcqQ"
                />
                <div>
                  <h4 className="font-semibold text-xs text-primary flex items-center gap-1">
                    Harsha Bhogle
                    <span className="material-symbols-outlined text-electric-blue text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </h4>
                  <p className="text-[10px] text-on-surface-variant/80">@bhogle_official • 2h ago</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                "Jadeja's acceleration in the last two overs has been nothing short of phenomenal. MI's death bowling is under serious pressure here. Is 210 on the cards?"
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[11px] text-on-surface-variant">💬 Join 14.2k active online experts</span>
            <Link 
              to="/feed" 
              className="bg-electric-blue text-black font-bold px-4 py-2 rounded-xl text-xs hover:shadow-[0_0_10px_rgba(0,218,243,0.3)]"
            >
              Enter Discussion
            </Link>
          </div>
        </div>

      </section>

    </div>
  )
}
