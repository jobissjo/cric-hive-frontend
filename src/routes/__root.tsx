import { Link, Outlet, ScrollRestoration, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import appCss from '../styles.css?url'
import { useLiveMatch } from '../hooks/useCricketData'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'CricHive | Premium Cricket Social & AI Predictions' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' },
    ],
  }),
  shellComponent: Shell,
})

function Shell({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>{children}</RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // Mobile search toggle
  const [searchFocused, setSearchFocused] = useState(false)
  
  // Parallax parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      const stadium = document.getElementById('stadium-bg')
      if (stadium) {
        stadium.style.transform = `scale(1.1) translate(${x * 12}px, ${y * 12}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden custom-scrollbar pb-16 md:pb-0">
        
        {/* Ambient Stadium Parallax Background */}
        <div className="fixed inset-0 z-0 opacity-15 pointer-events-none transition-transform duration-300 ease-out" id="stadium-bg">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3MnnHFaHD2FRICUApb5GLRtrqSEy1vk75h17MIRT-Sxoo5z39693sqWQM4rm9kWIGEdNZxV7JiI9qMPL5nCr1koR41dn1enAroG7vItx-kw3VNcM4Pz-QbtBsX2_ZrL7QeyIE2FoPbP8-j4ep4FNRuLNbus-SioyR1kvpQvkzkibfsUA8rtVLenjoT-dMTQwMoGvMTkf3AVpbInqFDfnOVFplWij5dgThCyEmeTcL-6vOZb8InbWNMXufQtkeNSEDAdNtDnJlTmI" 
            alt="Cricket Stadium floodlights"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest" />
        </div>

        {/* Global Layout Grid */}
        <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
          
          {/* SideNavBar Layout (Hidden on Mobile) */}
          <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface/80 backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col py-lg px-md gap-base z-40 hidden md:flex">
            <div className="mb-lg px-2 flex flex-col gap-xs">
              <h1 className="font-display text-3xl font-black text-primary tracking-tighter">CricHive</h1>
              <p className="font-label-sm text-xs text-on-surface-variant/70 uppercase tracking-widest">Premium Cricket Social</p>
            </div>
            
            <nav className="flex flex-col gap-xs flex-1">
              <Link 
                to="/" 
                className="flex items-center gap-sm px-md py-sm rounded-xl text-on-surface-variant hover:text-neon-green hover:bg-neon-green/5 hover:translate-x-0.5 transition-all duration-200"
                activeProps={{ className: 'flex items-center gap-sm px-md py-sm rounded-xl text-neon-green font-bold border-r-4 border-neon-green bg-neon-green/10' }}
                activeOptions={{ exact: true }}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="font-label-md text-label-md">Home</span>
              </Link>
              
              <Link 
                to="/feed" 
                className="flex items-center gap-sm px-md py-sm rounded-xl text-on-surface-variant hover:text-neon-green hover:bg-neon-green/5 hover:translate-x-0.5 transition-all duration-200"
                activeProps={{ className: 'flex items-center gap-sm px-md py-sm rounded-xl text-neon-green font-bold border-r-4 border-neon-green bg-neon-green/10' }}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="font-label-md text-label-md">Feed</span>
              </Link>
              
              <Link 
                to="/matches" 
                className="flex items-center gap-sm px-md py-sm rounded-xl text-on-surface-variant hover:text-neon-green hover:bg-neon-green/5 hover:translate-x-0.5 transition-all duration-200"
                activeProps={{ className: 'flex items-center gap-sm px-md py-sm rounded-xl text-neon-green font-bold border-r-4 border-neon-green bg-neon-green/10' }}
              >
                <span className="material-symbols-outlined">sports_cricket</span>
                <span className="font-label-md text-label-md">Matches</span>
              </Link>
              
              <Link 
                to="/predictions" 
                className="flex items-center gap-sm px-md py-sm rounded-xl text-on-surface-variant hover:text-neon-green hover:bg-neon-green/5 hover:translate-x-0.5 transition-all duration-200"
                activeProps={{ className: 'flex items-center gap-sm px-md py-sm rounded-xl text-neon-green font-bold border-r-4 border-neon-green bg-neon-green/10' }}
              >
                <span className="material-symbols-outlined">query_stats</span>
                <span className="font-label-md text-label-md">Predictions</span>
              </Link>

              
              <div className="opacity-50 pointer-events-none mt-2">
                <div className="flex items-center gap-sm px-md py-sm rounded-xl text-on-surface-variant">
                  <span className="material-symbols-outlined">groups</span>
                  <span className="font-label-md text-label-md">Communities</span>
                </div>
              </div>
            </nav>

            <Link 
              to="/feed" 
              className="w-full bg-neon-green text-black font-bold py-sm rounded-xl hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all active:scale-[0.98] text-center"
            >
              Create Post
            </Link>

            <div className="mt-auto flex items-center gap-sm pt-md border-t border-white/5">
              <Link to="/profile" className="flex items-center gap-sm w-full hover:bg-neon-green/5 rounded-xl px-sm py-xs">
                <img
                  alt="Profile avatar"
                  className="w-10 h-10 rounded-full border border-primary/20 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtA5hTcX3SQLPzQLmJ7u0jjENR40XNuI_cqbJbCHRXih623sMuWk6ng1WEkjy11DiajJ5el445dwymFx6ouWLk6fb0I3t2Cegb6_kpFZFpJiCcFipVgANiXsGOWw0Uj8gjWrNZtUwUjrkJGuJmFwqprF3RTp1-k3vR2UisWoTDP2cSdWXQiyUlCrDknXy3VYkdNChHWYmA9d-QaMYv1Mz__4sOMMcbsAgAoPN-FNQ3WzMEDx8l0tbMjZKTX3_uyQoNOFT3CppKfGs"
                />
                <div className="flex-1 text-left">
                  <div className="font-label-md text-label-md font-semibold text-on-surface">Your Name</div>
                  <div className="text-xs text-on-surface-variant">View profile</div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </Link>
            </div>
          </aside>
          
          {/* Main Outlet & Topbar Frame */}
          <div className="flex-1 flex flex-col md:ml-[280px]">
            
            {/* Topbar Layout */}
            <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
              <div className="flex items-center gap-md flex-1">
                <div className={`relative ${searchFocused ? 'w-full' : 'w-64'} transition-all duration-350 hidden sm:block`}>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input 
                    type="text" 
                    placeholder="Search CricHive..." 
                    className="w-full bg-[#05070A] border-none rounded-full pl-10 pr-md py-xs text-sm text-on-surface focus:ring-1 focus:ring-secondary-fixed outline-none"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                <h2 className="font-display font-black text-2xl text-primary md:hidden">CricHive</h2>
              </div>
              
              <div className="flex items-center gap-md">
                
                {/* Live Match Ticker in Header */}
                <HeaderTicker />
                
                <div className="flex gap-sm border-l border-white/10 pl-md items-center">
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">settings</button>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">help</button>
              <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                <img 
                  alt="User avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2LzMwBGyYjULFR4NWgeLD1eIPFhrwhirQQHuXdemG9H8Cwp2W-Fqkgsz2X5SXsn4PcsHkLBKlbV9i6OmXIGcjHS8Nz9pIhOx2AdW3sjDwReeKhft_Yd_FS6ay0RDfTRnyqEOMBFc5LiK2nTDNA-vuMzKbUDf8dkQ8wF1TL7_OLBnvr48jeJivO4FjdOxHqYGeESXS3u3uW-JEz1EQgbWaq1b7wfAYUY3MKIj-yZ6PaFbtTh21_Zy-VhRa84ZyRzBnRsMXN_5hTW8"
                />
              </Link>
                </div>
              </div>
            </header>
            
            {/* Pages Mount Point */}
            <main className="flex-1 min-h-[calc(100vh-5rem)]">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation (Hidden on desktop) */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around md:hidden z-40">
          <Link to="/" className="flex flex-col items-center gap-xs text-on-surface-variant" activeProps={{ className: 'text-primary' }} activeOptions={{ exact: true }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          </Link>
          <Link to="/feed" className="flex flex-col items-center gap-xs text-on-surface-variant" activeProps={{ className: 'text-primary' }}>
            <span className="material-symbols-outlined">rss_feed</span>
          </Link>
          <Link to="/matches" className="flex flex-col items-center gap-xs text-on-surface-variant" activeProps={{ className: 'text-primary' }}>
            <span className="material-symbols-outlined">sports_cricket</span>
          </Link>
          <Link to="/predictions" className="flex flex-col items-center gap-xs text-on-surface-variant" activeProps={{ className: 'text-primary' }}>
            <span className="material-symbols-outlined">query_stats</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-xs text-on-surface-variant" activeProps={{ className: 'text-primary' }}>
            <span className="material-symbols-outlined">person</span>
          </Link>
        </nav>

        {/* Floating post trigger for Mobile / Desktop */}
        <Link 
          to="/feed" 
          className="fixed bottom-20 right-margin-mobile md:bottom-lg md:right-lg w-14 h-14 bg-neon-green text-black rounded-full shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform group"
        >
          <span className="material-symbols-outlined font-black">add</span>
          <span className="absolute right-16 bg-surface-container-highest text-primary px-sm py-xs rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">New Discussion</span>
        </Link>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

// Sub-component for matching layout reactive updates
function HeaderTicker() {
  const { data: liveMatch } = useLiveMatch()

  if (!liveMatch) {
    return (
      <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-full border border-white/5">
        <span className="w-2 h-2 rounded-full bg-white/20 live-pulse"></span>
        <span className="text-xs font-semibold text-on-surface-variant">Connecting Match Engine...</span>
      </div>
    )
  }

  return (
    <Link 
      to="/matches" 
      className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-neon-green live-pulse"></span>
      <span className="text-xs font-bold text-on-surface tracking-wide uppercase">
        {liveMatch.team1.shortName} vs {liveMatch.team2.shortName} • {liveMatch.team1.score}/{liveMatch.team1.wickets} ({liveMatch.team1.overs})
      </span>
    </Link>
  )
}
