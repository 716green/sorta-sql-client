import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

//* Components
const NotFound = () => import("@/components/meta/NotFound.vue");
const Layout = () => import("@/components/Layout.vue");
const Login = () => import("@/components/auth/Login.vue");
const Dashboard = () => import("@/components/views/Dashboard.vue");
const Dashboard2 = () => import("@/components/views/Dashboard2.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      name: "Authentication",
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "Layout",
      component: Layout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "/",
          name: "Dashboard2",
          component: Dashboard2,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = store.getters.getIsAuthenticated;
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    if (!isAuthenticated) next("/auth");
    else next();
  } else next();
});

export default router;
