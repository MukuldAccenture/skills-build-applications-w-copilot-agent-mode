import { useEffect, useMemo, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const base = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    return `${base}/api/activities/`
  }, [])

  useEffect(() => {
    async function loadActivities() {
      try {
        setError('')
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`)
        }
        const payload = await response.json()
        setActivities(normalizeCollection(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load activities.')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [endpoint])

  return (
    <section className="entity-view">
      <h2 className="view-title">Activities</h2>
      <p className="view-subtitle">Latest logged sessions across your team.</p>

      {loading && <p className="mb-0">Loading activities...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && activities.length === 0 && (
        <p className="empty-box mb-0">No activities found in the current response.</p>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.userId?.name}-${activity.performedAt}`}>
                  <td>{activity.userId?.name || activity.userName || '-'}</td>
                  <td className="text-capitalize">{activity.activityType || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'} min</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>
                    {activity.performedAt
                      ? new Date(activity.performedAt).toLocaleDateString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities