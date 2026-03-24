import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Artifact from '../models/Artifact.js';

export const requireProjectOwnership = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'Invalid Project identifier'
            });
        }

        const project = await Project.findById(id);

        if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    const isOwner = project.ownerId.toString() === req.session.userId;

        if (!isOwner) {
      return res.status(403).json({
        message: 'Access denied: you are not authorized for this action'
      });
    }

    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Authorization check failed',
      error: error.message
    });
    }
};


export const requireArtifactOwnership = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'Invalid artifact identifier'
            });
        }

        const artifact = await Artifact.findById(id);

        if (!artifact) {
      return res.status(404).json({
        message: 'Artifact not found'
      });
    }

    const isOwner = artifact.ownerId.toString() === req.session.userId;
    
        if (!isOwner) {
      return res.status(403).json({
        message: 'Access denied: you are not authorized for this action'
      });
    }

    req.artifact = artifact;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Authorization check failed',
      error: error.message
    });
    }
};