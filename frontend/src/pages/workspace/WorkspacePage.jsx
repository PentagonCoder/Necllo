import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getWorkspaceById } from '../../api/workspace'
import { getMyProjects, createProject } from '../../api/project'

function WorkspacePage() {
  const { workspaceId } = useParams()
  const navigate = useNavigate()

  const [workspace, setWorkspace] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [workspaceId])

  const fetchData = async () => {
    try {
      const [wsRes, projRes] = await Promise.all([
        getWorkspaceById(workspaceId),
        getMyProjects(workspaceId)
      ])
      setWorkspace(wsRes.data.workspace)
      setProjects(projRes.data.project)
    } catch (err) {
      console.error('Failed to load workspace', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex justify-between items-center mt-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{workspace?.name}</h1>
            <p className="text-gray-500 text-sm">{workspace?.description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-1">{workspace?.members?.length} member(s)</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Project
          </button>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No projects yet in this workspace.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Create your first project
            </button>
          </div>
        )}

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div
              key={proj._id}
              onClick={() => navigate(`/workspace/${workspaceId}/project/${proj._id}`)}
              className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-md transition"
            >
              <h2 className="font-semibold text-gray-800 mb-1">{proj.name}</h2>
              <p className="text-gray-500 text-sm line-clamp-2">{proj.description || 'No description'}</p>
            </div>
          ))}
        </div>

      </div>

      {showModal && (
        <CreateProjectModal
          workspaceId={workspaceId}
          onClose={() => setShowModal(false)}
          onCreated={fetchData}
        />
      )}
    </div>
  )
}

function CreateProjectModal({ workspaceId, onClose, onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Project name is required')
      return
    }
    setLoading(true)
    setError('')
    try {
      await createProject(workspaceId, { name, description })
      onCreated()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Website Redesign"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkspacePage