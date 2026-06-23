import api from './axios'

export const getMyWorkspaces = () => api.get('/workspace/my-workspaces')

export const createWorkspace = (data) => api.post('/workspace/create', data)

export const getWorkspaceById = (workspaceId) => api.get(`/workspace/${workspaceId}`)