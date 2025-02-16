import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue' 
import About from '../About.vue' 
import Contact from '../Contact.vue' 

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