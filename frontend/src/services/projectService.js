import api from "../api/axios";

export const createProject = (workspaceId, Data) => {
  return api.post(`/api/project/create/${workspaceId}`, Data);
};

export const getMyProjects = (workspaceId) => {
  return api.get(`/api/project/my-projects/${workspaceId}`);
};

export const getProjectById = (workspaceId, projectId) => {
  return api.get(`/api/project/${workspaceId}/${projectId}`);
}