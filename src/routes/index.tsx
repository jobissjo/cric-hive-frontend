import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useLiveMatch, useFeedPosts, useLikePost, useVoteInPoll } from '../hooks/useCricketData'
import { matches } from '../data/matches'

export const Route = createFileRoute('/')({ component: Dashboard })

interface Community {
  id: string
  name: string
  tag: string
  members: string
  activeNow: string
  activityHeat: number
  accent: string
  icon: string
  summary: string
  banner: string
  avatar: string
}

function Dashboard() {
  const { data: liveMatch, isLoading: isMatchLoading } = useLiveMatch()
  const { data: posts, isLoading: isFeedLoading } = useFeedPosts()
  const { mutate: likePost } = useLikePost()
  const { mutate: voteInPoll } = useVoteInPoll()

  // Local state for dashboard interactions (Spotify/Discord level)
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['death-overs'])
  const [tunedRoomId, setTunedRoomId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Sample static community data
  const communitiesList = useMemo<Community[]>(() => [
    {
      id: 'death-overs',
      name: 'Death Overs Lab',
      tag: 'Tactics',
      members: '18.4k',
      activeNow: '284',
      activityHeat: 98,
      accent: 'text-neon-green border-neon-green/30',
      icon: 'target',
      summary: 'Field maps, yorker plans, and boundary pressure metrics for overs 16-20.',
      banner: 'https://images.unsplash.com/photo-1540747737956-378724043b6d?w=600&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'fantasy-captains',
      name: 'Fantasy Captains',
      tag: 'Fantasy',
      members: '42.1k',
      activeNow: '918',
      activityHeat: 92,
      accent: 'text-electric-blue border-electric-blue/30',
      icon: 'military_tech',
      summary: 'Captaincy punts, team pivots, boundary size stats and toss updates.',
      banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'spin-watch',
      name: 'Spin Watch',
      tag: 'Analysis',
      members: '12.7k',
      activeNow: '156',
      activityHeat: 78,
      accent: 'text-neon-green border-neon-green/30',
      icon: 'cyclone',
      summary: 'Wrist spin pitch maps, drift data, and middle-over squeeze calculations.',
      banner: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'street-cricket',
      name: 'Street Cricket Stories',
      tag: 'Culture',
      members: '9.8k',
      activeNow: '73',
      activityHeat: 64,
      accent: 'text-electric-blue border-electric-blue/30',
      icon: 'groups',
      summary: 'Local legends, tape-ball anecdotes, and epic box-cricket matches.',
      banner: 'https://images.unsplash.com/photo-1594470117754-e3478d8a25c3?w=600&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  ], [])

  // Sample static live audio rooms list
  const liveRooms = [
    {
      id: 'room-1',
      title: 'MI vs CSK Watch Party',
      status: 'Live now',
      listeners: '1,204',
      speakers: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBOj0Dn5vo4Ger2opQjbnH6aOip7pfz6lrNiWqJSQkApsXNYoRG59VRHyqdjkH2xzLqC0Zyq5Cm2grh4RB9SQ4KYfh66TAPhKXt9v2HFt_gnKqHEFpKivjjtp1og9H5fc5K_rqlxByAkKmDyGKWx5AkDofomPl_VhIBV-F1SBP_HA51HVVbqmtNzM1bCn6QHZOsZghlz0lV_MPTrSOFlC-2sg-ESUwDdifsopWrkFKfvgghln7ImBpjjRtKgeoLeaql86JZxGcqQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4nMvBD-CO9NBBBtm7WLBNXuvVXjg9tmIAIVar6aEkEf4wC6czX5SlMXlcMl1Bcp5t2_01e6fkBQOL6HCkexzyI1nCf5RkjliAeWef7ZaL4UEClvQuQYw6PHbZd8uRVPg-1eG-7FsBAF5ojY8WtCa6evZZhm3sIP-KUkYYv309pHPEvXFUCZtypmY0u_dT7pISd_ZyNQUS03uw2gONT7taCLmw2yf65mCgoHO5KgJ2VsrsZk3M3kaNYajg3QdgvGwtqQ3yCS8M1s',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD9W_8seaft-UyWjo609UJQVkP_NfhHx4Q2AXRcf0_BuFsJMnIf7KqtsDXrZ6XQuq1ZHz_ikGD4_WVFCsVFmg1THJdKE_rUKW8tE6_X2OohcLgpLXRjXPG5hg3IisixUUluJ1JUxg1LoF7_CF662Z2pirRsjX0JSvZarAsa4SvenLBgG8VSeEaGGx4UObJCdvOBGmtrE2DI-OpmpOoYdwZB2NBzQipSMAapHLw2aG4q828lPK_RKfzBz8ePpGtqdM5Z5FXnRw2Bzjg'
      ],
      speakingIndex: 0
    },
    {
      id: 'room-2',
      title: 'Tactics & Death Over Setup',
      status: 'Analyst Hosted',
      listeners: '342',
      speakers: [
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=100&auto=format&fit=crop&q=80'
      ],
      speakingIndex: 1
    }
  ]

  // Filtered community list
  const filteredCommunities = useMemo(() => {
    return communitiesList.filter(c => activeCategory === 'All' || c.tag === activeCategory)
  }, [activeCategory, communitiesList])

  // Toggle joining community
  const handleToggleJoin = (id: string) => {
    setJoinedCommunities(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    )
  }

  // Toggle connecting to audio room
  const handleToggleRoom = (roomId: string) => {
    setTunedRoomId(prev => prev === roomId ? null : roomId)
  }

  return (
    <div className="px-margin-mobile py-base md:px-margin-desktop md:py-md space-y-md max-w-[1360px] mx-auto rise-in">
      
      {/* 1. TOP SECTION: LIVE TICKER */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green live-pulse" />
            <h2 className="font-display font-black text-xs uppercase tracking-widest text-white">Live Score Feed</h2>
          </div>
          <span className="text-[10px] text-on-surface-variant/80 tracking-wide">Swipe to explore active matches</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {matches.map((match) => {
            const isMatchLive = match.status === 'live'
            const isMatchUpcoming = match.status === 'upcoming'

            return (
              <Link
                key={match.id}
                to={isMatchLive ? `/matches` : `/matches`}
                className="flex-shrink-0 w-64 glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/5 bg-gradient-to-br from-surface-container-low to-surface/40 hover:scale-[1.02] transition-transform duration-300 relative group"
              >
                {/* Glowing stadium line details */}
                {isMatchLive && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-neon-green/5 rounded-full blur-xl pointer-events-none group-hover:bg-neon-green/10" />
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] uppercase font-black text-on-surface-variant tracking-wider bg-white/5 px-2 py-0.5 rounded-full">
                    {match.league}
                  </span>
                  {isMatchLive ? (
                    <span className="flex items-center gap-1 bg-neon-green/10 border border-neon-green/20 text-neon-green text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      <span className="w-1 h-1 rounded-full bg-neon-green" />
                      Live
                    </span>
                  ) : isMatchUpcoming ? (
                    <span className="bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Upcoming
                    </span>
                  ) : (
                    <span className="bg-white/5 text-on-surface-variant/80 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      Recent
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: match.team1.logoColor }} />
                      <span className="font-display font-black text-xs text-white">{match.team1.shortName}</span>
                    </div>
                    <span className="font-display font-black text-xs text-white">{match.team1.score || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: match.team2.logoColor }} />
                      <span className="font-display font-black text-xs text-white">{match.team2.shortName}</span>
                    </div>
                    <span className="font-display font-black text-xs text-on-surface-variant">{match.team2.score || '-'}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px] text-on-surface-variant">
                  <span className="truncate max-w-[130px] font-medium">{match.result}</span>
                  {isMatchLive && match.team1.overs && (
                    <span className="font-bold text-neon-green">{match.team1.overs} Ov</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 2. TOP SECTION: FEATURED MATCH CENTER BANNER */}
      {isMatchLoading || !liveMatch ? (
        <div className="glass-panel rounded-3xl p-8 border border-white/10 skeleton-shimmer h-80 flex flex-col justify-center items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-neon-green animate-spin">sports_cricket</span>
          <p className="text-on-surface-variant font-display font-bold text-sm tracking-widest uppercase">Initializing Match Engine Feeds...</p>
        </div>
      ) : (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c121a] via-[#05080c] to-surface-container-lowest border border-white/5 shadow-2xl p-6 md:p-8 flex flex-col xl:flex-row gap-lg justify-between items-stretch">
          {/* Radial ambient highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,218,243,0.06),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(215,255,0,0.05),transparent_70%)] pointer-events-none" />
          
          {/* Scorecard panel content */}
          <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green live-pulse" />
                  <span className="font-display font-bold text-[10px] text-neon-green tracking-widest uppercase">Arena Live</span>
                </div>
                <div className="text-[10px] text-on-surface-variant font-semibold bg-white/5 border border-white/5 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {liveMatch.venue}
                </div>
              </div>
              <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {liveMatch.title}: <span className="text-neon-green">{liveMatch.team1.shortName} vs {liveMatch.team2.shortName}</span>
              </h1>
            </div>

            {/* Core Scores Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-2xl bg-[#030508]/60 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 rounded-full blur-xl pointer-events-none" />
              {/* Team 1 */}
              <div className="flex items-center justify-between md:justify-start gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-black text-sm text-black shadow-lg" style={{ backgroundColor: liveMatch.team1.logoColor }}>
                  {liveMatch.team1.shortName}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-white">{liveMatch.team1.shortName}</h3>
                  <div className="font-display font-black text-xl text-neon-green mt-0.5">
                    {liveMatch.team1.score}/{liveMatch.team1.wickets} <span className="text-xs text-on-surface-variant font-medium">({liveMatch.team1.overs} ov)</span>
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex items-center justify-between md:justify-start gap-4 border-t border-white/5 md:border-t-0 md:border-l md:border-white/5 pt-4 md:pt-0 md:pl-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-black text-sm text-white shadow-lg" style={{ backgroundColor: liveMatch.team2.logoColor }}>
                  {liveMatch.team2.shortName}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-white">{liveMatch.team2.shortName}</h3>
                  {liveMatch.team2.score > 0 ? (
                    <div className="font-display font-black text-xl text-white mt-0.5">
                      {liveMatch.team2.score}/{liveMatch.team2.wickets} <span className="text-xs text-on-surface-variant font-medium">({liveMatch.team2.overs} ov)</span>
                    </div>
                  ) : (
                    <div>
                      <div className="font-display font-black text-md text-on-surface-variant/40">Yet to bat</div>
                      <div className="text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">Target: {liveMatch.target || 185}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Current Batsman and Bowler Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl pt-2">
              <div className="bg-[#05070a]/40 border border-white/5 rounded-xl p-3 flex justify-between items-center hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-green text-sm">sports_cricket</span>
                  <span className="font-semibold text-xs text-white">{liveMatch.currentBatsman.name}</span>
                </div>
                <span className="font-display font-bold text-xs text-neon-green bg-neon-green/5 border border-neon-green/10 px-2 py-0.5 rounded">{liveMatch.currentBatsman.stats}</span>
              </div>
              <div className="bg-[#05070a]/40 border border-white/5 rounded-xl p-3 flex justify-between items-center hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-electric-blue text-sm">sports_baseball</span>
                  <span className="font-semibold text-xs text-white">{liveMatch.currentBowler.name}</span>
                </div>
                <span className="font-display font-bold text-xs text-electric-blue bg-electric-blue/5 border border-electric-blue/10 px-2 py-0.5 rounded">{liveMatch.currentBowler.stats}</span>
              </div>
            </div>
          </div>

          {/* Stadium lighting overlay details */}
          <div className="relative z-10 w-full xl:w-[420px] bg-[#030508]/40 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-md shadow-2xl">
            {/* Win Chance dial */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-neon-green uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Neural Win probability
                </span>
                <span className="text-[10px] font-black text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded-full uppercase">CSK Favored</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-display font-black text-neon-green">75%</div>
                <div className="flex-1 bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div className="bg-gradient-to-r from-neon-green to-electric-blue h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(215,255,0,0.5)]" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Momentum analysis visualizer */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">insights</span>
                Live Momentum (Overs 13-18)
              </h3>
              <div className="h-16 flex items-end gap-1.5 justify-between">
                {liveMatch?.momentumData?.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="w-full relative bg-white/5 rounded-t-md h-12 flex items-end overflow-hidden">
                      <div 
                        className={`w-full rounded-t-md transition-all duration-500 group-hover:brightness-110 ${idx % 2 === 0 ? 'bg-gradient-to-t from-neon-green/30 to-neon-green' : 'bg-gradient-to-t from-electric-blue/30 to-electric-blue'}`}
                        style={{ height: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive button layout */}
            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
              <Link 
                to="/predictions" 
                className="w-full text-center text-[10px] font-black bg-[#05070a]/80 hover:bg-neon-green hover:text-black border border-white/5 hover:border-neon-green text-white py-2.5 rounded-xl uppercase tracking-wider transition-all duration-300"
              >
                AI Predictor
              </Link>
              <Link 
                to="/matches" 
                className="w-full text-center text-[10px] font-black bg-neon-green text-black hover:bg-[#c3f400] text-primary py-2.5 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(215,255,0,0.2)]"
              >
                Match Center
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* THREE-COLUMN PREMIUM LAYOUT SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-md items-start">
        
        {/* LEFT & CENTER CONTENT COLUMN (3/4 of desktop view) */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-md">
          
          {/* MIDDLE: FEATURED COMMUNITIES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-green text-md">stars</span>
                <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">Featured Communities</h3>
              </div>
              <Link to="/communities" className="text-[10px] uppercase font-black text-neon-green hover:underline tracking-wider">
                Explore All
              </Link>
            </div>

            {/* Premium communities cards list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {communitiesList.slice(0, 2).map((community) => {
                const isJoined = joinedCommunities.includes(community.id)

                return (
                  <article
                    key={community.id}
                    className="glass-panel rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-surface-container-low/90 to-surface/40 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Banners */}
                    <div className="h-28 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#040608] z-10" />
                      <img 
                        alt={community.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        src={community.banner}
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[9px] font-black uppercase text-neon-green tracking-wider px-2 py-0.5 rounded-full z-20">
                        {community.tag}
                      </span>
                      <span className="absolute top-3 right-3 bg-[#0d141e]/90 text-white font-black text-[9px] px-2 py-0.5 rounded-full z-20 flex items-center gap-1 border border-white/5">
                        <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />
                        {community.activeNow} live
                      </span>
                    </div>

                    {/* Community details */}
                    <div className="px-5 pb-5 pt-3 space-y-4 relative z-20">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-3">
                          <img 
                            alt={community.name} 
                            className="w-10 h-10 rounded-xl border border-white/10 object-cover" 
                            src={community.avatar}
                          />
                          <div className="min-w-0">
                            <h4 className="font-display font-black text-sm text-white group-hover:text-neon-green transition-colors truncate">{community.name}</h4>
                            <p className="text-[10px] text-on-surface-variant">{community.members} Members</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleJoin(community.id)}
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                            isJoined 
                              ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' 
                              : 'bg-neon-green text-black hover:shadow-[0_0_15px_rgba(215,255,0,0.3)] hover:bg-[#c3f400]'
                          }`}
                        >
                          {isJoined ? 'Joined' : 'Join Hive'}
                        </button>
                      </div>

                      <p className="text-xs text-on-surface-variant leading-relaxed min-h-[36px]">
                        {community.summary}
                      </p>

                      {/* Stacking members and Heat indicator */}
                      <div className="flex justify-between items-center border-t border-white/5 pt-3">
                        <div className="flex -space-x-2">
                          {liveRooms[0].speakers.map((s, i) => (
                            <img key={i} alt="Online member" className="w-5 h-5 rounded-full border border-[#040608] object-cover" src={s} />
                          ))}
                          <span className="w-5 h-5 rounded-full bg-white/5 text-[8px] font-bold text-white flex items-center justify-center border border-[#040608]">
                            +{community.members.split('k')[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase text-neon-green bg-neon-green/5 border border-neon-green/10 px-2 py-0.5 rounded-full">
                          <span>🔥</span>
                          <span>{community.activityHeat}% Heat Score</span>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* MIDDLE: COMMUNITY DISCOVERY CATEGORIES */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-on-surface-variant">Community Discovery</h3>
              <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-full">
                {['All', 'Tactics', 'Fantasy', 'Analysis', 'Culture'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-neon-green border-neon-green text-black' 
                        : 'bg-white/5 border-white/5 text-on-surface-variant hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Active category communities list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-md">
              {filteredCommunities.slice(0, 3).map((community) => {
                const isJoined = joinedCommunities.includes(community.id)

                return (
                  <div
                    key={community.id}
                    className="glass-panel rounded-2xl p-4 border border-white/5 bg-gradient-to-br from-surface-container-low/40 to-surface/20 flex flex-col justify-between gap-3 group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`w-8 h-8 rounded-xl bg-white/5 border border-white/5 text-neon-green flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-sm">{community.icon}</span>
                      </span>
                      <button
                        onClick={() => handleToggleJoin(community.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          isJoined 
                            ? 'bg-white/5 border border-white/5 text-neon-green' 
                            : 'bg-white/5 border border-white/5 text-white hover:bg-neon-green hover:text-black'
                        }`}
                        title={isJoined ? 'Leave Community' : 'Join Community'}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isJoined ? 'check' : 'add'}
                        </span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-black text-xs text-white truncate">{community.name}</h4>
                      <p className="text-[10px] text-on-surface-variant line-clamp-2 min-h-[30px]">{community.summary}</p>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-on-surface-variant/80 border-t border-white/5 pt-2">
                      <span>👥 {community.members} fans</span>
                      <span className="font-bold text-neon-green">🔥 {community.activityHeat}% Activity</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* BOTTOM: RECOMMENDED HIVES */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-electric-blue text-md">explore</span>
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">Recommended Communities</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {communitiesList.slice(2, 4).map((community) => {
                const isJoined = joinedCommunities.includes(community.id)

                return (
                  <div
                    key={community.id}
                    className="glass-panel rounded-2xl p-4 border border-white/5 bg-gradient-to-br from-surface-container-low/70 to-surface/30 flex items-center justify-between gap-4 hover:-translate-y-0.5 duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 text-electric-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined">{community.icon}</span>
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-xs text-white truncate">{community.name}</h4>
                        <p className="text-[10px] text-on-surface-variant truncate">{community.summary}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleJoin(community.id)}
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider shrink-0 transition-all ${
                        isJoined 
                          ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' 
                          : 'bg-electric-blue text-black hover:shadow-[0_0_12px_rgba(0,218,243,0.35)]'
                      }`}
                    >
                      {isJoined ? 'Joined' : 'Quick Join'}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* BOTTOM: SOCIAL POSTS TIMELINE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-green text-md">forum</span>
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-white">Latest Hive Discussions</h3>
            </div>

            {isFeedLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="glass-panel rounded-2xl p-5 skeleton-shimmer h-40 border border-white/5" />
                ))}
              </div>
            ) : (
              <div className="space-y-md">
                {posts?.map((post) => (
                  <article
                    key={post.id}
                    className="glass-panel rounded-2xl p-5 border border-white/5 bg-gradient-to-br from-surface-container-low/90 to-surface/40 hover:border-white/10 transition-all duration-300 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <img 
                          alt={post.author} 
                          className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                          src={post.avatar}
                        />
                        <div>
                          <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                            {post.author}
                            {post.isOfficial && (
                              <span 
                                className="material-symbols-outlined text-electric-blue text-[13px]" 
                                style={{ fontVariationSettings: "'FILL' 1" }}
                                title="Verified CricHive Broadcaster"
                              >
                                verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[10px] text-on-surface-variant font-medium">{post.handle} • {post.time}</p>
                        </div>
                      </div>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-white p-1 rounded hover:bg-white/5 text-md cursor-pointer">
                        more_horiz
                      </button>
                    </div>

                    {/* Post content */}
                    <p className="text-xs text-white leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Image Attachment */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden border border-white/5 bg-black/40 max-h-80">
                        <img alt="Post media content" className="w-full h-full object-cover" src={post.image} />
                      </div>
                    )}

                    {/* Dynamic Interactive Polls */}
                    {post.poll && (
                      <div className="bg-[#030508]/60 border border-white/5 rounded-xl p-4 space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 rounded-full blur-xl pointer-events-none" />
                        <div className="flex items-center gap-1 text-[9px] text-neon-green font-black uppercase tracking-wider">
                          <span className="material-symbols-outlined text-xs">ballot</span>
                          Live Hive Prediction Poll
                        </div>
                        <h5 className="font-display font-bold text-xs text-white">{post.poll.question}</h5>
                        
                        <div className="space-y-2">
                          {post.poll.options.map((option, idx) => {
                            const isVoted = post.poll?.votedIndex !== undefined
                            const isSelectedOption = post.poll?.votedIndex === idx

                            return (
                              <button
                                key={idx}
                                disabled={isVoted}
                                onClick={() => voteInPoll({ pollId: post.id, optionIndex: idx })}
                                className={`w-full relative overflow-hidden rounded-xl border p-3 flex justify-between items-center transition-all duration-300 text-left text-xs ${
                                  isVoted 
                                    ? 'border-white/5 bg-white/[0.01] cursor-default' 
                                    : 'border-white/10 hover:border-[#D7FF00]/40 bg-white/5 hover:bg-white/[0.07] active:scale-[0.99] cursor-pointer'
                                }`}
                              >
                                {isVoted && (
                                  <div 
                                    className="absolute inset-y-0 left-0 bg-white/5 transition-all duration-1000 ease-out" 
                                    style={{ 
                                      width: `${option.percentage}%`,
                                      borderLeft: `3px solid ${option.borderLeft}`
                                    }}
                                  />
                                )}
                                <span className={`relative z-10 font-semibold ${isSelectedOption ? 'text-white' : 'text-on-surface-variant'}`}>
                                  {option.text}
                                </span>
                                {isVoted ? (
                                  <span className="relative z-10 font-display font-black text-white">{option.percentage}%</span>
                                ) : (
                                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant opacity-0 hover:opacity-100">
                                    check_circle
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action triggers */}
                    <div className="flex justify-between items-center border-t border-white/5 pt-3 text-on-surface-variant text-[11px] font-semibold">
                      <button 
                        onClick={() => likePost(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                          post.liked ? 'text-neon-green bg-neon-green/10 font-black' : 'hover:text-neon-green hover:bg-white/5'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: post.liked ? "'FILL' 1" : undefined }}>
                          thumb_up
                        </span>
                        <span>{post.likes}</span>
                      </button>

                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-electric-blue hover:bg-white/5 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-sm">forum</span>
                        <span>{post.comments}</span>
                      </button>

                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-sm">share</span>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* RIGHT SIDEBAR COLUMN: DISCORD / SPOTIFY AUDIO REAL-TIME PANEL (1/3 of view) */}
        <div className="space-y-md">
          
          {/* LIVE VOICES AUDIO PANEL */}
          <section className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-green text-md">record_voice_over</span>
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-white">Live Rooms</h3>
              </div>
              <span className="flex items-center gap-1.5 bg-neon-green/10 border border-neon-green/20 text-neon-green text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-[0_0_8px_rgba(215,255,0,0.15)]">
                <span className="w-1 h-1 rounded-full bg-neon-green" />
                Active
              </span>
            </div>

            <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed">
              Real-time voice rooms. Connect to audio panels to debate live spell matches with pro analysts and commentators.
            </p>

            <div className="space-y-3">
              {liveRooms.map((room) => {
                const isTuned = tunedRoomId === room.id

                return (
                  <div
                    key={room.id}
                    className={`rounded-xl border p-4 transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 bg-[#030508]/40 ${
                      isTuned 
                        ? 'border-neon-green bg-gradient-to-br from-neon-green/5 to-transparent' 
                        : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Top row */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{room.title}</h4>
                        <span className="text-[9px] font-semibold text-on-surface-variant">{room.status} • {room.listeners} listening</span>
                      </div>
                      
                      {/* Interactive sound equalizer waves */}
                      {isTuned ? (
                        <div className="waveform-container" title="Audio connected">
                          <span className="waveform-bar" />
                          <span className="waveform-bar" />
                          <span className="waveform-bar" />
                          <span className="waveform-bar" />
                        </div>
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant/40 text-sm">graphic_eq</span>
                      )}
                    </div>

                    {/* Participant avatars with speaking indicator */}
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1.5">
                          {room.speakers.map((speaker, idx) => {
                            const isSpeaking = room.speakingIndex === idx && isTuned

                            return (
                              <div key={idx} className="relative flex-shrink-0">
                                <img 
                                  alt="Audio Speaker avatar" 
                                  className={`w-6 h-6 rounded-full border border-[#040608] object-cover transition-all ${
                                    isSpeaking ? 'ring-2 ring-neon-green scale-105 shadow-[0_0_8px_rgba(215,255,0,0.5)] z-20' : 'z-10'
                                  }`} 
                                  src={speaker} 
                                />
                                {isSpeaking && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green border border-[#040608] absolute bottom-0 right-0 z-30 animate-ping" />
                                )}
                              </div>
                            )
                          })}
                        </div>
                        <span className="text-[8px] font-black uppercase text-on-surface-variant font-bold">Speakers online</span>
                      </div>

                      <button
                        onClick={() => handleToggleRoom(room.id)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shadow-lg ${
                          isTuned 
                            ? 'bg-neon-green text-black hover:bg-[#c3f400] shadow-[0_0_12px_rgba(215,255,0,0.3)]' 
                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[10px] font-black">
                          {isTuned ? 'volume_up' : 'headphones'}
                        </span>
                        <span>{isTuned ? 'Connected' : 'Tune In'}</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* TRENDING DISCUSSIONS WIDGET */}
          <section className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-electric-blue text-md">insights</span>
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-white">Hot Topics</h3>
              </div>
              <span className="bg-white/5 text-on-surface-variant text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Hourly</span>
            </div>

            <div className="space-y-2">
              {[
                { channel: '#KohliVsStarc Duel', description: 'Ball-by-ball predictive sentiment analysis', count: '1.4k predictions' },
                { channel: '#DeathOversYorkers', description: 'Tactical analysis on MI wide bowler map', count: '842 posts' },
                { channel: '#FantasyPuntsLock', description: 'Late toss pivot captain picks discussions', count: '2.1k voters' },
                { channel: '#ChinnaswamyPitchCracks', description: 'Live humidity and grass depth metrics', count: '516 analysts' }
              ].map((topic, i) => (
                <Link
                  key={i}
                  to="/feed"
                  className="flex flex-col rounded-xl border border-transparent p-2.5 hover:border-white/5 hover:bg-[#030508]/30 transition-all block group text-left"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-white group-hover:text-neon-green transition-colors truncate">{topic.channel}</span>
                    <span className="text-[8px] font-black uppercase text-neon-green bg-neon-green/5 border border-neon-green/10 px-2 py-0.5 rounded-full">{topic.count}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant truncate mt-0.5">{topic.description}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ACTIVE USERS FEED */}
          <section className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green live-pulse" />
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-white">Active Hive Experts</h3>
              </div>
              <span className="text-[9px] font-semibold text-on-surface-variant">142 online</span>
            </div>

            <div className="space-y-3">
              {[
                { 
                  name: 'Alex Chen', 
                  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4nMvBD-CO9NBBBtm7WLBNXuvVXjg9tmIAIVar6aEkEf4wC6czX5SlMXlcMl1Bcp5t2_01e6fkBQOL6HCkexzyI1nCf5RkjliAeWef7ZaL4UEClvQuQYw6PHbZd8uRVPg-1eG-7FsBAF5ojY8WtCa6evZZhm3sIP-KUkYYv309pHPEvXFUCZtypmY0u_dT7pISd_ZyNQUS03uw2gONT7taCLmw2yf65mCgoHO5KgJ2VsrsZk3M3kaNYajg3QdgvGwtqQ3yCS8M1s',
                  status: 'Listening to CSK Watch Party',
                  role: 'Top Predictor'
                },
                { 
                  name: 'Sarah Miller', 
                  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9W_8seaft-UyWjo609UJQVkP_NfhHx4Q2AXRcf0_BuFsJMnIf7KqtsDXrZ6XQuq1ZHz_ikGD4_WVFCsVFmg1THJdKE_rUKW8tE6_X2OohcLgpLXRjXPG5hg3IisixUUluJ1JUxg1LoF7_CF662Z2pirRsjX0JSvZarAsa4SvenLBgG8VSeEaGGx4UObJCdvOBGmtrE2DI-OpmpOoYdwZB2NBzQipSMAapHLw2aG4q828lPK_RKfzBz8ePpGtqdM5Z5FXnRw2Bzjg',
                  status: 'Voting on India vs Aus Poll',
                  role: 'Stat Guru'
                },
                { 
                  name: 'Harsha Bhogle', 
                  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBOj0Dn5vo4Ger2opQjbnH6aOip7pfz6lrNiWqJSQkApsXNYoRG59VRHyqdjkH2xzLqC0Zyq5Cm2grh4RB9SQ4KYfh66TAPhKXt9v2HFt_gnKqHEFpKivjjtp1og9H5fc5K_rqlxByAkKmDyGKWx5AkDofomPl_VhIBV-F1SBP_HA51HVVbqmtNzM1bCn6QHZOsZghlz0lV_MPTrSOFlC-2sg-ESUwDdifsopWrkFKfvgghln7ImBpjjRtKgeoLeaql86JZxGcqQ',
                  status: 'Analyzing Duel Pitch cracks',
                  role: 'Verified Expert'
                }
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#030508]/20 p-2 rounded-xl border border-white/[0.02]">
                  <div className="relative">
                    <img alt={user.name} className="w-8 h-8 rounded-full border border-white/10 object-cover" src={user.avatar} />
                    <span className="w-2 h-2 bg-neon-green rounded-full border border-[#040608] absolute bottom-0 right-0 z-10 shadow-[0_0_8px_rgba(215,255,0,0.5)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-xs font-bold text-white truncate">{user.name}</span>
                      <span className="text-[8px] font-black uppercase text-electric-blue tracking-wider">{user.role}</span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{user.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

    </div>
  )
}
