import {asyncHandler} from '../utils/asyncHandler.js'
import Project from '../model/project.model.js';
import Task from '../model/task.model.js';

const validateTaskAccess = (roles = []) => {

  return asyncHandler(async (req, res, next) => {

  // PROJECT ID FROM PARAMS
  const { projectId, taskId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user.id;

  //find the project by ID 
  const project = await Project.findById(projectId).populate("workspace");

  //find the task by Id 
  const task = await Task.findById(taskId)

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if(task.project.toString() !== projectId){
    return res.status(404).json({
      message: "Task does not belong to this project"
    });
  }


  // Check if the user is a member of the project
  const isMemberRole = project.workspace.members.some(member => member.user.toString() === userId && roles.includes(member.role));
  
  if (!isMemberRole) {
    return res.status(403).json({
      message: "Access denied."
    });
  }

  req.task = task; // Attach the task to the request object for later use
  next();
  })

};


export { validateTaskAccess };