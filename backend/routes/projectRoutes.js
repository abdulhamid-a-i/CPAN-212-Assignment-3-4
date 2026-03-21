import express from 'express';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireProjectOwnership } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.use(requireAuth)

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', requireProjectOwnership, updateProject);
router.delete('/:id', requireProjectOwnership, deleteProject);

export default router;