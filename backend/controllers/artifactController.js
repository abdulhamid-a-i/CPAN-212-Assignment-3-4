import Artifact from "../models/Artifact.js";

export const createArtifact = async (req, res) => {
    try {
        const {title, description, projectId} = req.body;

        if (!title || !description) {
            return res.status(400).json({
              message: 'Title and description are required'
            });
        }

        const artifact = await Artifact.create({
            title: title.trim(),
            description: description.trim(),
            projectId: projectId,
            ownerId: req.session.userId
        });

        return res.status(201).json({
            message: 'Artifact created successfully',
            artifact: {
                artifactId: artifact._id,
                title: artifact.title,
                description: artifact.description,
                projectId: artifact.projectId,
                ownerId: artifact.ownerId,
                createdAt: artifact.createdAt,
                updatedAt: artifact.updatedAt
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating artifact',
            error: error.message
        });
    }
};

export const getArtifacts = async (req, res) => {
    try{
        const artifacts = await Artifact.find({
            projectId: req.params.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
        artifacts: artifacts.map((art) => ({
            artifactId: art._id,
            title: art.title,
            description: art.description,
            ownerId: art.ownerId,
            createdAt: art.createdAt,
            updatedAt: art.updatedAt
      }))
    });
    } catch(error){
      return res.status(500).json({
        message: 'Error retrieving artifacts',
        error: error.message
      });
    }
};

export const getArtifactById = async (req, res) => {
  const artifact = await Artifact.findById(req.params.id);

  return res.status(200).json({
            artifactId: artifact._id,
            title: artifact.title,
            description: artifact.description,
            ownerId: artifact.ownerId,
            createdAt: artifact.createdAt,
            updatedAt: artifact.updatedAt
    });
};

export const updateArtifact = async (req, res) => {
  try {
    const artifact = req.artifact;
    const { title, description } = req.body;

    if (title !== undefined) {
      artifact.title = title.trim();
    }

    if (description !== undefined) {
      artifact.description = description.trim();
    }

    await artifact.save();

    return res.status(200).json({
      message: 'Artifact updated successfully',
      artifact: {
        artifactId: artifact._id,
        title: artifact.title,
        description: artifact.description,
        ownerId: artifact.ownerId,
        createdAt: artifact.createdAt,
        updatedAt: artifact.updatedAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating artifact',
      error: error.message
    });
  }
};

export const deleteArtifact = async (req, res) => {
  try {
    await req.artifact.deleteOne();

    return res.status(200).json({
      message: 'Artifact deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting artifact',
      error: error.message
    });
  }
};

