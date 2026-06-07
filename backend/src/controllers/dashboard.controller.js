import { asyncHandler } from '../utils/asyncHandler.js'
import Workspace from '../model/workspace.model.js';


const getDashboardStats = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  //find projects for the user
  const workspace = await Workspace.find({
    owner : userId
  }).populate("user", "name email").sort({ createdAt: -1 });;

  if(workspace.length === 0){
    return res.status(200).json({
      success: true,
      activities: []
    });
  }

  res.status(200).json({
    success : true,
    message : "All The activities fetched successfully",
    workspace: workspace
  })  
})

export { getDashboardStats };