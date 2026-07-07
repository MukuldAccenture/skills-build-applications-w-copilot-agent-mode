import { useEffect, useMemo, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const base = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    return `${base}/api/teams/`
  }, [])

  useEffect(() => {
    async function loadTeams() {
      try {
        setError('')
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`)
        }
        const payload = await response.json()
        setTeams(normalizeCollection(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load teams.')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [endpoint])

  return (
    <section className="entity-view">
      <h2 className="view-title">Teams</h2>
      <p className="view-subtitle">Current squads, captains, and member counts.</p>

      {loading && <p className="mb-0">Loading teams...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && teams.length === 0 && (
        <p className="empty-box mb-0">No teams found in the current response.</p>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Captain</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.name}>
                  <td>{team.name || '-'}</td>
                  <td>{team.city || '-'}</td>
                  <td>{team.captainId?.name || team.captain?.name || '-'}</td>
                  <td>{team.memberIds?.length ?? team.memberCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams