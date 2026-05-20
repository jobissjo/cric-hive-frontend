export interface Team {
  shortName: string
  fullName: string
  score: number
  wickets: number
  overs: string
  logoColor: string
}

export interface LiveMatch {
  id: string
  title: string
  venue: string
  team1: Team
  team2: Team
  target?: number
  crr?: number
  momentumData: number[]
  recentBalls: string[]
  currentBatsman: {
    name: string
    stats: string
  }
  currentBowler: {
    name: string
    stats: string
  }
}

export interface Commentary {
  id: string
  ball: string
  tag: 'RUN' | 'WICKET' | 'FOUR' | 'SIX' | 'DOT' | 'OTHER'
  tagValue: string
  description: string
}

export interface Post {
  id: string
  author: string
  avatar: string
  handle: string
  time: string
  content: string
  likes: number
  liked?: boolean
  comments: number
  shares: number
  image?: string
  isOfficial?: boolean
  poll?: {
    id: string
    question: string
    options: {
      text: string
      percentage: number
      borderLeft: string
    }[]
    votedIndex?: number
  }
}

export interface Duel {
  id: string
  player1: { name: string; avatar: string; border: string }
  player2: { name: string; avatar: string; border: string }
  rating: string
  ratingColor: string
  metric: string
  metricLabel: string
  edgePercentage: number
  edgeTeam: string
  description: string
}

export interface PredictionMetrics {
  winProbability: number
  confidence: number
  pitchRating: string
  humidityFactor: string
  streak: string
  duels: Duel[]
  expertInsights: {
    id: string
    name: string
    avatar: string
    badge: string
    comment: string
  }[]
}

// In-Memory/LocalStorage storage keys
const STORAGE_KEYS = {
  LIVE_MATCH: 'crichive_live_match',
  COMMENTARY: 'crichive_commentary',
  POSTS: 'crichive_posts',
  PREDICTIONS: 'crichive_predictions',
}

const initialLiveMatch: LiveMatch = {
  id: 'CSK-MI-32',
  title: 'Live • Match 32',
  venue: 'Wankhede Stadium, Mumbai',
  team1: {
    shortName: 'CSK',
    fullName: 'Super Kings',
    score: 184,
    wickets: 4,
    overs: '18.2',
    logoColor: '#FFD700',
  },
  team2: {
    shortName: 'MI',
    fullName: 'Mumbai Indians',
    score: 0,
    wickets: 0,
    overs: '0',
    logoColor: '#004BA0',
  },
  momentumData: [80, 20, 50, 30, 70, 10],
  recentBalls: ['1', '4', 'W', '0', '6', 'wd', '2'],
  currentBatsman: {
    name: 'R. Jadeja*',
    stats: '42(24)',
  },
  currentBowler: {
    name: 'J. Bumrah',
    stats: '3.2-0-28-2',
  },
}

const initialCommentaries: Commentary[] = [
  {
    id: 'c1',
    ball: '19.6',
    tag: 'SIX',
    tagValue: '6',
    description: 'Slower ball short of a length, Kohli waits for it and launches it high over deep mid-wicket. The crowd erupts as it clears the boundary by twenty rows! Pure dominance.',
  },
  {
    id: 'c2',
    ball: '19.4',
    tag: 'WICKET',
    tagValue: 'W',
    description: 'Full toss outside off, Pandya slices it straight to third man. Starc makes no mistake. A crucial breakthrough at the death.',
  },
  {
    id: 'c3',
    ball: '19.3',
    tag: 'RUN',
    tagValue: '1',
    description: 'Tucked away to fine leg for a quick run. Kohli moves to 94*.',
  },
  {
    id: 'c4',
    ball: '19.2',
    tag: 'DOT',
    tagValue: '0',
    description: 'Beaten for pace. Cummins hits the deck hard, Kohli swings and misses.',
  },
]

