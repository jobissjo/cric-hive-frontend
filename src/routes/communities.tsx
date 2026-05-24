import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/communities')({ component: Communities })

const communities = [
  {
    id: 'death-overs',
    name: 'Death Overs Lab',
    tag: 'Tactics',
    members: '18.4k',
    live: 284,
    accent: 'text-neon-green',
    border: 'border-neon-green/30',
    icon: 'target',
    summary: 'Field maps, yorker plans, and pressure reads for overs 16-20.',
    pulse: 'Bumrah slower-ball setup is trending after the 18th over.',
  },
  {
    id: 'fantasy-captains',
    name: 'Fantasy Captains',
    tag: 'Fantasy',
    members: '42.1k',
    live: 918,
    accent: 'text-electric-blue',
    border: 'border-electric-blue/30',
    icon: 'military_tech',
    summary: 'Captaincy punts, toss pivots, and late injury swaps before lock.',
    pulse: 'All-rounder stacks are up 22% for batting-first teams.',
  },
  {
    id: 'spin-watch',
    name: 'Spin Watch',
    tag: 'Analysis',
    members: '12.7k',
    live: 156,
    accent: 'text-neon-green',
    border: 'border-neon-green/30',
    icon: 'cyclone',
    summary: 'Wrist spin, matchups, drift maps, and middle-over squeeze talk.',
    pulse: 'Leg-side boundary size is changing the Kuldeep matchup model.',
  },
  {
    id: 'street-cricket',
    name: 'Street Cricket Stories',
    tag: 'Culture',
    members: '9.8k',
    live: 73,
    accent: 'text-electric-blue',
    border: 'border-electric-blue/30',
    icon: 'groups',
    summary: 'Local ground legends, tape-ball lore, and backyard rivalries.',
    pulse: 'Sunday box-cricket photos from Bengaluru are everywhere.',
  },
]

const rooms = [
  ['MI vs CSK Watch Party', 'Live now', '1,204 listening', 'sports_cricket'],
  ['Selection Debate', 'Starting soon', '342 queued', 'how_to_vote'],
  ['Pitch Report Room', 'Analyst hosted', '86 listening', 'grass'],
]

function Communities() {
  const [activeTag, setActiveTag] = useState('All')
  const [joined, setJoined] = useState<string[]>(['death-overs'])
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0])

  const tags = ['All', 'Tactics', 'Fantasy', 'Analysis', 'Culture']
  const filteredCommunities = useMemo(
    () => communities.filter((community) => activeTag === 'All' || community.tag === activeTag),
    [activeTag],
  )

  const joinedCount = joined.length

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-8 md:py-8 rise-in">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#071017]/90 p-6 md:p-8">
        <img
          alt="Cricket fans under stadium lights"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3MnnHFaHD2FRICUApb5GLRtrqSEy1vk75h17MIRT-Sxoo5z39693sqWQM4rm9kWIGEdNZxV7JiI9qMPL5nCr1koR41dn1enAroG7vItx-kw3VNcM4Pz-QbtBsX2_ZrL7QeyIE2FoPbP8-j4ep4FNRuLNbus-SioyR1kvpQvkzkibfsUA8rtVLenjoT-dMTQwMoGvMTkf3AVpbInqFDfnOVFplWij5dgThCyEmeTcL-6vOZb8InbWNMXufQtkeNSEDAdNtDnJlTmI"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/85 to-surface/40" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_300px] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-neon-green">
              <span className="h-2 w-2 rounded-full bg-neon-green live-pulse" />
              {joinedCount} joined hives
            </span>
            <div>
              <h1 className="font-display text-3xl font-black tracking-tight text-primary md:text-4xl">
                CricHive Communities
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                Find your match-day circle, follow live rooms, and build a sharper cricket brain with fans who watch the game your way.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#05070a]/70 p-3">
            <Metric label="Live" value="1.4k" />
            <Metric label="Rooms" value="18" />
            <Metric label="Posts" value="6.2k" />
          </div>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition-colors ${
              activeTag === tag
                ? 'border-neon-green bg-neon-green text-black'
                : 'border-white/10 bg-white/5 text-on-surface-variant hover:text-primary'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="grid gap-4 md:grid-cols-2">
          {filteredCommunities.map((community) => {
            const isJoined = joined.includes(community.id)

            return (
              <article
                key={community.id}
                className={`glass-panel rounded-3xl border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 ${community.border}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <button
                    onClick={() => setSelectedCommunity(community)}
                    className="flex min-w-0 items-center gap-3 text-left"
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${community.accent}`}>
                      <span className="material-symbols-outlined">{community.icon}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-lg font-black text-primary">{community.name}</span>
                      <span className="text-xs font-bold text-on-surface-variant">{community.tag}</span>
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setJoined((current) =>
                        current.includes(community.id)
                          ? current.filter((communityId) => communityId !== community.id)
                          : [...current, community.id],
                      )
                    }
                    className={`rounded-xl px-3 py-2 text-xs font-black ${
                      isJoined
                        ? 'border border-white/10 bg-white/5 text-primary'
                        : 'bg-neon-green text-black hover:shadow-[0_0_14px_rgba(204,255,0,0.32)]'
                    }`}
                  >
                    {isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>

                <p className="min-h-12 text-sm leading-relaxed text-on-surface-variant">{community.summary}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                  <Metric label="Members" value={community.members} />
                  <Metric label="Live now" value={community.live.toString()} />
                </div>

                <div className="mt-4 rounded-2xl border border-white/5 bg-[#05070a]/60 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Hive pulse</p>
                  <p className="mt-1 text-xs leading-relaxed text-primary">{community.pulse}</p>
                </div>
              </article>
            )
          })}
        </section>

        <aside className="space-y-6">
          <section className="glass-panel rounded-3xl border border-white/10 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-black text-primary">Live Rooms</h2>
              <span className="material-symbols-outlined text-neon-green">graphic_eq</span>
            </div>
            <div className="space-y-3">
              {rooms.map(([name, status, count, icon]) => (
                <button
                  key={name}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-left hover:border-electric-blue/30 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-blue/10 text-electric-blue">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-primary">{name}</span>
                    <span className="text-[11px] text-on-surface-variant">{status} • {count}</span>
                  </span>
                  <span className="h-2 w-2 rounded-full bg-neon-green live-pulse" />
                </button>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-3xl border border-white/10 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${selectedCommunity.accent}`}>
                <span className="material-symbols-outlined">{selectedCommunity.icon}</span>
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-black text-primary">{selectedCommunity.name}</h2>
                <p className="text-xs text-on-surface-variant">Spotlight community</p>
              </div>
            </div>
            <div className="space-y-3">
              {['Match thread opens 30m before toss', 'Top analysts get pinned in live rooms', 'Weekly prediction leaderboard refreshes Monday'].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-[#05070a]/50 p-3">
                  <span className="material-symbols-outlined text-[18px] text-neon-green">check_circle</span>
                  <p className="text-xs leading-relaxed text-on-surface-variant">{item}</p>
                </div>
              ))}
            </div>
            <Link
              to="/feed"
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-neon-green px-4 py-3 text-sm font-black text-black"
            >
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              Start Community Post
            </Link>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="font-display text-lg font-black text-primary">{value}</p>
    </div>
  )
}
