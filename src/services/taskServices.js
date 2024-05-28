import Project from "../models/projectModels.js";
import Task from "../models/taskModels.js";

export const creatingTask = async (task, projectId) => {
    try {
        const tasks = await Task.create({ task, projectId });
        const project = await Project.findById(projectId);

        if (!project) { 
            return res.status(404).json({data: null, message:'Project not found', error: true});
        }
        project.tasks.push(tasks._id)
        await project.save();
        return tasks

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getallTasks = async (projectId) => {
    try {
        const allTasks = await Task.find({ projectId }, 'description status createdAt');
        return allTasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updatingTask = async (taskId, task) => {
    try {
        const tasks = await Task.findByIdAndUpdate(taskId, { task }, { new: true });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deletingTask = async (taskId) => { 
    try {
        const task = await Task.findByIdAndDelete(taskId);
        await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: taskId}})
        return task;
    }  catch (error) {
        throw new Error(error.message);
    }
}

export const changingStatus = async (taskId, status) => { 
    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        return task;
    } catch (error) { 
        throw new Error(error.message);
    }
}