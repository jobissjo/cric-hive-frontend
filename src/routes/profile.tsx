import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({ component: Profile })

const profileAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB2LzMwBGyYjULFR4NWgeLD1eIPFhrwhirQQHuXdemG9H8Cwp2W-Fqkgsz2X5SXsn4PcsHkLBKlbV9i6OmXIGcjHS8Nz9pIhOx2AdW3sjDwReeKhft_Yd_FS6ay0RDfTRnyqEOMBFc5LiK2nTDNA-vuMzKbUDf8dkQ8wF1TL7_OLBnvr48jeJivO4FjdOxHqYGeESXS3u3uW-JEz1EQgbWaq1b7wfAYUY3MKIj-yZ6PaFbtTh21_Zy-VhRa84ZyRzBnRsMXN_5hTW8'

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC3MnnHFaHD2FRICUApb5GLRtrqSEy1vk75h17MIRT-Sxoo5z39693sqWQM4rm9kWIGEdNZxV7JiI9qMPL5nCr1koR41dn1enAroG7vItx-kw3VNcM4Pz-QbtBsX2_ZrL7QeyIE2FoPbP8-j4ep4FNRuLNbus-SioyR1kvpQvkzkibfsUA8rtVLenjoT-dMTQwMoGvMTkf3AVpbInqFDfnOVFplWij5dgThCyEmeTcL-6vOZb8InbWNMXufQtkeNSEDAdNtDnJlTmI'

const battingImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAadJjxuAKaK0VQYkfp3ICw7UVf-97mvRa7l1fXB1AfHFhQLDbHqTx7JkZtB_gytI4hvPflKdnOyu5xk2-WwZ97x0YlrJJ7bpDuTdPNlUmxJsw2d5jMIz6dg20L5IH37FsOAYzgL4d9AnFo2oytrDkK9wg5gEl5jWDfRDyCLYfLXbQ84fYBRtQBTGCS92SfsmVdB5EXa13oxD2xLs26BuBwvnIz5tBswHGmE5CozFQ9U6nQIlyLOvQnaN16epZne-6wxD01UZ6GBcY'

const stats = [
  ['Prediction Accuracy', '84%'],
  ['Total Posts', '1,248'],
  ['Community Rank', '#12'],
  ['Win Streak', '7'],
]

function Profile() {
  return (
    <div className="rise-in">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img alt="Floodlit cricket stadium" className="h-full w-full object-cover opacity-60" src={heroImage} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-surface/20" />
        </div>

        <div className="relative mx-auto flex min-h-[340px] max-w-6xl flex-col justify-end gap-5 px-4 pb-8 pt-20 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative h-32 w-32 overflow-hidden rounded-3xl border border-neon-green/30 bg-[#05070a] shadow-[0_0_28px_rgba(204,255,0,0.16)]">
                <img alt="Arjun Sharma profile" className="h-full w-full object-cover" src={profileAvatar} />
                <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-neon-green text-black shadow-lg">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-3xl font-black tracking-tight text-primary md:text-4xl">Arjun Sharma</h1>
                    <span className="rounded-full border border-electric-blue/30 bg-electric-blue/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-secondary">
                      Pro Analyst
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant md:text-base">
                    Cricket enthusiast | Tactical Analyst | RCB Forever ❤️
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <span>
                    <strong className="font-display text-primary">12.4k</strong>{' '}
                    <span className="text-on-surface-variant">Followers</span>
                  </span>
                  <span>
                    <strong className="font-display text-primary">842</strong>{' '}
                    <span className="text-on-surface-variant">Following</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-primary hover:border-primary/40 hover:bg-white/10">
                Edit Profile
              </button>
              <button className="rounded-2xl bg-neon-green px-6 py-3 text-sm font-black text-black shadow-[0_0_18px_rgba(204,255,0,0.35)] hover:scale-[1.02]">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:px-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <section className="glass-panel rounded-3xl border border-white/10 p-6">
            <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-black text-primary">
              <span className="material-symbols-outlined text-neon-green">analytics</span>
              Fandom Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase leading-snug text-on-surface-variant">{label}</p>
                  <p className="font-display text-2xl font-black text-neon-green">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-3xl border border-white/10 p-6">
            <h2 className="mb-6 font-display text-2xl font-black text-primary">Favorites</h2>
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-sm uppercase text-on-surface-variant">Teams</p>
                <div className="flex flex-wrap gap-2">
                  <Chip dotClass="bg-blue-500">India</Chip>
                  <Chip dotClass="bg-red-500">RCB</Chip>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm uppercase text-on-surface-variant">Players</p>
                <Chip dotClass="bg-orange-500">Virat Kohli</Chip>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-3xl border border-white/10 p-6">
            <h2 className="mb-5 font-display text-2xl font-black text-primary">Achievements</h2>
            <div className="flex gap-3">
              {['emoji_events', 'verified_user', 'stars'].map((icon, iconIndex) => (
                <div
                  key={icon}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-primary ${
                    iconIndex === 0
                      ? 'border-neon-green/30 bg-neon-green/10'
                      : iconIndex === 1
                        ? 'border-electric-blue/30 bg-electric-blue/10'
                        : 'border-white/15 bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
          <div className="flex gap-8 border-b border-white/10 px-6 pt-5">
            {['Posts', 'Media', 'Saved Matches'].map((tab, tabIndex) => (
              <button
                key={tab}
                className={`pb-4 text-sm font-bold ${
                  tabIndex === 0
                    ? 'border-b-2 border-electric-blue text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6 p-6">
            <article className="rounded-3xl border border-white/10 bg-[#0d131b]/80 p-5">
              <div className="mb-4 flex justify-between">
                <div className="flex gap-3">
                  <img alt="Arjun Sharma" className="h-10 w-10 rounded-full object-cover" src={profileAvatar} />
                  <div>
                    <h3 className="font-display text-sm font-bold text-primary">Arjun Sharma</h3>
                    <p className="text-xs text-on-surface-variant">2 hours ago</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-primary">
                What a clinical finish by Kohli today! The way he manipulated the field in the last 3 overs was pure mastery. RCB looks strong for the playoffs. 🏏🔥
              </p>
              <img alt="Batter playing a cricket shot" className="mb-5 max-h-[320px] w-full rounded-2xl border border-white/10 object-cover" src={battingImage} />
              <div className="flex gap-7 text-sm text-on-surface-variant">
                <Action icon="thumb_up" label="1.2k" />
                <Action icon="chat_bubble" label="245" />
                <Action icon="share" label="89" />
              </div>
            </article>

            <article className="rounded-3xl border border-neon-green p-6 shadow-[0_0_20px_rgba(204,255,0,0.08)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-neon-green/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-neon-green">
                  Prediction Win
                </span>
                <span className="text-sm text-on-surface-variant">Yesterday</span>
              </div>
              <h3 className="mb-2 font-display font-black text-primary">Perfect Analysis!</h3>
              <p className="mb-5 text-sm leading-relaxed text-on-surface">
                Called the wicket falling in the 14th over. The spin-friendly surface was always going to trouble the middle order during the heat of the afternoon.
              </p>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                <span className="font-display font-bold text-primary">↗ +450 Fandom XP</span>
                <button className="text-sm font-black text-secondary">View Proof</button>
              </div>
            </article>

            <article className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#0d131b]/70 p-5 sm:flex-row">
              <div className="flex h-28 w-32 shrink-0 flex-col items-center justify-center rounded-xl bg-white/10 font-display text-2xl font-black text-primary">
                IND <span className="text-xs font-medium text-on-surface-variant">VS</span> AUS
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-neon-green">Saved Classic</span>
                <h3 className="font-display font-black text-primary">2023 WTC Final - Day 4</h3>
                <p className="text-sm text-on-surface-variant">
                  Personal note: The tactical battle between Smith and Jadeja was world-class.
                </p>
                <div className="flex gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-primary">Highlights</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-primary">Stats</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

function Chip({ children, dotClass }: { children: React.ReactNode; dotClass: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-primary">
      <span className={`h-3 w-3 rounded-full ${dotClass}`} />
      {children}
    </span>
  )
}

function Action({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex items-center gap-1.5 hover:text-neon-green">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {label}
    </button>
  )
}
