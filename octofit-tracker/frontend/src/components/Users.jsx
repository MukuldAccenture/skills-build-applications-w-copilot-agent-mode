import { useEffect, useMemo, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const base = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'
    return `${base}/users/`
  }, [])

  useEffect(() => {
    async function loadUsers() {
      try {
        setError('')
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`)
        }
        const payload = await response.json()
        setUsers(normalizeCollection(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load users.')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [endpoint])

  return (
    <section className="entity-view">
      <h2 className="view-title">Users</h2>
      <p className="view-subtitle">Registered athletes and weekly training goals.</p>

      {loading && <p className="mb-0">Loading users...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="empty-box mb-0">No users found in the current response.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
                <th>Goal Minutes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email || user.name}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td className="text-capitalize">{user.fitnessLevel || '-'}</td>
                  <td>{user.weeklyGoalMinutes ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users