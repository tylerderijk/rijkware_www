import {createApp, nextTick} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import AboutUs from "@/components/AboutUsComponent.vue";
import Manifesto from "@/components/ManifestoComponent.vue";
import Cases from "@/components/CasesComponent.vue";
import People from "@/components/PeopleComponent.vue";
import Contact from "@/components/ContactComponent.vue";
import TermsAndConditions from "@/components/TermsAndConditions.vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import Cookies from "@/components/CookiesPolicy.vue";
import posthogPlugin from './plugins/posthog.js';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: AboutUs },
        { path: '/manifesto', component: Manifesto },
        { path: '/cases', component: Cases },
        { path: '/people', component: People },
        { path: '/contact', component: Contact },
        { path: '/terms-and-conditions', component: TermsAndConditions },
        { path: '/privacy-policy', component: PrivacyPolicy },
        { path: '/cookies', component: Cookies },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],

    // Scroll back to top on navigation change
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
})
const app = createApp(App);
app.use(posthogPlugin).use(router).mount('#app')

router.afterEach((to, from, failure) => {
    if (!failure) {
        nextTick(() => {
            app.config.globalProperties.$posthog.capture('$pageview', { path: to.fullPath });
        });
    }
});
