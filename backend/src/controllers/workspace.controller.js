import {asyncHandler} from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';

const createWorkspace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  
  if(!name?.trim()){
    return res.status(400).json({
    message : "provide the workspace name"
  })}

  const newWorkspace = await Workspace.create({ 
    name,
    description,
    owner : userId,
    members : [{ user: userId, role: 'owner' }]
  });


  // const invitationToken = crypto.randomBytes(12).toString("hex");
  // const resetUrl = `http://localhost:3000/api/workspace/:name/${invitationToken}`;
  // const message = `Join the workspace: ${resetUrl}`;

  // await sendEmail({
  //   to : user.email,
  //   subject : "workspace join link",
  //   text : message
  // })

  res.status(201).json({
    success : true,
    message : "Workspace created successfully",
    workspace : newWorkspace
  })
})

const getMyWorkspaces = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const workspace = await Workspace.find({
    "members.user" : userId
  }).populate("owner", "name email");

  res.status(201).json({
    success : true,
    message : "All The Workspace fetched successfully",
    workspace
  })
})

const getWorkspaceById = asyncHandler( async(req, res) => {

  const { workspaceId } = req.params;
  const userId = req.user.id;

  const workspace = await Workspace.findById(workspaceId)
    .populate("owner", "name email")
    .populate("members.user", "name email");

  if (!workspace) {
    return res.status(404).json({
      message: "Workspace not found"
    });
  }
  const isMember = workspace.members.some(member => member.user._id.toString() === userId);

  if (!isMember) {
    return res.status(403).json({
      message: "Access denied. You are not a member of this workspace."
    });
  }

  res.status(200).json({
    success: true,
    message: "Workspace details fetched successfully",
    workspace
  });
    // console.log(workspace);

})

export { createWorkspace, getMyWorkspaces, getWorkspaceById }