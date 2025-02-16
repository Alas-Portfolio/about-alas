import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue' 
import About from './components/About.vue' 
import Contact from './components/Contact.vue' 

const routes = [
    { path:'/Home', component: Home },
    { path:'/About', component: About },
    { path:'/Contact', component: Contact }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;