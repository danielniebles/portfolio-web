// Layout constants exported so the sibling commit-list rows can share exact heights,
// keeping SVG dot y-positions pixel-aligned with their corresponding text rows.
export const GRAPH_ROW_H = 88  // px per project row
export const GRAPH_PAD_T = 20  // top padding — aligns y=0 of SVG with y=0 of list

const COL0_X   = 12  // main trunk column x
const COL1_X   = 42  // feature branch column x
const DOT_R    = 5   // commit dot radius
const MINI_R   = 3   // fork/merge junction dot radius
const FORK_OFF = 24  // px before commit center where fork/merge diagonal starts
const SVG_W    = 58

// Returns the y-center of row i
function rowY(i: number) {
  return GRAPH_PAD_T + i * GRAPH_ROW_H + GRAPH_ROW_H / 2
}

interface GitGraphProps {
  count: number
  selectedIndex: number
}

/**
 * Renders an SVG that mimics `git log --graph` output:
 *
 *   |
 *   |\
 *   | *  project 0  (feature branch, col 1)
 *   | |
 *   * |  project 1  (main trunk, col 0, while branch is open)
 *   |/
 *   *    project 2  (col 0, post-merge commit)
 *
 * For N projects: index 0 is on the feature branch (col 1); indices 1..N-2
 * are on the trunk (col 0) while the branch remains open; index N-1 is the
 * post-merge commit on col 0. For N <= 2 the pattern degrades gracefully.
 */
export function GitGraph({ count, selectedIndex }: GitGraphProps) {
  if (count === 0) return null

  const totalH = GRAPH_PAD_T + count * GRAPH_ROW_H + GRAPH_PAD_T

  // y positions
  const y0        = rowY(0)                              // branch commit (col 1)
  const yLast     = rowY(count - 1)                      // post-merge commit (col 0)
  const forkY     = y0 - FORK_OFF                        // where trunk splits into branch
  const mergeY    = count > 1 ? yLast - FORK_OFF : y0   // where branch re-joins trunk

  return (
    <svg
      width={SVG_W}
      height={totalH}
      viewBox={`0 0 ${SVG_W} ${totalH}`}
      aria-hidden="true"
      className="shrink-0"
    >
      {/* ── Main trunk — full-height vertical line ── */}
      <line
        x1={COL0_X} y1={0}
        x2={COL0_X} y2={totalH}
        stroke="var(--color-border-subtle)"
        strokeWidth={1.5}
      />

      {count > 1 && (
        <>
          {/* ── Branch col 1 — open segment between fork and merge ── */}
          <line
            x1={COL1_X} y1={y0}
            x2={COL1_X} y2={mergeY}
            stroke="var(--color-accent-dim)"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />

          {/* ── Fork diagonal: col0 → col1 ── */}
          <line
            x1={COL0_X} y1={forkY}
            x2={COL1_X} y2={y0}
            stroke="var(--color-accent-dim)"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />

          {/* Fork junction dot on trunk */}
          <circle
            cx={COL0_X} cy={forkY}
            r={MINI_R}
            fill="var(--color-accent-dim)"
            fillOpacity={0.6}
          />

          {/* ── Merge diagonal: col1 → col0 ── */}
          <line
            x1={COL1_X} y1={mergeY}
            x2={COL0_X} y2={yLast}
            stroke="var(--color-accent-dim)"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />
        </>
      )}

      {/* ── Commit dots ── */}
      {Array.from({ length: count }, (_, i) => {
        const isSelected = i === selectedIndex
        const isBranch   = i === 0 && count > 1   // first project on col 1
        const cx         = isBranch ? COL1_X : COL0_X
        const cy         = rowY(i)

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={isSelected ? DOT_R + 1 : DOT_R}
            fill="var(--color-terminal-green)"
            fillOpacity={isSelected ? 1 : 0.45}
            className={isSelected ? 'animate-pulse-dot' : ''}
            style={{ transition: 'r 0.2s, fill-opacity 0.2s' }}
          />
        )
      })}
    </svg>
  )
}
