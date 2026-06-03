import { asyncHandler } from '../utils/asyncHandler.js'
import mongoose from 'mongoose';
import Notification from '../model/notification.model.js';


const getNotification = asyncHandler(async (req, res) => {

  //find projects for the user
  const notification = await Notification.find({
    user : req.user.id
  }).populate("user", "name email").sort({ createdAt: -1 });;

  if(notification.length === 0){
    return res.status(200).json({
      success: true,
      notification: []
    });
  }

  res.status(200).json({
    success : true,
    message : "Notification fetched successfully",
    notification: notification
  })  
})


const getNotificationById = asyncHandler(async (req, res) => {

  const { notificationId } = req.params;

  // Find a single notification document so it can be updated and saved.
  const notification = await Notification.findOne({
    user: req.user.id,
    _id: notificationId,
  }).populate("user", "name email");

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found"
    });
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({
    success : true,
    message : "Notification fetched successfully",
    notification: notification
  })  
})

const getNotificationRead = asyncHandler(async (req, res) => {

  const userId = req.user.id;
  
  const notification = await Notification.updateMany({ user: userId}, { $set: { isRead: true } });
  const updatedNotifications = await Notification.find({ user: userId }).populate("user", "name email").sort({ createdAt: -1 });
  res.status(200).json({
    success : true,
    message : "All notifications marked as read",
    notification: updatedNotifications
  })
})

export { getNotification, getNotificationById, getNotificationRead };