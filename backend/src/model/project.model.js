import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    workspace : {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
    }
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

export default Project; 
