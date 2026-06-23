import api from './axios'

export const getProjectTasks = (workspaceId, projectId) =>
  api.get(`/project/${workspaceId}/${projectId}/tasks`)

export const createTask = (workspaceId, projectId, data) =>
  api.post(`/project/${workspaceId}/${projectId}/create-task`, data)

export const changeTaskStatus = (projectId, taskId, status) =>
  api.patch(`/tasks/${projectId}/${taskId}/status`, { status })