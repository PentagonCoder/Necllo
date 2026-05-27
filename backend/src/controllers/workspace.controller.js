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

export { createWorkspace, getMyWorkspaces }