import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [ {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;