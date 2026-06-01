import { asyncHandler } from '../utils/asyncHandler.js'
import Task from '../model/task.model.js';
import Comment from '../model/comment.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const task = req.task; // Assuming the task is attached to the request object by the validateTaskAccess middleware
  const userId = req.user.id;

  if (!content?.trim()) {
  return res.status(400).json({
    message: "Comment content is required"
  });
}

  const newComment = await Comment.create({
    content,
    task: task._id,
    author: userId
  });

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    comment: newComment
  });
});


const getTaskComments = asyncHandler(async (req, res) => {

  // const task = req.task; // Assuming the task is attached to the request object by the validateTaskAccess middleware
  const {taskId} = req.params;
  
  //find projects for the user
  const comments = await Comment.find({
    task : taskId
  }).populate("author", "name email");

  if(comments.length === 0){
    return res.status(200).json({
      success: true,
      comments: []
    });
  }

  res.status(200).json({
    success : true,
    message : "All The comments fetched successfully",
    comments: comments
  })
})

const updateComment = asyncHandler(async (req, res) => {
  
  const { content } = req.body;

  const comment = req.comment; // Assuming the comment is attached to the request object by the validateCommentAccess middleware
  
  if(!content?.trim()){
    return res.status(400).json({
      message: "Comment content is required"
    });
  }

  comment.content = content;
  await comment.save();

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    comment
  });
})
  
const deleteComment = asyncHandler(async (req, res) =>{

  const comment = req.comment; // Assuming the comment is attached to the request object by the validateCommentAccess middleware
  
  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message : "comment deleted successfully"
  })

})

export { createComment, getTaskComments, updateComment, deleteComment };