const initialPosts: Post[] = [
  {
    id: 'p1',
    author: 'Harsha Bhogle (Official)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBOj0Dn5vo4Ger2opQjbnH6aOip7pfz6lrNiWqJSQkApsXNYoRG59VRHyqdjkH2xzLqC0Zyq5Cm2grh4RB9SQ4KYfh66TAPhKXt9v2HFt_gnKqHEFpKivjjtp1og9H5fc5K_rqlxByAkKmDyGKWx5AkDofomPl_VhIBV-F1SBP_HA51HVVbqmtNzM1bCn6QHZOsZghlz0lV_MPTrSOFlC-2sg-ESUwDdifsopWrkFKfvgghln7ImBpjjRtKgeoLeaql86JZxGcqQ',
    handle: '@bhogle_official',
    time: '2 hours ago',
    content: "Jadeja's acceleration in the last two overs has been nothing short of phenomenal. MI's death bowling is under serious pressure here. Is 210 on the cards? #IPL2026 #CSKvsMI",
    likes: 2420,
    comments: 482,
    shares: 112,
    isOfficial: true,
  },
  {
    id: 'p2',
    author: 'Aakash Deep',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrzwfcmPhyYCgFQOKqnFnohqDF7BQbzTsdxEi09M1VDJz7qpFoXwm8Nl6ApRqhSbM8NdONaF94o3J5VSYABKKb7OnpFPOtfsUJOaG4AUtzEXQC8XssmqTIuM0mRaWQm9Ub8VEV_oMHrbI6XaGC1LmTyfxLSqXXeQCW6_mdhwpHGQOWB3bEvxDu2gBN9wWC-Oh0xdZYEEmffY_8gHsMQtItFNbbsKz_OKTBcuBokEqq3kFIJhei6mR3Id__kFkTBptctl-ulPoSW0Q',
    handle: '@aakash_analyst',
    time: '2h ago',
    content: 'The tactical shift from the Australians in the second session was masterclass. Using the short ball barrage on this Sydney deck has really unsettled the middle order. Thoughts on the upcoming spell? 🏏🔥',
    likes: 1200,
    comments: 84,
    shares: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ONXG76Te5gsZs0iFjJxnY2sd0qBv2J_09fsiv5fCVDlz6KsGkdpY54SdaiRuEI8elXBXvHjbXq2GCV8QFSusx_lIj0pyvCpQv7sA_61_llen_XPm6mGA0s4fNwxUA-J474Y20fPE6Tmgby9BGv3mKfm5wsF8Kh3-X-GawgjcDdEFZtMWwSOMXsWv_J-jglq9_YwHreOFiDd0vL4qLDhQjZ3y2464Dz0F7qfQ5vDCujiPMs4fCofD0uZzFLbaZFuT1j5alW-LLpA',
    isOfficial: true,
  },
  {
    id: 'p3',
    author: 'CricHive Insights',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNshAenX4IjWcapYT_JZnJsSK-2bivKsHY0B2oorY--eAreBYfOcdJKjPwCXK_-xFfUZN4lGUQ-uUHY6cU8jxOSW9PRbEmbOPOdY_IEMB7BOtW8DE75h22OfCe0TAaRNKWhUtyGp-DaacINWIWh5kBsw28NjgCF_Q1hd-8YEAt5uD0Krq_LKA30TVNNwKYaU79OCTxs_FmElFpRohoEu6jkMJaMQgqd0tLsgs0th0vu86A7GuZJlW2XJzKoaV6ZGtgJtSKwIU26MQ',
    handle: '@crichive',
    time: '15m ago',
    content: 'PREDICT THE OUTCOME ⚡ India needs 12 runs in the last over. Starc is at the bowling mark. What\'s your call?',
    likes: 4800,
    comments: 312,
    shares: 98,
    isOfficial: true,
    poll: {
      id: 'poll1',
      question: 'Starc vs India last over',
      options: [
        { text: 'India Wins (Six to finish)', percentage: 42, borderLeft: '#00DAF3' },
        { text: 'Australia Defends (Starc Special)', percentage: 58, borderLeft: '#CCFF00' },
      ],
    },
  },
  {
    id: 'p4',
    author: 'The Googly Merchant',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHnAIpvCZO--rXjvgr9_WBocYnCCfUdk7JxDbLnWFC_EvY3fvmQ2oQXnWwfDo_iF8RTLj6Vx9KCrIXNl_VrKFeL73uzlOFGC6BN3aEjSuaU0VwGIxfSNsYVXkOCjnUiAqzC9UbiEywVjg8ljkCUT2nJsaurtbh8C7uRGDIdk2goWqqZixgqJ7o6f-1NQ9122bpsuwythOa7aSA6Laz_l_4E7-GJGIr0yB7tJgPPPwz_ZuDkA6D0dNMgJX7XQKpR6KhGSSJ6zuK1tM',
    handle: '@googly_memes',
    time: '45m ago',
    content: "Watching DRS visual when you are obviously out is a pure cricket state of mind.",
    likes: 2100,
    comments: 450,
    shares: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPoRdZVU6aX6pJohCOLQ2aIBqUuc0VsycvZMRrLljYWdWvAcDS1f21NOt_CydLXzm16TmWHuBmacp-XkOMZAAsDUU0CGXQ0w4LU8Ye8ekj-X7nzNh8ED1lcl1Q73eYg5zKN0UeM5CJP9WgbGhdeS1BbZ2rGwy3n3UJE7_iqrfjD9z0V61StqKPSNJ7k8JAOGmTXiSGYTTtMP3AGVGMHF7WIkynrnjxia4aKv7tRmCCMLVJzZOOabqOYlRC2SXpKiJoJ7OftcL-H9Y',
  },
]

