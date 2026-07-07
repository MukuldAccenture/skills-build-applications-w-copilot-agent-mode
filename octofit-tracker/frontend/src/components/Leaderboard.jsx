import { useEffect, useMemo, useState } from 'react'

function normalizeLeaderboard(payload) {
  if (!payload) return null
  if (Array.isArray(payload)) return payload[0] || null
  if (Array.isArray(payload?.results)) return payload.results[0] || null
  if (Array.isArray(payload?.data)) return payload.data[0] || null
  if (payload?.entries) return payload
  if (payload?.data?.entries) return payload.data
  if (payload?.result?.entries) return payload.result
  return null
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const base = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    return `${base}/api/leaderboard/`
  }, [])

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setError('')
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`)
        }
        const payload = await response.json()
        setLeaderboard(normalizeLeaderboard(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load leaderboard.')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [endpoint])

  const entries = leaderboard?.entries || []

  return (
    <section className="entity-view">
      <h2 className="view-title">Leaderboard</h2>
      <p className="view-subtitle">
        {leaderboard?.weekStart
          ? `Week of ${new Date(leaderboard.weekStart).toLocaleDateString()}`
          : 'Current ranking snapshot'}
      </p>

      {loading && <p className="mb-0">Loading leaderboard...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && !leaderboard && (
        <p className="empty-box mb-0">No leaderboard found in the current response.</p>
      )}

      {!loading && !error && leaderboard && entries.length === 0 && (
        <p className="empty-box mb-0">Leaderboard loaded, but there are no entries yet.</p>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Athlete</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={`${entry.userId?._id || entry.userId || index}-${entry.rank || index}`}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.userId?.name || entry.name || '-'}</td>
                  <td>{entry.userId?.email || entry.email || '-'}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard