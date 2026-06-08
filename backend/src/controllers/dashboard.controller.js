import { asyncHandler } from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';
import Project from '../model/project.model.js';
import Task from '../model/task.model.js';
import Activity from '../model/activity.model.js';



const getDashboardStats = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  //find projects for the user
  const totalWorkspaces = await Workspace.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalTasks = await Task.countDocuments();
  const todoTask = await Task.countDocuments({ status : "todo" });
  const inProgressTask = await Task.countDocuments({ status : "in-progress" });
  const reviewTask = await Task.countDocuments({ status : "review" });
  const doneTask = await Task.countDocuments({ status : "done" });
  const recentActivities = await Activity.countDocuments({ user: userId }).sort({ createdAt: -1 })

  const tod = await Task.aggregate([
    {
      $lookup : {
      from : "projects",
      localField : "project",
      foreignField : "_id",
      as : "projectDetails"
      }
    },
    {
      $unwind: "$projectDetails"
    },
    {
      $lookup : {
        from : "workspaces",
        localField : "projectDetails.workspace",
        foreignField : "_id",
        as : "workspaceDetails"
      }
    } 
  ])
  // const todoTask = await Task.aggregate([
  //   {
  //     $match : { status : "todo"}
  //   },
  //   {
  //     $group : {
  //       _id : null,
  //       count : { $sum : 1 }
  //     }
  //   }
  // ])

  // const todoTask = await Task.aggregate([
  // {
  //   $match : { status : "todo"}
  // },
  // {
  //   $project : { description : 0, project : 0, assignee: 0, createdBy: 0, status : 0 }
  // }
  // ])

  res.status(200).json({
    success : true,
    message : "All The activities fetched successfully",
    totalWorkspaces: totalWorkspaces,
    totalProjects: totalProjects,
    totalTasks: totalTasks,
    todoTask : todoTask,
    inProgressTask : inProgressTask,
    reviewTask : reviewTask,
    doneTask : doneTask,
    recentActivities: recentActivities,
    tod : tod
  })  
})

export { getDashboardStats };