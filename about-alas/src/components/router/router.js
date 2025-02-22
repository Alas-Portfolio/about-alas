import { createRouter, createWebHistory } from 'vue-router'
import Home from '../HomePage.vue' 
import About from '../AboutPage.vue' 
import Contact from '../ContactPage.vue' 

const routes = [
    { path:'/', component: Home },
    { path:'/Home', component: Home },
    { path:'/About', component: About },
    { path:'/Contact', component: Contact }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;