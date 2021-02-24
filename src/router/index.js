import { createWebHistory, createRouter } from 'vue-router';
import Topics from '@/views/Topics';

const routes = [
    {
        path: '/',
        name: 'Topics',
        component: Topics
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;