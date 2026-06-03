import {asyncHandler} from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';
import Notification from '../model/notification.model.js';
import User from '../model/user.model.js';

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

  const workspace = req.workspace; // Assuming the workspace is attached to the request object by the validateWorkspaceAccess middleware

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

  const workspace = req.workspace;
  const { email } = req.body;

  const invitationToken = crypto.randomBytes(12).toString("hex");
  
  const inviteUrl = `http://localhost:3000/api/workspace/${invitationToken}`;
  const message = `Join the workspace: ${inviteUrl}`;

  // notification for invited user
  const inviteUser  = await User.findOne({ email });
  console.log("invite user", inviteUser);

  if(inviteUser){
    const notification = await Notification.create({
      user : inviteUser._id,
      message : `You are invited to join workspace "${workspace.name}"`
    })
  }


  try{
    await sendEmail({
      to : email,
      subject : "workspace join link",
      text : message
    })
  } catch (error) {
    console.error("Error sending email:", error);
  }

  // save the invitation token to the workspace document
  workspace.invitationToken = invitationToken;
  await workspace.save();


  res.status(200).json({
    message : "JOINING LINK SENT TO YOUR EMAIL",
    invitationToken
  })

})

const joinWorkspace = asyncHandler(async (req, res) =>{
  const { invitationToken } =req.params; 
  const  userId  = req.user.id;

  //find the workspace by invitation token
  const workspace = await Workspace.findOne({ invitationToken })

  //check if workspace exist 
  if (!workspace) {
    return res.status(404).json({
      message: "Invalid invitation token"
    });
  }

  //check if user alredy exist in workspace
  const isMember = workspace.members.some((member)=>(member.user.toString() === userId));

  if(isMember){
    return res.status(403).json({
      message: "You already a member"
    });
  }

  // add user to workspace members and save
  workspace.members.push({ user: userId, role: "member" });
  await workspace.save();

  res.status(200).json({
    message : "You Join the gild"
  })

})

const roleAsign = asyncHandler(async (req, res) =>{
  const workspace = req.workspace;
  const { userId, roleAssign } = req.body;

  const allowedRoles = ['owner', 'admin', 'member'];

  if (!allowedRoles.includes(roleAssign)) {
    return res.status(400).json({
      message: "Invalid role"
    });
  }

  // Find that other member in the workspace
  const Member = workspace.members.find((member) => member.user.toString() === userId);

  if (!Member) {
    return res.status(404).json({
      message: "Member not found"
    });
  }

  Member.role = roleAssign;
  await workspace.save();

  res.status(200).json({
    message : "Role assigned successfully"
  })

})

const deleteWorkspace = asyncHandler(async (req, res) => {
  const workspace = req.workspace;

  await workspace.deleteOne();

  res.status(200).json({
    message : "Workspace deleted successfully"
  })
})

export { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace, inviteUsers, joinWorkspace, roleAsign, deleteWorkspace }