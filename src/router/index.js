import { createWebHistory, createRouter } from 'vue-router';
import Topics from '@/views/Topics';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Threads from '@/views/Threads';
import { auth } from '@/firebase/config';

const requireNonAuth = (to, from, next) => {
    let user = auth.currentUser;
    if(user)
        next({ name: 'Topics' });
    else
        next();
}

const routes = [
    {
        path: '/',
        name: 'Topics',
        component: Topics
    },
    {
        path: '/user/register',
        name: 'Register',
        component: Register,
        beforeEnter: requireNonAuth
    },
    {
        path: '/user/login',
        name: 'Login',
        component: Login,
        beforeEnter: requireNonAuth
    },
    {
        path: '/threads/:topicId-:topicTitle',
        name: 'Threads',
        component: Threads
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;