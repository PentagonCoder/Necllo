import { asyncHandler } from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';
import Project from '../model/project.model.js';
import Task from '../model/task.model.js';
import Activity from '../model/activity.model.js';



const getDashboardStats = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  //find projects for the user
  const totalWorkspace = await Workspace.countDocuments({
    "members.user": userId
  });

  const workspaces = await Workspace.find({"members.user": userId}).select("_id");
  const workspaceIds = workspaces.map(w => w._id);
  const totalProject = await Project.countDocuments({
    workspace : { $in : workspaceIds }
  });

  const projects = await Project.find({
    workspace: {
      $in: workspaceIds
    }
  }).select("_id");
  const projectIds = projects.map(p => p._id);
  const totalTasks = await Task.countDocuments({
    project: {
      $in: projectIds
    }
  });


  const myTasks = await Task.aggregate([{
      $match: {
        assignee: userId
      }
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1
        }
      }
    }
  ]);

  res.status(200).json({
    success : true,
    message : "All The activities fetched successfully",
    totalWorkspace: totalWorkspace,
    totalProject: totalProject,
    totalTasks: totalTasks,
    myTasks: myTasks
  })  
})

export { getDashboardStats };