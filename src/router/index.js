import {createRouter, createWebHistory} from 'vue-router'
import Index from '@/components/Index.vue'
import Mobile from "@/components/Mobile.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{path: '/', name: "Index", component: Index},
        {path: '/mobile', name: "Mobile", component: Mobile},]
})
let isFirstLoad = true;

router.beforeEach((to, from, next) => {
    const ua = navigator.userAgent;
    if (isFirstLoad && ua.indexOf('Windows') === -1 && to.path !== '/mobile') {
        isFirstLoad = false;
        next('/mobile');
    } else {
        next();
    }
});

export default router