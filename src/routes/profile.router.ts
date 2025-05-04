import { Router } from 'express';
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile
} from '../controllers/profile.controller';

const profileRouter = Router();

profileRouter.get('/', getAllProfiles);
profileRouter.get('/:id', getProfileById);
profileRouter.post('/', createProfile);
profileRouter.put('/:id', updateProfile);
profileRouter.delete('/:id', deleteProfile);

export default profileRouter; 