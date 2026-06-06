import { asyncHandler } from '../utils/asyncHandler.js'
import Task from '../model/task.model.js';
import Project from '../model/project.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';
import Activity from '../model/activity.model.js';
import Notification from '../model/notification.model.js';
import { getIO, onlineUsers } from '../sockets/socket.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';


const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  const { projectId } = req.params;
  const userId = req.user.id;
  
  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  if(!title?.trim() || !priority?.trim()){
    return res.status(400).json({
    message : "provide the task title and priority"
  })}

  const newTask = await Task.create({ 
    title,
    description,
    project : projectId, 
    createdBy : userId,
    assignee : userId,
    priority,
  });

  // Log activity
  const activityLog = await Activity.create({
    workspace : project.workspace,
    project : projectId,
    user : userId,
    task : newTask._id,
    action : `created task "${newTask.title}"`
  })

  // Send email notification to the assignee (which is the creator in this case)

  res.status(201).json({
    success : true,
    message : "task created successfully",
    task : newTask
  })
})

const getProjectTasks = asyncHandler(async (req, res) => {

  const { projectId } = req.params;
  
  //find projects for the user
  const task = await Task.find({
    project : projectId
  }).populate("assignee", "name email");

  if(task.length === 0){
    return res.status(200).json({
      success: true,
      tasks: []
    });
  }

  res.status(200).json({
    success : true,
    message : "All The tasks fetched successfully",
    tasks: task
  })
})

const getTaskById = asyncHandler( async(req, res) => {

  // PROJECT ID FROM PARAMS
  const task = req.task;

  // USER ID FROM AUTH MIDDLEWARE
  // const userId = req.user.id;

  // //find the project by ID 
  // const task = await Task.findOne({
  //   _id : taskId,
  // })

  // //check if project exist 
  // if (!task) {
  //   return res.status(404).json({
  //     message: "task not found"
  //   });
  // }

  //if user is a member, return project details
  res.status(200).json({
    success: true,
    message: "task details fetched successfully",
    task
  });

})

const updateTask = asyncHandler(async (req, res) => {
  
  const { title, description, priority, dueDate } = req.body;

  const task = req.task;

  const validPriority = ["low", "medium", "high"];

  if(priority && !validPriority.includes(priority)){
    return res.status(400).json({
      message: "Invalid priority value"
    });
  }

  if(title?.trim()) task.title = title;
  if(description?.trim()) task.description = description;
  if(priority?.trim()) task.priority = priority;
  if(dueDate) task.dueDate = dueDate;
  await task.save();

  // Log activity

  const project = req.project;

  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : req.user.id,
    task : task._id,
    action : `updated task "${task.title}"`
  })

  res.status(200).json({
    success: true,
    message: "task updated successfully",
    task
  });
})

const deleteTask = asyncHandler(async (req, res) =>{

  const task = req.task;

  // Log activity
  const project = req.project;

  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : req.user.id,
    task : task._id,
    action : `deleted task "${task.title}"`
  })


  await task.deleteOne();


  res.status(200).json({
    success: true,
    message : "task deleted successfully"
  })

})

const changeTaskStatus = asyncHandler(async (req, res) => {

  const { status } = req.body;
  const task = req.task;
  const userId = req.user.id;
  
  const validStatuses = ["todo", "in-progress", "review", "done"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value"
    });
  }

  console.log(task);
      
  task.status = status;
  await task.save();
  
  const project = req.project;
      
  // Log activity
  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : userId,
    task : task._id,
    action : `changed status to ${status}`
  })

  res.status(200).json({
    success: true,
    message: "task status updated successfully",
    task
  });
})

const assignTask = asyncHandler(async (req, res) => {
  // const { taskId } = req.params;
  const { assigneeId } = req.body;

  // const task = await Task.findOne({
  //   _id: taskId,
  // });
  const task = req.task;
  // if (!task) {
  //   return res.status(404).json({
  //     message: "task not found"
  //   });
  // }

  task.assignee = assigneeId;
  await task.save();
  await task.populate("assignee", "name email");


  // Log activity
  const project = req.project;

  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : req.user.id,
    task : task._id,
    action : `assigned task "${task.title} to ${task.assignee.name}"`
  })

  const notification = await Notification.create({
    user : assigneeId,
    message : `You were assigned task "${task.title}"`
  })

  const io = getIO();
  const socketId = onlineUsers.get(assigneeId.toString());

  if (socketId) {
    io.to(socketId).emit("notification", { message: notification.message });
  }

  res.status(200).json({
    success: true,
    message: "task assigned successfully",
    task
  });
})

const uploadAttachment = asyncHandler(async (req, res) => {
  const task = req.task;
  const userId = req.user.id;

  const fileslocalpath = req.files?.attachment?.[0]?.path;
  console.log("file path", fileslocalpath);
  const file = await uploadToCloudinary(fileslocalpath);

  if(!file?.secure_url){
    return res.status(400).json({
      message : "No file uploaded"
    })
  }

  const newAttachment = {
    fileName: req.files.attachment[0].originalname,
    fileUrl: file.secure_url,
    uploadedBy: userId
  }


  task.attachments.push(newAttachment);
  await task.save();

  // Log activity
  const project = req.project;

  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : userId,
    task : task._id,
    action : `uploaded an attachment for task "${task.title}"`
  })

  res.status(200).json({
    success: true,
    message: "Attachment uploaded successfully",
    attachment: newAttachment
  });
})

const getAttachments = asyncHandler(async (req, res) => {
  const task = req.task;

  const populatedTask  = await task.populate("attachments.uploadedBy", "name email");

  res.status(200).json({
    success: true,
    message: "Attachments retrieved successfully",
    attachments: populatedTask.attachments
  });
})

const deleteAttachment = asyncHandler(async (req, res) => {
  const task = req.task;
  const { attachmentId } = req.params;

  const attachment = task.attachments.find(att => att._id.toString() === attachmentId);

  if (!attachment) {
    return res.status(404).json({
      message: "Attachment not found"
    });
  }

  attachment.deleteOne();
  await task.save();

  // Log activity
  const project = req.project;

  const activityLog = await Activity.create({
    workspace : project.workspace._id,
    project : task.project,
    user : req.user.id,
    task : task._id,
    action : `deleted attachment from task "${task.title}"`
  })

  res.status(200).json({
    success: true,
    message: "Attachment deleted successfully"
  });
})

export { createTask, getProjectTasks, getTaskById, updateTask, deleteTask, changeTaskStatus, assignTask, uploadAttachment, getAttachments, deleteAttachment }