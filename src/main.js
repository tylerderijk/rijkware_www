import { createApp, nextTick } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import AboutUs from "@/components/AboutUsComponent.vue";
import posthogPlugin from './plugins/posthog.js';

// Create router with history mode for better SEO
const router = createRouter({
    // Use history mode instead of hash mode for better SEO
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: AboutUs,
            meta: { title: 'Rijkware - Student Developers' }
        },
        { 
            path: '/manifesto', 
            redirect: '/'
        },
        { 
            path: '/cases', 
            redirect: '/'
        },
        { 
            path: '/people', 
            redirect: '/'
        },
        { 
            path: '/contact', 
            redirect: '/'
        },
        // Routes for policy pages removed as they are now displayed as modals
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],

    // Scroll back to top on navigation change
    scrollBehavior(to, from, savedPosition) {
        // If the user is using browser navigation (back/forward)
        if (savedPosition) {
            return savedPosition;
        }

        // If the route has a hash, scroll to the element
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80 // Offset for fixed header
            };
        }

        // Otherwise scroll to top
        return { left: 0, top: 0, behavior: 'smooth' };
    }
});

// Create Vue app
const app = createApp(App);

// Use plugins
app.use(posthogPlugin).use(router).mount('#app');

// Update document title on route change
router.beforeEach((to, from, next) => {
    // Update document title
    document.title = to.meta.title || 'Rijkware';
    next();
});

// Track page views with PostHog
router.afterEach((to, from, failure) => {
    if (!failure) {
        nextTick(() => {
            // Only track if PostHog is available
            if (app.config.globalProperties.$posthog) {
                app.config.globalProperties.$posthog.capture('$pageview', { 
                    path: to.fullPath,
                    title: to.meta.title || 'Rijkware'
                });
            }
        });
    }
});
