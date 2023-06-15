import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Index from '@/components/Index.vue'
import Mobile from "@/components/Mobile.vue";


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: "Index", component: Index},
        {path: '/mobile', name: "Mobile", component: Mobile}
    ]
})
let isFirstLoad = true;

router.beforeEach(async (to) => {
    const ua = navigator.userAgent;
    if (isFirstLoad && ua.indexOf('Windows') === -1) {
        isFirstLoad = false;
        return {path: '/mobile', replace: true}
    } else if (isFirstLoad && ua.indexOf('Windows') !== -1 && to.path === '/mobile') {
        isFirstLoad = false;
        return {path: '/', replace: true}
    } else if (isFirstLoad && to.path === '/mobile') {
        isFirstLoad = false;
        return {path: '/mobile', replace: true}
    }
})
export default router