import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getWorkspaceById } from '../../api/workspace'
import { getProjectTasks, createTask, changeTaskStatus, assignTask } from '../../api/task'

const STATUSES = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-blue-50' },
  { key: 'review', label: 'Review', color: 'bg-yellow-50' },
  { key: 'done', label: 'Done', color: 'bg-green-50' }
]

function ProjectPage() {
  const { workspaceId, projectId } = useParams()

  const [tasks, setTasks] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchTasks()
    fetchMembers()
  }, [projectId])

  const fetchTasks = async () => {
    try {
      const res = await getProjectTasks(workspaceId, projectId)
      setTasks(res.data.tasks)
    } catch (err) {
      console.error('Failed to load tasks', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMembers = async () => {
    try {
      const res = await getWorkspaceById(workspaceId)
      setMembers(res.data.workspace.members)
    } catch (err) {
      console.error('Failed to load members', err)
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await changeTaskStatus(projectId, taskId, newStatus)
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      )
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const handleAssign = async (taskId, assigneeId) => {
    try {
      const res = await assignTask(projectId, taskId, assigneeId)
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? res.data.task : t))
      )
    } catch (err) {
      console.error('Failed to assign task', err)
    }
  }

  const tasksByStatus = (statusKey) => tasks.filter((t) => t.status === statusKey)

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading tasks...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">

        <Link to={`/workspace/${workspaceId}`} className="text-sm text-blue-600 hover:underline">
          ← Back to Workspace
        </Link>

        <div className="flex justify-between items-center mt-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Task
          </button>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STATUSES.map((status) => (
            <div key={status.key} className={`rounded-xl p-3 ${status.color}`}>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 px-1">
                {status.label} ({tasksByStatus(status.key).length})
              </h3>

              <div className="space-y-2">
                {tasksByStatus(status.key).map((task) => (
                  <div key={task._id} className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition">
                    <p className="font-medium text-gray-800 text-sm">{task.title}</p>
                    {task.description && (
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-600' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    {/* Status dropdown */}
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="w-full mt-2 text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>

                    {/* Assign dropdown */}
                    <select
                      value={task.assignee?._id || ''}
                      onChange={(e) => handleAssign(task._id, e.target.value)}
                      className="w-full mt-1 text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Unassigned</option>
                      {members.map((m) => (
                        <option key={m.user._id} value={m.user._id}>{m.user.name}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {tasksByStatus(status.key).length === 0 && (
                  <p className="text-xs text-gray-400 px-1">No tasks</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {showModal && (
        <CreateTaskModal
          workspaceId={workspaceId}
          projectId={projectId}
          onClose={() => setShowModal(false)}
          onCreated={fetchTasks}
        />
      )}
    </div>
  )
}

function CreateTaskModal({ workspaceId, projectId, onClose, onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title is required')
      return
    }
    setLoading(true)
    setError('')
    try {
      await createTask(workspaceId, projectId, { title, description, priority })
      onCreated()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Fix login bug"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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

export default ProjectPage