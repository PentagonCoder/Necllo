import {asyncHandler} from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';

const validateWorkspaceAccess = (roles = []) => {

  return asyncHandler(async (req, res, next) => {

  // WORKSPACE ID FROM PARAMS
  const { workspaceId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user.id;

  //find the workspace by ID 
  const workspace = await Workspace.findById(workspaceId)
    .populate("members.user", "name email")
    .populate("owner", "name email");

  if (!workspace) {
    return res.status(404).json({
      message: "Workspace not found"
    });
  }

  const isMemberRole = workspace.members.some(member => member.user._id.toString() === userId && roles.includes(member.role));

  if (!isMemberRole) {
    return res.status(403).json({
      message: "Access denied."
    });
  }

  req.workspace = workspace;
   // Attach the workspace to the request object for later use
  next();
  })

};

export { validateWorkspaceAccess };