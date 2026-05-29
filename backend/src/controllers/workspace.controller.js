import {asyncHandler} from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';

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
  //get userId from request token 
  const userId = req.user.id;

  //find workspaces for the user
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

  // WORKSPACE ID FROM PARAMS
  const { workspaceId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user.id;

  //find the workspace by ID 
  const workspace = await Workspace.findById(workspaceId)

  //check if workspace exist 
  if (!workspace) {
    return res.status(404).json({
      message: "Workspace not found"
    });
  }

  //check if user is a member of the workspace
  const isMember = workspace.members.some((member)=>(member.user.toString() === userId));
  
  console.log(isMember);

  //if not retrun Access denied
  if(!isMember){
    return res.status(403).json({
      message: "Access denied. You are not a member of this workspace."
    });
  }

  //if user is a member, return workspace details
  res.status(200).json({
    success: true,
    message: "Workspace details fetched successfully",
    workspace
  });

})

const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace = req.workspace;
  const { name, description } = req.body;

  if(name?.trim()) workspace.name = name;
  if(description?.trim()) workspace.description = description;

  await workspace.save();

  res.status(200).json({
    success: true,
    message: "Workspace updated successfully",
    workspace
  });
})

const inviteUsers = asyncHandler(async (req, res) =>{
  const { workspaceId } =req.params;
  const { email } = req.body;

  //find the workspace by ID 
  const workspace = await Workspace.findById(workspaceId)

  const invitationToken = crypto.randomBytes(12).toString("hex");
  workspace.invitationToken = invitationToken;
  await workspace.save();

  const inviteUrl = `http://localhost:3000/api/workspace/${invitationToken}`;
  const message = `Join the workspace: ${inviteUrl}`;

  await sendEmail({
    to : email,
    subject : "workspace join link",
    text : message
  })

  res.status(200).json({
    message : "JOINING LINK SENT TO YOUR EMAIL",
    invitationToken
  })

})

const joinWorkspace = asyncHandler(async (req, res) =>{
  const { invitationToken } =req.params; 
  const  userId  = req.user.id;

  console.log(invitationToken);
  console.log(userId);

  //find the workspace by ID 
  const workspace = await Workspace.findOne({ invitationToken })
  console.log(workspace);

  
  //check if workspace exist 
  if (!workspace) {
    return res.status(404).json({
      message: "Invalid invitation token"
    });
  }

  //check if user alredy exist in workspace
  //check if user is a member of the workspace
  const isMember = workspace.members.some((member)=>(member.user.toString() === userId));

  if(isMember){
    return res.status(403).json({
      message: "You already a member"
    });
  }

  // workspace.invitationToken = null;
  workspace.members.push({ user: userId, role: "member" });
  await workspace.save();

  res.status(200).json({
    message : "You Join the gild"
  })

})


export { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace, inviteUsers, joinWorkspace }