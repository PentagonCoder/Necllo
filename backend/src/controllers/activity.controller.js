import { asyncHandler } from '../utils/asyncHandler.js'
import Activity from '../model/activity.model.js';


const getProjectActivities = asyncHandler(async (req, res) => {

  const { projectId } = req.params;

  //find projects for the user
  const activities = await Activity.find({
    project : projectId
  }).populate("user", "name email").populate("task", "title");

  if(activities.length === 0){
    return res.status(200).json({
      success: true,
      activities: []
    });
  }

  res.status(200).json({
    success : true,
    message : "All The activities fetched successfully",
    activities: activities
  })  
})

export { getProjectActivities };