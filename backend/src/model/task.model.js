import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["todo", "in-progress", "review", "done"],
    default: "todo"
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },

  attachments: [{
    fileName: String,
    fileUrl: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }],

  dueDate: Date
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

export default Task;