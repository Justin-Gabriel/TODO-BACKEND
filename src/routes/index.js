import express from 'express';
import authRoute from './authRoutes.js';
import projectRoute from './projectRoutes.js';
import taskRoute from './taskRoutes.js';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/project',
        route: projectRoute,
    },
    {
        path: '/task',
        route: taskRoute,
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route)
});

export default router;