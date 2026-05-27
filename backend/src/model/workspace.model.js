import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invitationToken: {
        type: String,
        default: null
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        }
    }]
}, { timestamps: true });

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

export default Workspace; 
