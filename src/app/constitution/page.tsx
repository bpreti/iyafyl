import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export const metadata: Metadata = { title: 'League Constitution' }

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2
        className="text-2xl font-extrabold pb-2"
        style={{ borderBottom: '2px solid var(--accent)', color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

function SubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="space-y-2">
      <h3 className="text-base font-bold" style={{ color: 'var(--accent-light)' }}>{title}</h3>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        {children}
      </div>
    </div>
  )
}

function Offense({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-semibold" style={{ color: '#dc2626' }}>{children}</p>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="italic" style={{ color: 'var(--text-secondary)' }}>{children}</p>
  )
}

function TocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="hover:underline underline-offset-2" style={{ color: 'var(--accent-light)' }}>
        {children}
      </a>
    </li>
  )
}

export default function ConstitutionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Back */}
      <Link href="/history" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> League History
      </Link>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText size={32} style={{ color: 'var(--accent-light)' }} />
        </div>
        <h1 className="text-4xl font-extrabold">League Constitution</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          If You Ain&apos;t First You&apos;re Last · v1.0.0
        </p>
      </div>

      {/* Table of Contents */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">Table of Contents</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div className="space-y-1">
            <p className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>Section 1 · Roster</p>
            <ul className="space-y-1 pl-2">
              <TocLink href="#s1-1">1.1 Positional Breakdown</TocLink>
              <TocLink href="#s1-1-1">1.1.1 Roster Setting</TocLink>
              <TocLink href="#s1-2">1.2 Keepers</TocLink>
              <TocLink href="#s1-3">1.3 Trading</TocLink>
              <TocLink href="#s1-3-1">1.3.1 Trade Collusion</TocLink>
              <TocLink href="#s1-3-2">1.3.2 Trade Deadline</TocLink>
              <TocLink href="#s1-3-3">1.3.3 Veto/Trade Process</TocLink>
              <TocLink href="#s1-4">1.4 Waiver Wire</TocLink>
              <TocLink href="#s1-5">1.5 Divisional Breakdown</TocLink>
              <TocLink href="#s1-5-1">1.5.1 Regular Season Breakdown</TocLink>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>Section 2 · Ownership</p>
              <ul className="space-y-1 pl-2">
                <TocLink href="#s2-1">2.1 League Fee</TocLink>
                <TocLink href="#s2-2">2.2 Leaving the League</TocLink>
                <TocLink href="#s2-3">2.3 Removal</TocLink>
                <TocLink href="#s2-4">2.4 Voting</TocLink>
              </ul>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>Sections 3–5</p>
              <ul className="space-y-1 pl-2">
                <TocLink href="#s3">3 · Drafting</TocLink>
                <TocLink href="#s4">4 · Scoring System</TocLink>
                <TocLink href="#s5">5 · Postseason</TocLink>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <Section id="s1" title="Section 1 · Roster Breakdown">
        <SubSection id="s1-1" title="1.1 · Positional Breakdown">
          <p>16 total players and 2 on the IR.</p>
          <div>
            <p className="font-semibold mb-2">Starters — 10 Players</p>
            <div className="card overflow-hidden">
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th># of Starters</th>
                    <th>Max on Team</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['QB', '1', '4'],
                    ['RB', '2', '8'],
                    ['WR', '3', '8'],
                    ['TE', '1', '3'],
                    ['FLEX', '1', 'N/A'],
                    ['D/ST', '1', '3'],
                    ['Kicker', '1', '3'],
                  ].map(([pos, starters, max]) => (
                    <tr key={pos}>
                      <td className="font-medium">{pos}</td>
                      <td>{starters}</td>
                      <td>{max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p><span className="font-semibold">Reserves:</span> 6 bench spots</p>
          <p><span className="font-semibold">Injured Reserve (IR):</span> 2 IR spots</p>
        </SubSection>

        <SubSection id="s1-1-1" title="1.1.1 · Roster Setting">
          <p>
            All roster lineups must be made in good faith to make sure no foul play is occurring.
            If any owners are suspected of accepting or offering bribes to enhance their/another
            owner&apos;s team via roster lineup they will be susceptible to punishment.
          </p>
          <div className="card p-4 space-y-1" style={{ borderLeft: '3px solid #dc2626' }}>
            <Offense>First Offense – Offending team&apos;s lineup is set by the commissioner to use most projected points before the start of that week.</Offense>
            <Offense>Second Offense – Removal from league.</Offense>
          </div>
          <p>
            All teams found guilty of collusion will have their lineups set to the optimal lineup
            based on pregame projected points. If the collusion affected the outcome of previous
            games, those results will be revised.
          </p>
          <Note>Commissioners can reverse lineups at any time if they feel it is necessary to keep the integrity of the league.</Note>
          <Note>Each offense will stay on your record for 2 seasons before having a clean slate.</Note>
        </SubSection>

        <SubSection id="s1-2" title="1.2 · Keepers">
          <p>The If You Ain&apos;t First You&apos;re Last league does <strong>NOT</strong> use Keepers.</p>
        </SubSection>

        <SubSection id="s1-3" title="1.3 · Trading">
          <p>
            Owners will have the option to exchange players during the trade window made available
            by the commissioner. All trades will automatically be approved.
          </p>
        </SubSection>

        <SubSection id="s1-3-1" title="1.3.1 · Trade Collusion">
          <p>
            All trades will be reviewed by the commissioner to ensure no foul play is occurring.
            If any owners are suspected of accepting or offering bribes to enhance their/another
            owner&apos;s team via trade they will be susceptible to punishment.
          </p>
          <div className="card p-4 space-y-1" style={{ borderLeft: '3px solid #dc2626' }}>
            <Offense>First Offense – Both teams in the trade lose the players involved to free agency and cannot pick them up for 24 hours.</Offense>
            <Offense>Second Offense – Removal from league.</Offense>
          </div>
          <p>
            All trades found guilty of collusion will be reversed/denied. If the trade affected
            the outcome of previous games, those results will be revised.
          </p>
          <Note>Commissioners can reverse and deny trades at any time if they feel it is necessary to keep the integrity of the league.</Note>
          <Note>First offense will stay on your record for 2 seasons before having a clean slate.</Note>
        </SubSection>

        <SubSection id="s1-3-2" title="1.3.2 · Trade Deadline">
          <p>The trading deadline will be determined by the commissioner each season.</p>
        </SubSection>

        <SubSection id="s1-3-3" title="1.3.3 · Veto/Trade Process">
          <p>
            The commissioner will review each trade. If other managers feel collusion has taken
            place, a complaint can be raised to the commissioner. Two managers not involved in
            the trade (or the commissioner) must submit a complaint for a review to occur.
          </p>
          <p>
            The review board will consist of the commissioner and two randomly selected league
            managers not involved in the trade or the complaint. A decision reached by 2/3rds of
            the trade review committee will stand.
          </p>
          <p>
            The complaint must be made within 48 hours of the trade. The review committee must
            reach a decision within 24 hours of the complaint being submitted. If no decision is
            made in this timeframe the trade stands. There is no double jeopardy.
          </p>
          <Note>If the commissioner is involved in the trade under review, a randomly selected manager not involved in the trade or complaint will replace the commissioner on the review committee.</Note>
        </SubSection>

        <SubSection id="s1-4" title="1.4 · Waiver Wire">
          <p>
            The waiver wire will begin the season based on reverse order of the draft.
            The order will reset to the inverse order of the standings each week.
          </p>
        </SubSection>

        <SubSection id="s1-5" title="1.5 · Divisional Breakdown">
          <p>There is only one 12-team division: <strong>The Division of Champions.</strong></p>
        </SubSection>

        <SubSection id="s1-5-1" title="1.5.1 · Regular Season Breakdown">
          <p>
            The regular season consists of 14 weeks with one matchup a week, resulting in 14 games.
            Each team will play the other 11 teams once and 3 of those teams twice.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-semibold">Week 1 — Rematch Week:</span> Matchups decided by the last week of the previous season&apos;s playoffs.</li>
            <li><span className="font-semibold">Week 12:</span> Rematch of Week 2.</li>
            <li><span className="font-semibold">Week 13 — Rivalry Week:</span> Teams with the closest head-to-head records over the lifespan of the league. Tiebreaker: most matchups, then closest relationships between managers.</li>
            <li><span className="font-semibold">Week 14 — Revenge Week:</span> Rematch of Week 1 — a chance to redeem yourself.</li>
          </ul>
          <Note>There are no tiebreakers for regular season games.</Note>
        </SubSection>
      </Section>

      {/* Section 2 */}
      <Section id="s2" title="Section 2 · Ownership Expectations">
        <SubSection id="s2-1" title="2.1 · League Fee">
          <p>There are no fees for managing a team in the If You Ain&apos;t First You&apos;re Last league.</p>
        </SubSection>

        <SubSection id="s2-2" title="2.2 · Leaving the League">
          <p>
            At the end of every season and before every league kickoff meeting for the new season,
            teams can opt out of the league.
          </p>
        </SubSection>

        <SubSection id="s2-3" title="2.3 · Removal">
          <p>
            The owners can vote to remove any owner from the league at any time, as long as they
            feel the owner is ruining the integrity of the league and can provide acceptable evidence
            (subject to commissioner interpretation). If any owner is removed it will fall on the
            commissioner to replace them.
          </p>
          <p>
            If an owner is removed mid-season, the commissioner will manage the team until a new
            owner is found. No roster transactions will be allowed until a new owner is found.
            The top-rated players for that week will be forced to start.
          </p>
        </SubSection>

        <SubSection id="s2-4" title="2.4 · Voting">
          <p>
            Each season new rules and regulations will be brought to the owners at the league
            kickoff meeting. All rules must receive a <strong>super majority vote (≥ 75%)</strong> to be approved.
          </p>
        </SubSection>
      </Section>

      {/* Section 3 */}
      <Section id="s3" title="Section 3 · Drafting">
        <SubSection id="s3-1" title="3.1 · Draft Order">
          <p>
            The draft order will be decided by a process selected by the previous year&apos;s champion
            with input from the commissioner. The selected process will not discriminate against
            federally protected classes.
          </p>
        </SubSection>

        <SubSection id="s3-2" title="3.2 · Draft Date, Location & Time">
          <p>
            The draft date, location and time will be determined by the commissioner with input
            from the league managers, and discussed during the league kickoff meeting. The date
            and time when the majority of owners are available becomes the official draft date.
          </p>
          <p>
            If you <strong>cannot</strong> make the draft, you are responsible for finding someone to draft for you
            and notifying the commissioner. If you cannot find anyone, your team will be auto-drafted.
          </p>
        </SubSection>
      </Section>

      {/* Section 4 */}
      <Section id="s4" title="Section 4 · Scoring System">
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          We play in a 12-team standard scoring fantasy football league. The full scoring breakdown
          is listed on the ESPN fantasy app or website.
        </p>

        <SubSection id="s4-1" title="4.1 · Voting on Scoring System">
          <p>
            Each season at the kickoff meeting, managers can bring forth scoring proposals.
            If a proposal is well received, a league vote will occur. A <strong>super majority vote (≥ 75%)</strong> is
            required for approval.
          </p>
        </SubSection>
      </Section>

      {/* Section 5 */}
      <Section id="s5" title="Section 5 · Postseason">
        <SubSection id="s5-1" title="5.1 · Playoffs">
          <p>
            At the end of the season, the top 6 teams by record receive a playoff berth. The
            2 teams with the best overall records receive a first-round bye. Each playoff matchup
            lasts one week and the winner advances.
          </p>
        </SubSection>

        <SubSection id="s5-2" title="5.2 · Sucko Bowl">
          <p>
            The bottom 6 teams by record receive a Sucko Bowl berth. The 2 teams with the worst
            overall records receive a first-round bye. Each Sucko Bowl matchup lasts one week and
            the <strong>loser</strong> advances.
          </p>
        </SubSection>

        <SubSection id="s5-3" title="5.3 · Playoff Tiebreakers">
          <p>
            If two teams tie in the playoffs, the tiebreaker is bench points scored. If also tied
            in bench points, the seeding tiebreaker (Section 5.4) applies.
          </p>
        </SubSection>

        <SubSection id="s5-4" title="5.4 · Seeding Tiebreakers">
          <p>If two teams finish with the same record, tiebreakers are applied in this order:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Record vs everyone each week for the season</li>
            <li>Points For</li>
            <li>Head-to-Head record</li>
            <li>Total Points Against</li>
          </ol>
        </SubSection>

        <SubSection id="s5-5" title="5.5 · Playoff Prizes">
          <p>
            The playoff champion receives the <strong>League Trophy</strong>, mailed or delivered no later than 8 weeks
            after the Championship game. A plaque will be purchased to affix to the trophy.
            The trophy holds space for 22 years of champions.
          </p>
          <p>
            The Sucko Bowl championship loser receives the <strong>Golden Plunger</strong>, mailed or delivered no
            later than 8 weeks after the Sucko Bowl Championship. A plaque will be purchased to
            affix to the trophy, which holds space for 15 years.
          </p>
          <div className="card p-4" style={{ borderLeft: '3px solid var(--accent)' }}>
            <p className="font-bold text-sm">
              The trophy must be displayed for the full year within the champion&apos;s place of primary residence.
            </p>
          </div>
        </SubSection>
      </Section>

    </div>
  )
}
