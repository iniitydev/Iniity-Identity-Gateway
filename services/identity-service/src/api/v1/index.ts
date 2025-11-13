import { Router } from 'express';
import userRoutes from './userRoutes';

const router = Router();

// Mount different resource routes
router.use('/users', userRoutes);

export default router;
