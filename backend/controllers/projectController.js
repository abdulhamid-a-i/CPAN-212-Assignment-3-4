import Artifact from '../models/Artifact.js';
import Project from '../models/Project.js';
import { getArtifacts } from './artifactController.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, researchField } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required'
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      researchField: researchField.trim(),
      ownerId: req.session.userId
    });

    return res.status(201).json({
      message: 'Project created successfully',
      project: {
        projectId: project._id,
        title: project.title,
        description: project.description,
        researchField: project.researchField,
        ownerId: project.ownerId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating project',
      error: error.message
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });


    return res.status(200).json({
      projects: projects.map((pro) => ({
        projectId: pro._id,
        title: pro.title,
        description: pro.description,
        researchField: pro.researchField,
        ownerId: pro.ownerId,
        createdAt: pro.createdAt,
        updatedAt: pro.updatedAt
      }))
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving projects',
      error: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  return res.status(200).json({
    projectId: project._id,
    title: project.title,
    description: project.description,
    researchField: project.researchField,
    ownerId: project.ownerId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  });
};

export const updateProject = async (req, res) => {
  try {
    const project = req.project;
    const { title, description, researchField } = req.body;

    if (title !== undefined) {
      project.title = title.trim();
    }

    if (description !== undefined) {
      project.description = description.trim();
    }

        if (researchField !== undefined) {
      project.researchField = researchField.trim();
    }

    await project.save();

    return res.status(200).json({
      message: 'Project updated successfully',
      project: {
        projectId: project._id,
        title: project.title,
        description: project.description,
        researchField: project,researchField,
        ownerId: project.ownerId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating project',
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log('id: '+projectId)
    const artifacts = await Artifact.find({
      projectId: projectId,
      ownerId: { $ne: req.session.userId}
    })

    if(artifacts.length > 0){
      return res.status(403).json({
        message: 'Access denied: Project contains other user artifacts'
      });
    }


    await req.project.deleteOne();

    return res.status(200).json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting project',
      error: error.message
    });
  }
};