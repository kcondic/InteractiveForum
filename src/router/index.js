import { createWebHistory, createRouter } from 'vue-router';
import Topics from '@/views/Topics';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
    {
        path: '/',
        name: 'Topics',
        component: Topics
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;