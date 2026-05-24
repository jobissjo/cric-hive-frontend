export type MatchStatus = 'live' | 'recent' | 'upcoming'
export type MatchFormat = 'T20' | 'ODI' | 'Test'

export interface MatchTeam {
  shortName: string
  fullName: string
  score?: string
  overs?: string
  logoColor: string
}

export interface ScoreRow {
  player: string
  runs: string
  balls: string
  fours: string
  sixes: string
  strikeRate: string
}

export interface BowlingRow {
  player: string
  overs: string
  maidens: string
  runs: string
  wickets: string
  economy: string
}

export interface MatchSummary {
  id: string
  status: MatchStatus
  format: MatchFormat
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
  summary: string[]
}

export const matches: MatchSummary[] = [
  {
    id: 'csk-mi-live',
    status: 'live',
    format: 'T20',
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
    summary: ['Gaikwad anchored the innings before Dube and Jadeja accelerated.', 'MI found wickets through Bumrah but leaked runs at the other end.', 'The chase shape depends heavily on dew and powerplay intent.'],
  },
  {
    id: 'ind-aus-live',
    status: 'live',
    format: 'T20',
    league: 'T20I Series',
    title: 'India vs Australia, 3rd T20I',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    startTime: 'Live now',
    result: 'AUS need 48 from 30 balls',
    note: 'India are holding a narrow edge with spin available for two more overs.',
    winProbability: 58,
    team1: { shortName: 'IND', fullName: 'India', score: '196/7', overs: '20', logoColor: '#1d4ed8' },
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
    summary: ['India posted a strong total through aggressive middle-over hitting.', 'Australia stayed alive through Head and David but lost wickets at pressure points.', 'The last five overs are set up as pace execution versus boundary hitting.'],
  },
  {
    id: 'eng-sa-recent',
    status: 'recent',
    format: 'ODI',
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
    summary: ['England reached a competitive total but missed a chance to push beyond 300.', 'Markram managed the chase tempo and Klaasen supplied the finishing burst.', 'Dropped catches and late-over extras left England defending too little.'],
  },
  {
    id: 'nz-pak-recent',
    status: 'recent',
    format: 'Test',
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
    summary: ['New Zealand built pressure through first-innings discipline and useful lower-order runs.', 'Pakistan resisted through Babar but lost clusters around the second new ball.', 'Henry’s spell turned a tense day-five finish into a clear New Zealand win.'],
  },
  {
    id: 'rcb-gt-recent',
    status: 'recent',
    format: 'T20',
    league: 'IPL 2026',
    title: 'RCB vs GT, Match 29',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    startTime: 'Completed 4 days ago',
    result: 'RCB won by 18 runs',
    note: 'RCB defended a high-scoring game with smart wide-yorker plans at the death.',
    team1: { shortName: 'RCB', fullName: 'Royal Challengers Bengaluru', score: '214/6', overs: '20', logoColor: '#dc2626' },
    team2: { shortName: 'GT', fullName: 'Gujarat Titans', score: '196/8', overs: '20', logoColor: '#2563eb' },
    scorecard: {
      battingTeam: 'RCB Innings',
      batting: [
        { player: 'V. Kohli', runs: '72', balls: '46', fours: '7', sixes: '3', strikeRate: '156.52' },
        { player: 'G. Maxwell', runs: '41', balls: '19', fours: '2', sixes: '4', strikeRate: '215.78' },
        { player: 'R. Patidar', runs: '36', balls: '23', fours: '4', sixes: '1', strikeRate: '156.52' },
      ],
      bowlingTeam: 'GT Bowling',
      bowling: [
        { player: 'R. Khan', overs: '4', maidens: '0', runs: '33', wickets: '2', economy: '8.25' },
        { player: 'M. Shami', overs: '4', maidens: '0', runs: '42', wickets: '2', economy: '10.50' },
        { player: 'N. Ahmad', overs: '4', maidens: '0', runs: '39', wickets: '1', economy: '9.75' },
      ],
      extras: '12',
      total: '214/6 (20 ov)',
      fallOfWickets: '64/1, 112/2, 167/3, 188/4, 203/5, 214/6',
    },
    predictionOptions: [],
    keyDetails: ['Kohli controlled the chase template', 'Maxwell changed the middle overs', 'RCB conceded only 33 in last four overs'],
    summary: ['RCB used the powerplay well and kept momentum through Kohli’s anchor role.', 'GT threatened in the chase but lost two wickets just before the final timeout.', 'Wide yorkers and slower balls gave RCB a clean death-over finish.'],
  },
  {
    id: 'ban-sl-recent',
    status: 'recent',
    format: 'ODI',
    league: 'Asia Cup ODI',
    title: 'Bangladesh vs Sri Lanka',
    venue: 'Sher-e-Bangla National Stadium, Dhaka',
    startTime: 'Completed 1 week ago',
    result: 'Bangladesh won by 3 wickets',
    note: 'A gritty lower-order chase sealed a tight ODI on a slow surface.',
    team1: { shortName: 'SL', fullName: 'Sri Lanka', score: '248/9', overs: '50', logoColor: '#1d4ed8' },
    team2: { shortName: 'BAN', fullName: 'Bangladesh', score: '252/7', overs: '49.3', logoColor: '#16a34a' },
    scorecard: {
      battingTeam: 'Bangladesh Innings',
      batting: [
        { player: 'M. Rahim', runs: '67', balls: '82', fours: '6', sixes: '0', strikeRate: '81.70' },
        { player: 'M. Hasan', runs: '34', balls: '29', fours: '3', sixes: '1', strikeRate: '117.24' },
        { player: 'N. Shanto', runs: '52', balls: '71', fours: '5', sixes: '0', strikeRate: '73.23' },
      ],
      bowlingTeam: 'Sri Lanka Bowling',
      bowling: [
        { player: 'M. Theekshana', overs: '10', maidens: '1', runs: '39', wickets: '2', economy: '3.90' },
        { player: 'W. Hasaranga', overs: '10', maidens: '0', runs: '46', wickets: '3', economy: '4.60' },
        { player: 'D. Chameera', overs: '9.3', maidens: '0', runs: '58', wickets: '1', economy: '6.10' },
      ],
      extras: '14',
      total: '252/7 (49.3 ov)',
      fallOfWickets: '34/1, 91/2, 146/3, 181/4, 205/5, 229/6, 244/7',
    },
    predictionOptions: [],
    keyDetails: ['Mushfiqur held the chase together', 'Hasaranga took 3 wickets', 'Bangladesh finished with 3 balls left'],
    summary: ['Sri Lanka made a par score but could not fully break away on a tacky pitch.', 'Bangladesh rebuilt through Shanto and Mushfiqur after early pressure.', 'Mehidy’s late hitting decided the final-over chase.'],
  },
  {
    id: 'aus-wi-recent',
    status: 'recent',
    format: 'Test',
    league: 'Test Series',
    title: 'Australia vs West Indies',
    venue: 'Adelaide Oval, Adelaide',
    startTime: 'Completed 2 weeks ago',
    result: 'Australia won by an innings and 42 runs',
    note: 'Australia dominated with the new ball and never let West Indies rebuild.',
    team1: { shortName: 'AUS', fullName: 'Australia', score: '421/7d', overs: '', logoColor: '#facc15' },
    team2: { shortName: 'WI', fullName: 'West Indies', score: '188 & 191', overs: '', logoColor: '#7f1d1d' },
    scorecard: {
      battingTeam: 'West Indies 2nd Innings',
      batting: [
        { player: 'K. Brathwaite', runs: '49', balls: '126', fours: '5', sixes: '0', strikeRate: '38.88' },
        { player: 'A. Athanaze', runs: '38', balls: '76', fours: '4', sixes: '0', strikeRate: '50.00' },
        { player: 'J. Holder', runs: '35', balls: '61', fours: '3', sixes: '1', strikeRate: '57.37' },
      ],
      bowlingTeam: 'Australia Bowling',
      bowling: [
        { player: 'P. Cummins', overs: '17', maidens: '5', runs: '41', wickets: '3', economy: '2.41' },
        { player: 'M. Starc', overs: '15', maidens: '4', runs: '47', wickets: '3', economy: '3.13' },
        { player: 'N. Lyon', overs: '20', maidens: '7', runs: '39', wickets: '2', economy: '1.95' },
      ],
      extras: '10',
      total: '191 all out',
      fallOfWickets: '19/1, 57/2, 83/3, 119/4, 140/5, 161/6, 176/7, 183/8, 189/9, 191/10',
    },
    predictionOptions: [],
    keyDetails: ['Australia enforced the follow-on', 'Cummins and Starc shared 6 wickets', 'Lyon controlled long spells'],
    summary: ['Australia’s first innings put the match almost out of reach.', 'West Indies showed short pockets of resistance but lost wickets in pairs.', 'The pace attack’s new-ball spells were the defining difference.'],
  },
  {
    id: 'rcb-kkr-upcoming',
    status: 'upcoming',
    format: 'T20',
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
    summary: ['RCB enter with batting momentum at a high-scoring venue.', 'KKR’s spin matchups could slow the middle overs.', 'The toss may influence bowling plans because dew is expected later.'],
  },
  {
    id: 'wi-sl-upcoming',
    status: 'upcoming',
    format: 'ODI',
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
    summary: ['West Indies bring power through the top six.', 'Sri Lanka have more spin options for the slower second half.', 'A first-innings score near 280 should be highly competitive.'],
  },
]

export function getMatchById(matchId: string) {
  return matches.find((match) => match.id === matchId)
}
