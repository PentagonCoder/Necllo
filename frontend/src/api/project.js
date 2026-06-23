import api from './axios'

export const getMyProjects = (workspaceId) => api.get(`/project/my-projects/${workspaceId}`)

export const createProject = (workspaceId, data) => api.post(`/project/create/${workspaceId}`, data)