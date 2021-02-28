import { createWebHistory, createRouter } from 'vue-router';
import Topics from '@/views/forum/Topics';
import Threads from '@/views/forum/Threads';
import Posts from '@/views/forum/Posts';
import Register from '@/views/user/Register';
import Login from '@/views/user/Login';
import Profile from '@/views/user/Profile';
import NotFound from '@/views/other/NotFound';
import { auth } from '@/firebase/config';

const requireNonAuth = (to, from, next) => {
    let user = auth.currentUser;
    if(user)
        next({ name: 'Topics' });
    else
        next();
}

const requireAuth = (to, from, next) => {
    let user = auth.currentUser;
    if(user)
        next();
    else
        next({ name: 'Topics' });
}

const routes = [
    {
        path: '/',
        name: 'Topics',
        component: Topics
    },
    {
        path: '/threads/:topicId-:topicTitle',
        name: 'Threads',
        component: Threads
    },
    {
        path: '/posts/:topicId/:threadId-:threadTitle',
        name: 'Posts',
        component: Posts
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
        path: '/user/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: requireAuth
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;