const initialPredictions: PredictionMetrics = {
  winProbability: 75,
  confidence: 75,
  pitchRating: '4.2 / 5.0 (Batting)',
  humidityFactor: '+12% Swing Opt.',
  streak: '9/10 Correct',
  duels: [
    {
      id: 'd1',
      player1: { name: 'V. Kohli', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRGIJcjCOkX05MsbT7g24nQ16t_wM3qxazrD6EvnrzK57eetp7a9eqJTivkjeS_h9g1RuedfhAiDQIAqgh0d3KWCK0y7tTdJ27mTPZeTJzjYQNmZ1cngt4l_84B3_8IVHXBuZmcv8FZJ7ggXcBuLAcwNuzLxAJqRkjJRsY2pNc9jYfgduQPmjPoyK0jWZiHcBqgerl3bCuo72aMaXwdYRIMlrN4123XzY2IpXkul_Z2Z8dWiFK7YN7dxYW3TUj6uoXGFl_rMyY3hY', border: '#CCFF00' },
      player2: { name: 'M. Starc', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1M2MRSadKCj3AbScwTGvSknBdKedSZ5CSii4BUA_lWFDOYzaMbhdH0C9PfsMKLehw-QsJEKbl1mw0kLR4YoeMzp2k-t5zeNgtODE8Sc1AIZr5EegJjnamwC_yl3x6etXS6SRgLmztgoGqAkibasCcoedz66S3fxf5c62zoJndwO6ohv4bNkMX6xKkU6MyTN2Qr4aTvCZ2js6wQyHnRq6mIBgifEPOwNk0aA_-KQ_flYEeVgAnZZGoTGUJseN2rQpx-AN2aRXCVLQ', border: '#00DAF3' },
      rating: 'High Risk',
      ratingColor: '#CCFF00',
      metric: '68% Edge IND',
      metricLabel: 'Kohli vs Starc',
      edgePercentage: 68,
      edgeTeam: 'IND',
      description: 'Starc has dismissed Kohli 4 times in the last 12 meetings. Historical average: 34.5.',
    },
    {
      id: 'd2',
      player1: { name: 'R. Sharma', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm9ZH22tQ05uS6OwnMBXXw2ggMD1a0DxjiG1iW8FmFDY0jlcJp6mXT4BIuj8lG0VpJmkz-9nToxTpj10uxdZhZxTKOIVcob5FPiz1tRsOZ9XSoUcaxKTmzxHpQk8Lxa70xdmD26eE0RYoZBiY-J6FoiH0x2O-uwg41P1FWw4IYlCccPki-pcUB3q9xeZka3-TmjovL8Ymtn81bd7PaxtIGWYzzwxVYcOxxC6RCFdOo7e2ydHTvptOybm01CJCxFRcJPGXxXyQodmo', border: '#CCFF00' },
      player2: { name: 'P. Cummins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn9q1xpzplsgzFe9smAB1GVjRqodw7brjZSxP4Jbr9BnKXf53ITTbFTdfSW-zIDNJ9xmlue-SUoNuSxduEaqTHyB_cB_h-tFGsfHXi6ozPVep74dl1m_7a5wSiQsvi622blfmzZnZd_KrfojL1Z5jv7eBT0cBxpBihx0igK3foWBPP8OBPa6jmIQnM8oWb7k4hssHfhfczDlVxfmundD2pugMdbNM4SPICrC41BibJ93UWFjslpnIZvFyolIaAKLuyBrtrD-c0On8', border: '#00DAF3' },
      rating: 'Balanced',
      ratingColor: '#00DAF3',
      metric: '52% Edge AUS',
      metricLabel: 'Rohit vs Cummins',
      edgePercentage: 52,
      edgeTeam: 'AUS',
      description: 'Extreme strike-rate variance (140.2) in powerplay vs Cummins\' hard length bowling.',
    },
    {
      id: 'd3',
      player1: { name: 'R. Jadeja', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUnaPe8YtrE-dE6vyf5v4C7Q-sXfH3DAaQK9QD-f6L9pO_XKYWQIh-WUQ0g_rdsxiIp28SOYJbj6Fh3KMIcVcllx6G7QBQZ1XZddjYKsT_HvCgJAurshxwvZjApLjlqMgmfOC3dxGGTaeh87Yi7PPcwoHpgD7qsXkaaaDHwb8EDiOkqe5tCgXnI1UmauXdBqtzyo1zJI3Py8IcK8OxUjGl8GWSZnFnzNtZ5vL6RHf9-XpPrMZQG_-FMVboFGkDYICiaHY7SAg8r7U', border: '#CCFF00' },
      player2: { name: 'A. Zampa', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1KprAUGoqRGyDVjf1nSYf1VSWQN4FPEQcJwVbEQoOcvteIgGBJmsoJd_YK43shbt11MzqahDBN-ENQQwotvh3q0WXuV61q8kLNHUW_Zod1vjXNqahwo3K2Hmvv5o68Ooh3PgP0y1he2mWuOqNYr3xik0691-MWTsTyq-P2jkPpzwAVtOBZS0UBeGMoa_zaFSmR9XtzWp0rfoQHDUnRUPnDpfCmzBSEJvrQo7HpaUIYV9-XomTu4v1yzpJOH_b6t7uawSJOglRURk', border: '#00DAF3' },
      rating: 'High Favor',
      ratingColor: '#CCFF00',
      metric: '81% Edge IND',
      metricLabel: 'Jadeja vs Zampa',
      edgePercentage: 81,
      edgeTeam: 'IND',
      description: 'Jadeja strikes at 158.4 against leg-spin in the death overs. Dominant pairing.',
    },
  ],
  expertInsights: [
    {
      id: 'e1',
      name: 'Alex Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4nMvBD-CO9NBBBtm7WLBNXuvVXjg9tmIAIVar6aEkEf4wC6czX5SlMXlcMl1Bcp5t2_01e6fkBQOL6HCkexzyI1nCf5RkjliAeWef7ZaL4UEClvQuQYw6PHbZd8uRVPg-1eG-7FsBAF5ojY8WtCa6evZZhm3sIP-KUkYYv309pHPEvXFUCZtypmY0u_dT7pISd_ZyNQUS03uw2gONT7taCLmw2yf65mCgoHO5KgJ2VsrsZk3M3kaNYajg3QdgvGwtqQ3yCS8M1s',
      badge: 'Top Predictor',
      comment: "Models suggesting Australia struggles against left-arm wrist spin at this venue. Watch Kuldeep's middle overs carefully.",
    },
    {
      id: 'e2',
      name: 'Sarah Miller',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9W_8seaft-UyWjo609UJQVkP_NfhHx4Q2AXRcf0_BuFsJMnIf7KqtsDXrZ6XQuq1ZHz_ikGD4_WVFCsVFmg1THJdKE_rUKW8tE6_X2OohcLgpLXRjXPG5hg3IisixUUluJ1JUxg1LoF7_CF662Z2pirRsjX0JSvZarAsa4SvenLBgG8VSeEaGGx4UObJCdvOBGmtrE2DI-OpmpOoYdwZB2NBzQipSMAapHLw2aG4q828lPK_RKfzBz8ePpGtqdM5Z5FXnRw2Bzjg',
      badge: 'Stat Guru',
      comment: 'Batting first win rate here is 72%. Toss will be the single biggest decider of tonight\'s ML output.',
    },
  ],
}

// Helpers for localStorage state
function getStored<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial
  const raw = localStorage.getItem(key)
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
  }
  return JSON.parse(raw)
}

function setStored<T>(key: string, data: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

// Simulated network delay
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const mockApi = {
  async getLiveMatch(): Promise<LiveMatch> {
    await delay()
    return getStored<LiveMatch>(STORAGE_KEYS.LIVE_MATCH, initialLiveMatch)
  },

  async getCommentaries(): Promise<Commentary[]> {
    await delay()
    return getStored<Commentary[]>(STORAGE_KEYS.COMMENTARY, initialCommentaries)
  },

  async getFeedPosts(): Promise<Post[]> {
    await delay()
    return getStored<Post[]>(STORAGE_KEYS.POSTS, initialPosts)
  },

  async getPredictions(): Promise<PredictionMetrics> {
    await delay()
    return getStored<PredictionMetrics>(STORAGE_KEYS.PREDICTIONS, initialPredictions)
  },

  async likePost(postId: string): Promise<Post[]> {
    await delay(150)
    const posts = getStored<Post[]>(STORAGE_KEYS.POSTS, initialPosts)
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const liked = !p.liked
        return {
          ...p,
          liked,
          likes: liked ? p.likes + 1 : p.likes - 1,
        }
      }
      return p
    })
    setStored(STORAGE_KEYS.POSTS, updated)
    return updated
  },

  async voteInPoll(pollId: string, optionIndex: number): Promise<Post[]> {
    await delay(200)
    const posts = getStored<Post[]>(STORAGE_KEYS.POSTS, initialPosts)
    const updated = posts.map((p) => {
      if (p.poll && p.id === pollId) {
        if (p.poll.votedIndex !== undefined) return p // already voted
        const options = p.poll.options.map((opt, idx) => {
          if (idx === optionIndex) {
            return { ...opt, percentage: Math.min(opt.percentage + 2, 100) }
          } else {
            return { ...opt, percentage: Math.max(opt.percentage - 2, 0) }
          }
        })
        return {
          ...p,
          poll: {
            ...p.poll,
            options,
            votedIndex: optionIndex,
          },
        }
      }
      return p
    })
    setStored(STORAGE_KEYS.POSTS, updated)
    return updated
  },

  async createPost(content: string): Promise<Post[]> {
    await delay(250)
    const posts = getStored<Post[]>(STORAGE_KEYS.POSTS, initialPosts)
    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: 'V. Kohli',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtA5hTcX3SQLPzQLmJ7u0jjENR40XNuI_cqbJbCHRXih623sMuWk6ng1WEkjy11DiajJ5el445dwymFx6ouWLk6fb0I3t2Cegb6_kpFZFpJiCcFipVgANiXsGOWw0Uj8gjWrNZtUwUjrkJGuJmFwqprF3RTp1-k3vR2UisWoTDP2cSdWXQiyUlCrDknXy3VYkdNChHWYmA9d-QaMYv1Mz__4sOMMcbsAgAoPN-FNQ3WzMEDx8l0tbMjZKTX3_uyQoNOFT3CppKfGs',
      handle: '@KingKohli',
      time: 'Just now',
      content,
      likes: 0,
      comments: 0,
      shares: 0,
    }
    const updated = [newPost, ...posts]
    setStored(STORAGE_KEYS.POSTS, updated)
    return updated
  },
}
