import Project from "../models/projectModels.js";
import User from "../models/userModels.js";
import Task from "../models/taskModels.js";

export const creatingProject = async (title, description, userId) => {
    try {
        const project = await Project.create({ title, description, userId });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({data: null, message:'User not found', error: true});
        }
        user.projects.push(project._id)
        await user.save();
        return project

    } catch (e) {
        throw new Error(e.message);
    }

}

export const getAllProjects = async (userId) => {
    try {
        const allProjects = await Project.find({ userId }, 'title description').sort({createdAt: -1});
        return allProjects
    } catch (error) {
        throw new Error(e.message);
    }
}

export const updateProject = async (projectId, title, description, userId) => {
    try {
        const project = await Project.findByIdAndUpdate(projectId, { title, description }, { new: true });
        return project
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deletingProject = async (projectId, userId) => {    
    try {
        const project = await Project.findByIdAndDelete(projectId);

        await Task.deleteMany({ projectId });

        await User.findByIdAndUpdate(userId, { $pull: { projects: projectId } })
        
        return project;

    } catch (error) {
        throw new Error(error.message);
    }

}

export const getProjectDetails = async (projectId) => { 
    try {
        const project = await Project.findById(projectId).populate({
            path: 'tasks',
            options: { sort: { 'createdAt': -1 } }
        });
        return project
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getallTasks = async (projectId) => {
    try {
        const allTasks = await Task.find({ projectId }, 'task status createdAt');
        return allTasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const generateMarkdown = async (projectId) => {
    const project = await getProjectDetails(projectId);
    const tasks = await getallTasks(projectId);
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED');
    const pendingTasks = tasks.filter(task => task.status === 'PENDING');
    const summary = `# Project name - ${project.title} \n\n## Summary\n\n${completedTasks.length} / ${tasks.length} tasks completed\n\n## Pending Tasks\n\n${pendingTasks.map(t => `- [ ] ${t.task}`).join('\n')}\n\n## Completed Tasks\n\n${completedTasks.map(t => `- [x] ${t.task}`).join('\n')}`;
    return summary
}
