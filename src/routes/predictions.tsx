import { createFileRoute } from '@tanstack/react-router'
import { usePredictions } from '../hooks/useCricketData'

export const Route = createFileRoute('/predictions')({ component: Predictions })

function Predictions() {
  const { data: predictions, isLoading } = usePredictions()

  // Radial dial variables
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const winProbability = predictions?.winProbability || 75
  const strokeDashoffset = circumference - (winProbability / 100) * circumference

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6 max-w-6xl mx-auto rise-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-primary tracking-tight">AI Neural Predictor</h1>
          <p className="text-on-surface-variant text-sm font-sans">Simulating pitch cracking indexes, historical head-to-head match-ups, and live bowling rotations.</p>
        </div>
        
        <div className="flex gap-2 items-center text-xs bg-[#1b2025]/80 px-4 py-2 border border-white/5 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-neon-green live-pulse" />
          <span className="text-on-surface-variant font-bold">Accuracy Streak: </span>
          <span className="text-neon-green font-black">{predictions?.streak || '9/10 Correct'}</span>
        </div>
      </div>

      {/* Grid: Probability dial + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Win Probability Dial & Metrics */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between items-center text-center bg-gradient-to-br from-surface-container-low to-surface/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-neon-green/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-full text-left">
            <span className="text-xs font-bold text-neon-green uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">psychology</span>
              Live Game Simulator
            </span>
            <h3 className="font-display font-black text-xl text-primary mt-2">Overall Win Probability</h3>
            <p className="text-xs text-on-surface-variant/80 mt-1">Estimations adjusting in real time with ball speed velocities.</p>
          </div>

          {isLoading ? (
            <div className="w-40 h-40 rounded-full bg-white/5 animate-pulse my-8 flex items-center justify-center">
              <span className="text-xs text-on-surface-variant">Scanning pitch...</span>
            </div>
          ) : (
            <div className="relative w-48 h-48 my-6 flex items-center justify-center">
              {/* SVG Animated Circular Dial */}
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="96" 
                  cy="96" 
                  r={radius} 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="12"
                />
                <circle 
                  cx="96" 
                  cy="96" 
                  r={radius} 
                  className="stroke-neon-green fill-none transition-all duration-1000 ease-out" 
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-black text-4xl text-primary">{winProbability}%</span>
                <span className="text-[10px] text-neon-green font-bold uppercase tracking-widest mt-1">CSK Advantage</span>
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-2">
            <div className="bg-[#05070a]/60 border border-white/5 p-3 rounded-2xl text-center">
              <p className="text-[10px] text-on-surface-variant/60 uppercase">Model Confidence</p>
              <strong className="text-primary text-sm font-display">{predictions?.confidence || 75}%</strong>
            </div>
            
            <div className="bg-[#05070a]/60 border border-white/5 p-3 rounded-2xl text-center">
              <p className="text-[10px] text-on-surface-variant/60 uppercase">Pitch Adaptability</p>
              <strong className="text-neon-green text-sm font-display">Optimal</strong>
            </div>
          </div>

        </div>

        {/* Right 2 Columns: Player Duels & Stat Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pitch Scan Summary */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 bg-gradient-to-br from-surface-container-low to-surface/40">
            <h3 className="font-display font-black text-md text-primary mb-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-electric-blue">radar</span>
              Pitch Scanner & Moisture Matrix
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#05070a]/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] text-on-surface-variant/60 uppercase">Pitch Rating</span>
                <p className="font-display font-bold text-sm text-primary mt-1">{predictions?.pitchRating || '4.2 / 5.0 (Batting)'}</p>
              </div>

              <div className="bg-[#05070a]/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] text-on-surface-variant/60 uppercase">Moisture swing</span>
                <p className="font-display font-bold text-sm text-electric-blue mt-1">{predictions?.humidityFactor || '+12% Swing Opt.'}</p>
              </div>

              <div className="bg-[#05070a]/60 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] text-on-surface-variant/60 uppercase">Neural Match Model</span>
                <p className="font-display font-bold text-sm text-neon-green mt-1">Multi-Agent RL</p>
              </div>
            </div>
          </div>

          {/* Expert Predictions Head-to-Head Duels */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-green">swords</span>
                Featured Player duels (AI Calculated)
              </h3>
              <span className="text-xs text-on-surface-variant">Tactical Matchups</span>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((n) => (
                  <div key={n} className="w-full h-24 bg-white/5 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {predictions?.duels.map((duel) => (
                  <div 
                    key={duel.id} 
                    className="border border-white/5 bg-[#05070a]/40 rounded-2xl p-5 hover:border-primary/10 transition-all duration-300 relative overflow-hidden"
                  >
                    
                    {/* Duel Header */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                      <span className="text-xs text-on-surface-variant font-semibold">{duel.metricLabel}</span>
                      <span 
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${duel.ratingColor}40`, color: duel.ratingColor, backgroundColor: `${duel.ratingColor}10` }}
                      >
                        {duel.rating}
                      </span>
                    </div>

                    {/* H2H Avatars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      
                      <div className="flex items-center gap-3">
                        <img 
                          alt={duel.player1.name} 
                          className="w-10 h-10 rounded-xl object-cover" 
                          src={duel.player1.avatar}
                          style={{ border: `2px solid ${duel.player1.border}` }}
                        />
                        <div>
                          <p className="font-semibold text-xs text-primary">{duel.player1.name}</p>
                          <p className="text-[10px] text-on-surface-variant">Batter</p>
                        </div>
                        
                        <span className="text-xs font-bold text-on-surface-variant mx-2">vs</span>
                        
                        <img 
                          alt={duel.player2.name} 
                          className="w-10 h-10 rounded-xl object-cover" 
                          src={duel.player2.avatar}
                          style={{ border: `2px solid ${duel.player2.border}` }}
                        />
                        <div>
                          <p className="font-semibold text-xs text-primary">{duel.player2.name}</p>
                          <p className="text-[10px] text-on-surface-variant">Bowler</p>
                        </div>
                      </div>

                      {/* Edge Indicator */}
                      <div className="md:text-right flex items-center md:justify-end gap-3">
                        <div>
                          <p className="text-[10px] text-on-surface-variant/80 uppercase">AI Edge Factor</p>
                          <strong className="text-neon-green text-sm font-display">{duel.metric}</strong>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-neon-green text-sm font-black">trending_up</span>
                        </div>
                      </div>

                    </div>

                    <p className="text-xs text-on-surface-variant/90 leading-relaxed mt-4 pt-3 border-t border-white/5">
                      💡 {duel.description}
                    </p>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Expert insights panel */}
      <section className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10">
        <h3 className="font-display font-bold text-lg text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-electric-blue">forum</span>
          Expert Neural Insight Logs
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            <div className="w-full h-16 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions?.expertInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="bg-[#05070a]/40 border border-white/5 p-5 rounded-2xl flex gap-4 items-start hover:border-primary/10 transition-colors"
              >
                <img 
                  alt={insight.name} 
                  className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                  src={insight.avatar}
                />
                <div className="space-y-2">
                  <div>
                    <h4 className="font-display font-bold text-xs text-primary">{insight.name}</h4>
                    <span className="inline-block bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[9px] font-bold px-2 py-0.5 rounded-full mt-1">
                      {insight.badge}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    "{insight.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
