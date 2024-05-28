import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tasks: [ {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;