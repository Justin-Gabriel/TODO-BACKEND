import { creatingTask, getallTasks, updatingTask, deletingTask, changingStatus } from "../services/taskServices.js";

export const createTask = async (req, res) => {
    const { projectId, task } = req.body;
    try {
        const newTask = await creatingTask(task, projectId)
        res.status(201).json({data: newTask, message: 'Task created successfully', error: false})
    } catch (error) {
        res.json({ data: null, message: error.message, error: true})
    }
}

export const getTasks = async (req, res) => {
    const { projectId } = req.body;
    try {
        const tasks = await getallTasks(projectId)
        res.status(200).json({data: tasks, message: 'Tasks retrieved successfully', error: false})
    } catch (error) {
        res.json({ data: null, message: error.message, error: true})
    }
}

export const editTask = async (req, res) => {
    const { taskId, task } = req.body;
    try {
        const updatedTask = await updatingTask(taskId, task)
        res.status(200).json({data: updatedTask, message: 'Task updated successfully', error: false})
    } catch (error) {
        res.json({ data: null, message: error.message, error: true})
    }
}

export const deleteTask = async (req, res) => { 
    const { taskId } = req.params;
    try {
        const {_id} = await deletingTask(taskId)
        res.status(200).json({data: {_id}, message: 'Task deleted successfully', error: false})
    } catch (error) {
        res.json({ data: null, message: error.message, error: true})
    }
}

export const changeStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await changingStatus(taskId, status);
        res.status(200).json({ data: updatedTask, message: 'Task status updated successfully', error: false })
    } catch (error) {
        res.json({ data: null, message: error.message, error: true })
    }
}