import { asyncHandler } from '../utils/asyncHandler.js'
import Project from '../model/project.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { workspaceId } = req.params;
  const userId = req.user.id;
  
  if(!name?.trim()){
    return res.status(400).json({
    message : "provide the project name"
  })}

  const newProject = await Project.create({ 
    name,
    description,
    createdBy : userId,
    workspace : workspaceId
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
    message : "Project created successfully",
    project : newProject
  })
})

const getMyProjects = asyncHandler(async (req, res) => {
  //get userId from request token 
  // const userId = req.user.id;
  const { workspaceId } = req.params;
  //find projects for the user
  const project = await Project.find({
    workspace : workspaceId
  }).populate("workspace", "members.user");

  res.status(200).json({
    success : true,
    message : "All The Projects fetched successfully",
    project
  })
})

const getProjectById = asyncHandler( async(req, res) => {

  // PROJECT ID FROM PARAMS
  const { projectId , workspaceId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  // const userId = req.user.id;

  //find the project by ID 
  const project = await Project.findOne({
    _id : projectId,
    workspace : workspaceId
  })

  //check if project exist 
  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  //check if user is a member of the project
  // const isMember = project.members.some((member)=>(member.user.toString() === userId));
  
  // console.log(isMember);

  //if not retrun Access denied
  // if(!isMember){
  //   return res.status(403).json({
  //     message: "Access denied. You are not a member of this project."
  //   });
  // }

  //if user is a member, return project details
  res.status(200).json({
    success: true,
    message: "Project details fetched successfully",
    project
  });

})

const updateProject = asyncHandler(async (req, res) => {
  const { projectId, workspaceId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findOne({
    _id: projectId,
    workspace: workspaceId
  });

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  if(name?.trim()) project.name = name;
  if(description?.trim()) project.description = description;

  await project.save();

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project
  });
})

const deleteProject = asyncHandler(async (req, res) =>{
  const { workspaceId, projectId } =req.params;

  //find the Project by ID 
  const project = await Project.findOne({
    _id: projectId,
    workspace: workspaceId
  });
  if(!project){
    return res.status(404).json({
      message: "Project not found"
    });
  }

  await project.deleteOne();

  res.status(200).json({
    message : "Project deleted successfully"
  })

})

// const roleAsign = asyncHandler(async (req, res) =>{
//   const workspaceId  =req.params.workspaceId; 
//   const userId = req.params.Id;
//   const userRole =req.params.role;

//   // console.log(invitationToken);
//   console.log(userId);

//   const allowedRoles = ['owner', 'admin', 'member'];

//   if (!allowedRoles.includes(userRole)) {
//     return res.status(400).json({
//       message: "Invalid role"
//     });
//   }

//   //find the workspace by ID 
//   const workspace = await Workspace.findById(workspaceId)
//   console.log(workspace);

  
//   //check if workspace exist 
//   if (!workspace) {
//     return res.status(404).json({
//       message: "Invalid invitation token"
//     });
//   }

//   //check if user alredy exist in workspace
//   //check if user is a member of the workspace
//   const Member = workspace.members.find((member)=>(member.user.toString() === userId));

//   if(!Member){
//     return res.status(403).json({
//       message: "member does't exist"
//     });
//   }

//   Member.role = userRole;
//   await workspace.save();

//   res.status(200).json({
//     message : "YouAsing the role"
//   })

// })



export { createProject, getMyProjects, getProjectById, updateProject, deleteProject }