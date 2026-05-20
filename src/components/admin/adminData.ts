export type AdminTab = 'grounds' | 'players' | 'tournaments' | 'summaries' | 'matchups'

export type AdminRow = {
  id: string
  [key: string]: string
}

export type Column = {
  key: string
  label: string
}

export type CricketFormat = 'Test' | 'ODI' | 'T20' | 'IPL'

export type SummaryTable = Record<string, Record<CricketFormat, string>>

export type PlayerProfile = {
  id: string
  name: string
  country: string
  born: string
  birthPlace: string
  height: string
  role: string
  team: string
  battingStyle: string
  bowlingStyle: string
  availableTournamentIds: string[]
  battingSummary: SummaryTable
  bowlingSummary: SummaryTable
}

export const cricketFormats: CricketFormat[] = ['Test', 'ODI', 'T20', 'IPL']

export const battingMetrics = [
  'Matches',
  'Innings',
  'Runs',
  'Balls',
  'Highest',
  'Average',
  'SR',
  'Not Out',
  'Fours',
  'Sixes',
  'Ducks',
  '50s',
  '100s',
  '200s',
  '300s',
  '400s',
]

export const bowlingMetrics = ['Matches', 'Innings', 'Balls', 'Runs', 'Maidens', 'Wickets', 'Avg', 'Eco', 'SR', 'BBI', 'BBM', '4w', '5w', '10w']

export const tabs: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'grounds', label: 'Grounds', icon: 'stadium' },
  { id: 'players', label: 'Players', icon: 'groups' },
  { id: 'tournaments', label: 'Cricket Tournaments', icon: 'emoji_events' },
  { id: 'summaries', label: 'Match Summary', icon: 'format_list_bulleted' },
  { id: 'matchups', label: 'Matchups', icon: 'swords' },
]

export const groundColumns: Column[] = [
  { key: 'name', label: 'Ground' },
  { key: 'city', label: 'City' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'pitch', label: 'Pitch Type' },
  { key: 'status', label: 'Status' },
]

export const tournamentColumns: Column[] = [
  { key: 'name', label: 'Tournament' },
  { key: 'format', label: 'Format' },
  { key: 'season', label: 'Season' },
  { key: 'teams', label: 'Teams' },
  { key: 'status', label: 'Status' },
]

export const matchupColumns: Column[] = [
  { key: 'batter', label: 'Batter' },
  { key: 'bowler', label: 'Bowler' },
  { key: 'runs', label: 'Runs' },
  { key: 'balls', label: 'Balls' },
  { key: 'dismissals', label: 'Dismissals' },
  { key: 'edge', label: 'Analysis' },
]

export const initialGrounds: AdminRow[] = [
  { id: 'g1', name: 'Wankhede Stadium', city: 'Mumbai', capacity: '33,108', pitch: 'Batting / Dew', status: 'Active' },
  { id: 'g2', name: 'M. Chinnaswamy Stadium', city: 'Bengaluru', capacity: '40,000', pitch: 'Flat / High scoring', status: 'Active' },
  { id: 'g3', name: 'Chepauk', city: 'Chennai', capacity: '38,200', pitch: 'Spin friendly', status: 'Maintenance' },
]

export const initialTournaments: AdminRow[] = [
  { id: 't1', name: 'Indian Premier League', format: 'T20', season: '2026', teams: '10', status: 'Live' },
  { id: 't2', name: 'World Test Championship', format: 'Test', season: '2025-27', teams: '9', status: 'Scheduled' },
  { id: 't3', name: 'Asia Cup', format: 'T20I', season: '2026', teams: '8', status: 'Draft' },
]

export const initialMatchups: AdminRow[] = [
  { id: 'm1', batter: 'Virat Kohli', bowler: 'Mitchell Starc', runs: '148', balls: '112', dismissals: '4', edge: 'Early swing risk; strong death-over scoring' },
  { id: 'm2', batter: 'Rohit Sharma', bowler: 'Pat Cummins', runs: '96', balls: '74', dismissals: '3', edge: 'Hard length creates false shots' },
  { id: 'm3', batter: 'Ravindra Jadeja', bowler: 'Adam Zampa', runs: '82', balls: '52', dismissals: '1', edge: 'Batter advantage against leg-spin' },
]

export function createSummary(metrics: string[], defaults?: Record<string, Partial<Record<CricketFormat, string>>>): SummaryTable {
  return Object.fromEntries(
    metrics.map((metric) => [
      metric,
      {
        Test: defaults?.[metric]?.Test ?? '0',
        ODI: defaults?.[metric]?.ODI ?? '0',
        T20: defaults?.[metric]?.T20 ?? '0',
        IPL: defaults?.[metric]?.IPL ?? '0',
      },
    ]),
  ) as SummaryTable
}

export function createEmptyPlayer(): PlayerProfile {
  return {
    id: `player-${Date.now()}`,
    name: '',
    country: '',
    born: '',
    birthPlace: '',
    height: '',
    role: '',
    team: '',
    battingStyle: '',
    bowlingStyle: '',
    availableTournamentIds: [],
    battingSummary: createSummary(battingMetrics),
    bowlingSummary: createSummary(bowlingMetrics),
  }
}

export const initialPlayers: PlayerProfile[] = [
  {
    id: 'p1',
    name: 'Virat Kohli',
    country: 'India',
    born: 'November 05, 1988 (37 years)',
    birthPlace: 'Delhi',
    height: '5 ft 9 in (175 cm)',
    role: 'Batsman',
    team: 'RCB',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm medium',
    availableTournamentIds: ['t1', 't2', 't3'],
    battingSummary: createSummary(battingMetrics, {
      Matches: { Test: '123', ODI: '311', T20: '125', IPL: '280' },
      Innings: { Test: '210', ODI: '299', T20: '117', IPL: '272' },
      Runs: { Test: '9230', ODI: '14797', T20: '4188', IPL: '9203' },
      Balls: { Test: '16608', ODI: '15771', T20: '3056', IPL: '6848' },
      Highest: { Test: '254', ODI: '183', T20: '122', IPL: '113' },
      Average: { Test: '46.85', ODI: '58.72', T20: '48.7', IPL: '40.19' },
      SR: { Test: '55.58', ODI: '93.83', T20: '137.05', IPL: '134.39' },
      'Not Out': { Test: '13', ODI: '47', T20: '31', IPL: '43' },
      Fours: { Test: '1027', ODI: '1376', T20: '369', IPL: '828' },
      Sixes: { Test: '30', ODI: '169', T20: '124', IPL: '312' },
      Ducks: { Test: '15', ODI: '18', T20: '7', IPL: '12' },
      '50s': { Test: '31', ODI: '77', T20: '38', IPL: '67' },
      '100s': { Test: '30', ODI: '54', T20: '1', IPL: '9' },
      '200s': { Test: '7', ODI: '0', T20: '0', IPL: '0' },
    }),
    bowlingSummary: createSummary(bowlingMetrics, {
      Matches: { Test: '123', ODI: '311', T20: '125', IPL: '280' },
      Innings: { Test: '11', ODI: '50', T20: '13', IPL: '26' },
      Balls: { Test: '175', ODI: '662', T20: '152', IPL: '251' },
      Runs: { Test: '84', ODI: '680', T20: '204', IPL: '368' },
      Maidens: { Test: '2', ODI: '1', T20: '0', IPL: '0' },
      Wickets: { Test: '0', ODI: '5', T20: '4', IPL: '4' },
      Avg: { Test: '0.0', ODI: '136.0', T20: '51.0', IPL: '92.0' },
      Eco: { Test: '2.88', ODI: '6.16', T20: '8.05', IPL: '8.8' },
      SR: { Test: '0.0', ODI: '132.4', T20: '38.0', IPL: '62.75' },
      BBI: { Test: '0/0', ODI: '1/13', T20: '1/13', IPL: '2/25' },
      BBM: { Test: '0/0', ODI: '1/13', T20: '1/13', IPL: '2/25' },
    }),
  },
  {
    id: 'p2',
    name: 'Jasprit Bumrah',
    country: 'India',
    born: 'December 06, 1993 (32 years)',
    birthPlace: 'Ahmedabad',
    height: '5 ft 10 in (178 cm)',
    role: 'Fast Bowler',
    team: 'MI',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm fast',
    availableTournamentIds: ['t1', 't2'],
    battingSummary: createSummary(battingMetrics, { Matches: { Test: '45', ODI: '89', T20: '70', IPL: '145' } }),
    bowlingSummary: createSummary(bowlingMetrics, { Matches: { Test: '45', ODI: '89', T20: '70', IPL: '145' }, Wickets: { Test: '205', ODI: '149', T20: '89', IPL: '183' } }),
  },
  {
    id: 'p3',
    name: 'Ravindra Jadeja',
    country: 'India',
    born: 'December 06, 1988 (37 years)',
    birthPlace: 'Navagam-Khed',
    height: '5 ft 7 in (170 cm)',
    role: 'All-rounder',
    team: 'CSK',
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Left-arm orthodox',
    availableTournamentIds: ['t1', 't2', 't3'],
    battingSummary: createSummary(battingMetrics, { Matches: { Test: '80', ODI: '204', T20: '74', IPL: '254' }, Runs: { Test: '3370', ODI: '2806', T20: '515', IPL: '3260' } }),
    bowlingSummary: createSummary(bowlingMetrics, { Matches: { Test: '80', ODI: '204', T20: '74', IPL: '254' }, Wickets: { Test: '323', ODI: '231', T20: '54', IPL: '170' } }),
  },
]

export const matchSummaries = [
  {
    id: 'ms1',
    match: 'RCB vs MI',
    venue: 'Wankhede Stadium',
    date: '20 May 2026',
    result: 'RCB won by 12 runs',
    score: 'RCB 198/6 • MI 186/8',
    balls: [
      ['19.6', '6', 'Kohli clears deep mid-wicket after holding shape against the slower ball.'],
      ['19.5', '2', 'Driven into the cover pocket; smart running converts one into two.'],
      ['19.4', 'W', 'Wide yorker squeezed to point. Direct hit catches the non-striker short.'],
      ['19.3', '4', 'Full and on pads; whipped behind square with perfect timing.'],
      ['19.2', '0', 'Bumrah nails the blockhole. Dot ball under pressure.'],
      ['19.1', '1', 'Low full toss worked to long-on. Kohli keeps strike rotation alive.'],
    ],
  },
  {
    id: 'ms2',
    match: 'CSK vs KKR',
    venue: 'Chepauk',
    date: '18 May 2026',
    result: 'CSK won by 5 wickets',
    score: 'KKR 164/8 • CSK 168/5',
    balls: [
      ['17.6', '4', 'Jadeja rocks back and cuts through backward point.'],
      ['17.5', '1', 'Shorter length tucked softly into the leg side.'],
      ['17.4', 'W', 'Slider beats the sweep and crashes into middle stump.'],
      ['17.3', '0', 'Good length grips and turns past the outside edge.'],
    ],
  },
]
