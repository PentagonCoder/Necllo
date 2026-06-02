import {asyncHandler} from '../utils/asyncHandler.js'
import Comment from '../model/comment.model.js';

const validateCommentAccess = () => {

  return asyncHandler(async (req, res, next) => {

  // PROJECT ID FROM PARAMS
  const { commentId, taskId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user.id;

  //find the task by Id 
  const comment = await Comment.findById(commentId)
  .populate("author" , "name email")

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found"
    });
  }

  console.log(comment);
  if(comment.author._id.toString() !== userId){
    return res.status(403).json({
      message: "Access denied."
    });
  }

  if(comment.task.toString() !== taskId){
    return res.status(404).json({
      message: "Comment does not belong to this task"
    });
  }


  // Check if the user is a member of the project
  // const isMemberRole = comment.task.project.workspace.members.some(member => member.user.toString() === userId && roles.includes(member.role));
  
  // if (!isMemberRole) {
  //   return res.status(403).json({
  //     message: "Access denied."
  //   });
  // }

  req.comment = comment; // Attach the comment to the request object for later use
  next();
  })

};


export { validateCommentAccess };