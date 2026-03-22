import express from 'express';
import {
    createArtifact,
    getArtifacts,
    updateArtifact,
    deleteArtifact,
    getArtifactById
} from '../controllers/artifactController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireArtifactOwnership } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.use(requireAuth)

router.post('/', createArtifact);
router.get('/:id', getArtifacts);
router.get('/edit/:id', getArtifactById);
router.put('/:id', requireArtifactOwnership, updateArtifact);
router.delete('/:id', requireArtifactOwnership, deleteArtifact);

export default router;