import api from "../api/axios";

export const getMyWorkspaces = () => {
  return api.get("/api/workspace/my-workspaces");
};

export const createWorkspace = (workspaceData) => {
  return api.post("/api/workspace/create", workspaceData);
};

export const getWorkspaceById = (workspaceId) => {
  return api.get(`/api/workspace/${workspaceId}`);
}

export const inviteUser = (workspaceId, email) => {
  return api.post(`/api/workspace/invite-users/${workspaceId}`, email)
}
export const joinWorkspace = (invitationToken) => {
  return api.post(`/api/workspace/join-workspace/${invitationToken}`)
}