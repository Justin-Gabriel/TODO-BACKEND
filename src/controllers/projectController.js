import fs from 'fs/promises';
import {
    creatingProject,
    getAllProjects,
    updateProject,
    deletingProject,
    getProjectDetails,
    generateMarkdown
} from '../services/projectServices.js'

export const createProject = async (req, res) => {
    const { title, description } = req.body;
    const userId  = req.userId;

    try {
        const newProject = await creatingProject(title, description, userId)
        res.status(201).json({data: newProject, message: 'Project created successfully', error: false})
    } catch (error) {
        res.json({ data: null, message: error.message, error: true})
    }
}

export const getProjects = async (req, res) => {
    const userId = req.userId;
    
    try {
        const allProjects = await getAllProjects(userId)
        res.status(201).json({data: allProjects, message: 'Project fetched successfully', error: false})
    } catch (error) {
        res.status(400).json({data: null, message: error.message, error: false})
    }
}

export const editProject = async (req, res) => {
    const { projectId, title, description } = req.body;
    const userId  = req.userId;
    try {
        const updatedProject = await updateProject(projectId, title, description, userId)
        res.status(200).json({data: updatedProject, message: 'Project updated successfully', error: false})
    } catch (error) {
        res.status(500).json({ data: null, message: error.message, error: true });
    }
}

export const deleteProject = async (req, res) => { 
    const { projectId } = req.params;
    const userId = req.userId;
    try {
        const { _id } = await deletingProject(projectId, userId);
        res.status(200).json({ data: {_id}, message: 'Project deleted successfully', error: false });
    } catch (error) {
        res.status(400).json({ data: null, message: error.message, error: true });
    }
}

export const projectDetails = async (req, res) => { 
    const { projectId } = req.params;
    try {
        const project = await getProjectDetails(projectId);
        res.status(200).json({ data: project, message: 'Project fetched successfully', error: false });
    } catch (error) {
        res.status(400).json({ data: null, message: error.message, error: true });
    }
}

export const exportProject = async (req, res) => { 
    const { projectId } = req.params;
    try {
        const markdown = await generateMarkdown(projectId);
        await fs.writeFile(`${projectId}.md`, markdown);
        res.status(200).json({ data: markdown, message: 'Project summary successfully fetched', error: false });
    } catch (error) {
        res.status(400).json({ data: null, message: error.message, error: true });
    }
    

}

