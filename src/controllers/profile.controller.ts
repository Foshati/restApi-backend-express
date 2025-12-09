import { Request, Response } from 'exfa';
import prisma from '../lib/prisma';


export const createProfile = (req: Request, res: Response) => {
    prisma.profile.create({
        data: req.body
    })
        .then(profile => res.status(201).json(profile))
        .catch(error => res.status(500).json({ error: 'Error creating profile' }));
};

export const getAllProfiles = (req: Request, res: Response) => {
    prisma.profile.findMany()
        .then(profiles => res.status(200).json(profiles))
        .catch(error => res.status(500).json({ error: 'Error fetching profiles' }));
};

export const getProfileById = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.profile.findUnique({
        where: { id }
    })
        .then(profile => {
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.status(200).json(profile);
        })
        .catch(error => res.status(500).json({ error: 'Error fetching profile' }));
};

export const updateProfile = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.profile.update({
        where: { id },
        data: req.body
    })
        .then(profile => res.status(200).json(profile))
        .catch(error => res.status(500).json({ error: 'Error updating profile' }));
};

export const deleteProfile = (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.profile.delete({
        where: { id }
    })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error: 'Error deleting profile' }));
}; 