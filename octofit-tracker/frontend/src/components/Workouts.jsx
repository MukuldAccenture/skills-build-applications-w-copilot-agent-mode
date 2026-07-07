import { useEffect, useMemo, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const base = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    return `${base}/api/workouts/`
  }, [])

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError('')
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`)
        }
        const payload = await response.json()
        setWorkouts(normalizeCollection(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load workouts.')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [endpoint])

  return (
    <section className="entity-view">
      <h2 className="view-title">Workouts</h2>
      <p className="view-subtitle">Suggested sessions by level and focus area.</p>

      {loading && <p className="mb-0">Loading workouts...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && workouts.length === 0 && (
        <p className="empty-box mb-0">No workouts found in the current response.</p>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Focus</th>
                <th>Equipment</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title || '-'}</td>
                  <td className="text-capitalize">{workout.level || '-'}</td>
                  <td>{workout.durationMinutes ?? '-'} min</td>
                  <td>{workout.focusArea || '-'}</td>
                  <td>{Array.isArray(workout.equipment) ? workout.equipment.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts