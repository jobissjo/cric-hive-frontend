import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useCommentaries } from '../hooks/useCricketData'

export const Route = createFileRoute('/matches')({ component: MatchesCenter })

type MatchStatus = 'live' | 'recent' | 'upcoming'

interface MatchTeam {
  shortName: string
  fullName: string
  score?: string
  overs?: string
  logoColor: string
}

interface ScoreRow {
  player: string
  runs: string
  balls: string
  fours: string
  sixes: string
  strikeRate: string
}

interface BowlingRow {
  player: string
  overs: string
  maidens: string
  runs: string
  wickets: string
  economy: string
}

interface MatchSummary {
  id: string
  status: MatchStatus
  league: string
  title: string
  venue: string
  startTime: string
  result: string
  note: string
  winProbability?: number
  team1: MatchTeam
  team2: MatchTeam
  recentBalls?: string[]
  scorecard?: {
    battingTeam: string
    batting: ScoreRow[]
    bowlingTeam: string
    bowling: BowlingRow[]
    extras: string
    total: string
    fallOfWickets: string
  }
  predictionOptions: string[]
  keyDetails: string[]
}

const matches: MatchSummary[] = [
  {
    id: 'csk-mi-live',
    status: 'live',
    league: 'IPL 2026',
    title: 'CSK vs MI, Match 32',
    venue: 'Wankhede Stadium, Mumbai',
    startTime: 'Live now',
    result: 'CSK 184/4 after 18.2 overs',
    note: 'Projected score 205. MI need a strong final two overs to control the chase.',
    winProbability: 64,
    team1: {
      shortName: 'CSK',
      fullName: 'Chennai Super Kings',
      score: '184/4',
      overs: '18.2',
      logoColor: '#FFD700',
    },
    team2: {
      shortName: 'MI',
      fullName: 'Mumbai Indians',
      score: 'Yet to bat',
      overs: '',
      logoColor: '#004BA0',
    },
    recentBalls: ['1', '4', 'W', '0', '6', 'wd', '2'],
    scorecard: {
      battingTeam: 'CSK Innings',
      batting: [
        { player: 'R. Jadeja*', runs: '42', balls: '24', fours: '3', sixes: '2', strikeRate: '175.00' },
        { player: 'S. Dube', runs: '38', balls: '21', fours: '2', sixes: '3', strikeRate: '180.95' },
        { player: 'R. Gaikwad', runs: '51', balls: '36', fours: '6', sixes: '1', strikeRate: '141.66' },
      ],
      bowlingTeam: 'MI Bowling',
      bowling: [
        { player: 'J. Bumrah', overs: '3.2', maidens: '0', runs: '28', wickets: '2', economy: '8.40' },
        { player: 'G. Coetzee', overs: '4', maidens: '0', runs: '44', wickets: '1', economy: '11.00' },
        { player: 'P. Chawla', overs: '4', maidens: '0', runs: '31', wickets: '1', economy: '7.75' },
      ],
      extras: '13 (lb 4, wd 9)',
      total: '184/4 (18.2 ov)',
      fallOfWickets: '42/1, 89/2, 126/3, 171/4',
    },
    predictionOptions: ['CSK 205+', 'MI chase it', 'Wicket next over'],
    keyDetails: ['Jadeja attacking hard length', 'Short square boundary: 65m', 'Dew expected in chase'],
  },
  {
    id: 'ind-aus-live',
    status: 'live',
    league: 'T20I Series',
    title: 'India vs Australia, 3rd T20I',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    startTime: 'Live now',
    result: 'AUS need 48 from 30 balls',
    note: 'India are holding a narrow edge with spin available for two more overs.',
    winProbability: 58,
    team1: { shortName: 'IND', fullName: 'India', score: '196/7', overs: '20' , logoColor: '#1d4ed8' },
    team2: { shortName: 'AUS', fullName: 'Australia', score: '149/5', overs: '15.0', logoColor: '#facc15' },
    recentBalls: ['0', '1', '4', '1', 'W', '2'],
    scorecard: {
      battingTeam: 'Australia Chase',
      batting: [
        { player: 'T. David*', runs: '31', balls: '17', fours: '1', sixes: '3', strikeRate: '182.35' },
        { player: 'M. Stoinis*', runs: '18', balls: '12', fours: '2', sixes: '0', strikeRate: '150.00' },
        { player: 'T. Head', runs: '44', balls: '26', fours: '7', sixes: '1', strikeRate: '169.23' },
      ],
      bowlingTeam: 'India Bowling',
      bowling: [
        { player: 'A. Singh', overs: '3', maidens: '0', runs: '27', wickets: '2', economy: '9.00' },
        { player: 'K. Yadav', overs: '3', maidens: '0', runs: '22', wickets: '1', economy: '7.33' },
        { player: 'J. Bumrah', overs: '3', maidens: '0', runs: '21', wickets: '1', economy: '7.00' },
      ],
      extras: '8 (lb 2, wd 6)',
      total: '149/5 (15.0 ov)',
      fallOfWickets: '37/1, 74/2, 106/3, 121/4, 144/5',
    },
    predictionOptions: ['India win', 'Australia win', 'Super over'],
    keyDetails: ['Two overs of pace at the death', 'David strong vs full length', 'Kuldeep has one over left'],
  },
  {
    id: 'eng-sa-recent',
    status: 'recent',
    league: 'ODI Tri-Series',
    title: 'England vs South Africa',
    venue: 'The Oval, London',
    startTime: 'Completed yesterday',
    result: 'South Africa won by 5 wickets',
    note: 'A measured chase after Markram controlled the middle overs.',
    team1: { shortName: 'ENG', fullName: 'England', score: '276/8', overs: '50', logoColor: '#60a5fa' },
    team2: { shortName: 'SA', fullName: 'South Africa', score: '279/5', overs: '48.1', logoColor: '#22c55e' },
    scorecard: {
      battingTeam: 'South Africa Innings',
      batting: [
        { player: 'A. Markram', runs: '88', balls: '94', fours: '8', sixes: '1', strikeRate: '93.61' },
        { player: 'H. Klaasen', runs: '55', balls: '38', fours: '4', sixes: '3', strikeRate: '144.73' },
        { player: 'T. Bavuma', runs: '43', balls: '56', fours: '5', sixes: '0', strikeRate: '76.78' },
      ],
      bowlingTeam: 'England Bowling',
      bowling: [
        { player: 'J. Archer', overs: '10', maidens: '1', runs: '48', wickets: '2', economy: '4.80' },
        { player: 'A. Rashid', overs: '10', maidens: '0', runs: '54', wickets: '2', economy: '5.40' },
        { player: 'S. Curran', overs: '8.1', maidens: '0', runs: '58', wickets: '1', economy: '7.10' },
      ],
      extras: '17 (b 1, lb 5, wd 11)',
      total: '279/5 (48.1 ov)',
      fallOfWickets: '51/1, 118/2, 181/3, 239/4, 262/5',
    },
    predictionOptions: [],
    keyDetails: ['Player of the match: A. Markram', 'England dropped two catches', 'South Africa sealed bonus points'],
  },
  {
    id: 'nz-pak-recent',
    status: 'recent',
    league: 'Test Championship',
    title: 'New Zealand vs Pakistan',
    venue: 'Basin Reserve, Wellington',
    startTime: 'Completed 2 days ago',
    result: 'New Zealand won by 87 runs',
    note: 'Pakistan fought deep into day five before the second new ball broke the game.',
    team1: { shortName: 'NZ', fullName: 'New Zealand', score: '312 & 244', overs: '', logoColor: '#e5e7eb' },
    team2: { shortName: 'PAK', fullName: 'Pakistan', score: '268 & 201', overs: '', logoColor: '#16a34a' },
    scorecard: {
      battingTeam: 'Pakistan 4th Innings',
      batting: [
        { player: 'B. Azam', runs: '73', balls: '142', fours: '9', sixes: '0', strikeRate: '51.40' },
        { player: 'S. Shakeel', runs: '42', balls: '96', fours: '5', sixes: '0', strikeRate: '43.75' },
        { player: 'M. Rizwan', runs: '31', balls: '48', fours: '4', sixes: '0', strikeRate: '64.58' },
      ],
      bowlingTeam: 'New Zealand Bowling',
      bowling: [
        { player: 'T. Southee', overs: '19', maidens: '6', runs: '44', wickets: '3', economy: '2.31' },
        { player: 'M. Henry', overs: '18', maidens: '4', runs: '51', wickets: '4', economy: '2.83' },
        { player: 'A. Patel', overs: '14', maidens: '2', runs: '46', wickets: '2', economy: '3.28' },
      ],
      extras: '11',
      total: '201 all out',
      fallOfWickets: '28/1, 79/2, 124/3, 162/4, 179/5, 201/10',
    },
    predictionOptions: [],
    keyDetails: ['Henry took 4 wickets in final innings', 'New ball swing decided day five', 'NZ climb to second on table'],
  },
  {
    id: 'rcb-kkr-upcoming',
    status: 'upcoming',
    league: 'IPL 2026',
    title: 'RCB vs KKR, Match 33',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    startTime: 'Today, 7:30 PM',
    result: 'Toss in 2h 10m',
    note: 'Small boundaries and a dry center strip make this a powerplay-heavy prediction game.',
    winProbability: 52,
    team1: { shortName: 'RCB', fullName: 'Royal Challengers Bengaluru', logoColor: '#dc2626' },
    team2: { shortName: 'KKR', fullName: 'Kolkata Knight Riders', logoColor: '#7c3aed' },
    predictionOptions: ['RCB win', 'KKR win', 'Most sixes: RCB'],
    keyDetails: ['Average first innings: 191', 'Dew likely after 9 PM', 'Spin economy here: 8.6'],
  },
  {
    id: 'wi-sl-upcoming',
    status: 'upcoming',
    league: 'World Cup Qualifier',
    title: 'West Indies vs Sri Lanka',
    venue: 'Queens Park Oval, Trinidad',
    startTime: 'Tomorrow, 3:00 PM',
    result: 'Match yet to begin',
    note: 'Two aggressive batting units meet on a surface that slows after 30 overs.',
    winProbability: 47,
    team1: { shortName: 'WI', fullName: 'West Indies', logoColor: '#7f1d1d' },
    team2: { shortName: 'SL', fullName: 'Sri Lanka', logoColor: '#1d4ed8' },
    predictionOptions: ['WI win', 'SL win', 'First innings 280+'],
    keyDetails: ['New ball movement early', 'Wrist spin expected to matter', 'Boundary square: 67m'],
  },
]

function MatchesCenter() {
  const { data: commentaries, isLoading: commentaryLoading } = useCommentaries()
  const [activeStatus, setActiveStatus] = useState<MatchStatus>('live')
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id)
  const [predictions, setPredictions] = useState<Record<string, string>>({})

  const selectedMatch = matches.find((match) => match.id === selectedMatchId) ?? matches[0]
  const groupedMatches = useMemo(
    () => matches.filter((match) => match.status === activeStatus),
    [activeStatus],
  )

  const selectStatus = (status: MatchStatus) => {
    setActiveStatus(status)
    setSelectedMatchId(matches.find((match) => match.status === status)?.id ?? matches[0].id)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8 rise-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-primary">Match Center</h1>
          <p className="text-sm text-on-surface-variant">
            Live scores, recent results, upcoming fixtures, full scorecards, and quick prediction games.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-green live-pulse" />
          <span className="font-bold text-primary">Scores updating every 15 seconds</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#05070a]/70 p-2">
            {[
              ['live', 'Current'],
              ['recent', 'Recent'],
              ['upcoming', 'Upcoming'],
            ].map(([status, label]) => (
              <button
                key={status}
                onClick={() => selectStatus(status as MatchStatus)}
                className={`rounded-xl px-3 py-2 text-xs font-black ${
                  activeStatus === status
                    ? 'bg-neon-green text-black'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {groupedMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  selectedMatch.id === match.id
                    ? 'border-neon-green bg-neon-green/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-primary/25'
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                    {match.league}
                  </span>
                  <StatusPill status={match.status} />
                </div>
                <div className="space-y-3">
                  <TeamLine team={match.team1} />
                  <TeamLine team={match.team2} />
                </div>
                <p className="mt-3 text-xs font-semibold text-primary">{match.result}</p>
                <p className="mt-1 text-[11px] text-on-surface-variant">{match.startTime} • {match.venue}</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
            <div className="border-b border-white/10 bg-[#05070a]/50 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <StatusPill status={selectedMatch.status} />
                    <span className="text-xs font-bold text-on-surface-variant">{selectedMatch.league}</span>
                  </div>
                  <h2 className="font-display text-2xl font-black text-primary">{selectedMatch.title}</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{selectedMatch.venue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Match time</p>
                  <p className="font-display text-sm font-black text-primary">{selectedMatch.startTime}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <ScorePanel team={selectedMatch.team1} />
              <ScorePanel team={selectedMatch.team2} />
            </div>

            <div className="border-t border-white/10 p-5">
              <p className="text-sm font-bold text-primary">{selectedMatch.result}</p>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{selectedMatch.note}</p>
              {selectedMatch.recentBalls && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-on-surface-variant">Recent balls</span>
                  <div className="flex gap-2">
                    {selectedMatch.recentBalls.map((ball, index) => (
                      <Ball key={`${ball}-${index}`} ball={ball} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {(selectedMatch.status === 'live' || selectedMatch.status === 'upcoming') && (
            <PredictionGame
              match={selectedMatch}
              selected={predictions[selectedMatch.id]}
              onPick={(pick) => setPredictions((current) => ({ ...current, [selectedMatch.id]: pick }))}
            />
          )}

          {selectedMatch.scorecard ? (
            <Scorecard match={selectedMatch} />
          ) : (
            <section className="glass-panel rounded-3xl border border-white/10 p-6">
              <h3 className="font-display text-xl font-black text-primary">Match Details</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {selectedMatch.keyDetails.map((detail) => (
                  <div key={detail} className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-4">
                    <p className="text-xs leading-relaxed text-on-surface-variant">{detail}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedMatch.status === 'live' && (
            <section className="glass-panel rounded-3xl border border-white/10 p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-primary">
                  <span className="material-symbols-outlined text-neon-green">list_alt</span>
                  Ball-by-Ball
                </h3>
                <span className="text-xs text-on-surface-variant">Latest over</span>
              </div>
              {commentaryLoading ? (
                <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
              ) : (
                <div className="space-y-4">
                  {commentaries?.map((commentary) => (
                    <div key={commentary.id} className="grid grid-cols-[56px_42px_1fr] gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-on-surface-variant">{commentary.ball}</span>
                      <span className="rounded-full border border-neon-green/30 bg-neon-green/10 px-2 py-0.5 text-center text-[10px] font-black text-neon-green">
                        {commentary.tagValue}
                      </span>
                      <p className="text-sm leading-relaxed text-primary">{commentary.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: MatchStatus }) {
  const label = status === 'live' ? 'Live' : status === 'recent' ? 'Completed' : 'Upcoming'
  const className =
    status === 'live'
      ? 'border-red-400/35 bg-red-500/15 text-red-300'
      : status === 'recent'
        ? 'border-electric-blue/30 bg-electric-blue/10 text-electric-blue'
        : 'border-neon-green/30 bg-neon-green/10 text-neon-green'

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}>
      {label}
    </span>
  )
}

function TeamLine({ team }: { team: MatchTeam }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: team.logoColor }} />
        <span className="truncate text-sm font-black text-primary">{team.shortName}</span>
      </div>
      <span className="shrink-0 text-sm font-bold text-on-surface">{team.score ?? '-'}</span>
    </div>
  )
}

function ScorePanel({ team }: { team: MatchTeam }) {
  return (
    <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl font-display text-sm font-black text-black" style={{ backgroundColor: team.logoColor }}>
          {team.shortName}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-black text-primary">{team.fullName}</p>
          <p className="text-xs text-on-surface-variant">{team.overs ? `${team.overs} overs` : 'Fixture team'}</p>
        </div>
      </div>
      <p className="font-display text-3xl font-black text-primary">{team.score ?? 'Yet to bat'}</p>
    </div>
  )
}

function Ball({ ball }: { ball: string }) {
  let className = 'border-white/10 bg-white/5 text-on-surface-variant'
  if (ball === '6' || ball === '4') className = 'border-neon-green bg-neon-green text-black'
  if (ball === 'W') className = 'border-red-500 bg-red-500 text-white'
  if (ball.includes('wd') || ball.includes('nb')) className = 'border-electric-blue/30 bg-electric-blue/10 text-electric-blue'

  return (
    <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black ${className}`}>
      {ball}
    </span>
  )
}

function PredictionGame({
  match,
  selected,
  onPick,
}: {
  match: MatchSummary
  selected?: string
  onPick: (pick: string) => void
}) {
  return (
    <section className="glass-panel rounded-3xl border border-neon-green/20 p-6">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-neon-green">Prediction game</p>
          <h3 className="mt-1 font-display text-xl font-black text-primary">
            {match.status === 'live' ? 'Play the live call' : 'Lock your pre-match pick'}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
            AI edge: {match.winProbability ?? 50}% toward {match.team1.shortName}. Your pick is saved locally for this session.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {match.predictionOptions.map((option) => (
            <button
              key={option}
              onClick={() => onPick(option)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-black transition-all ${
                selected === option
                  ? 'border-neon-green bg-neon-green text-black'
                  : 'border-white/10 bg-[#05070a]/60 text-primary hover:border-neon-green/40'
              }`}
            >
              {option}
              {selected === option && <span className="mt-1 block text-[10px] uppercase tracking-wider">Picked</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Scorecard({ match }: { match: MatchSummary }) {
  if (!match.scorecard) return null

  return (
    <section className="glass-panel overflow-hidden rounded-3xl border border-white/10">
      <div className="border-b border-white/10 bg-[#05070a]/50 p-5">
        <h3 className="font-display text-xl font-black text-primary">Scorecard & Details</h3>
        <p className="mt-1 text-sm text-on-surface-variant">{match.keyDetails.join(' • ')}</p>
      </div>

      <div className="p-5">
        <TableTitle title={match.scorecard.battingTeam} meta={match.scorecard.total} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 font-black">Batter</th>
                <th className="py-3 text-right font-black">R</th>
                <th className="py-3 text-right font-black">B</th>
                <th className="py-3 text-right font-black">4s</th>
                <th className="py-3 text-right font-black">6s</th>
                <th className="py-3 text-right font-black">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {match.scorecard.batting.map((row) => (
                <tr key={row.player}>
                  <td className="py-3 font-bold text-primary">{row.player}</td>
                  <td className="py-3 text-right text-primary">{row.runs}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.balls}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.fours}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.sixes}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.strikeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-4 grid gap-3 sm:grid-cols-3">
          <InfoTile label="Extras" value={match.scorecard.extras} />
          <InfoTile label="Total" value={match.scorecard.total} />
          <InfoTile label="Fall of wickets" value={match.scorecard.fallOfWickets} />
        </div>

        <TableTitle title={match.scorecard.bowlingTeam} meta="Bowling card" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 font-black">Bowler</th>
                <th className="py-3 text-right font-black">O</th>
                <th className="py-3 text-right font-black">M</th>
                <th className="py-3 text-right font-black">R</th>
                <th className="py-3 text-right font-black">W</th>
                <th className="py-3 text-right font-black">ECO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {match.scorecard.bowling.map((row) => (
                <tr key={row.player}>
                  <td className="py-3 font-bold text-primary">{row.player}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.overs}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.maidens}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.runs}</td>
                  <td className="py-3 text-right font-black text-neon-green">{row.wickets}</td>
                  <td className="py-3 text-right text-on-surface-variant">{row.economy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function TableTitle({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
      <h4 className="font-display text-sm font-black text-primary">{title}</h4>
      <span className="text-xs font-bold text-on-surface-variant">{meta}</span>
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#05070a]/60 p-3">
      <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="mt-1 text-xs font-bold leading-relaxed text-primary">{value}</p>
    </div>
  )
}
