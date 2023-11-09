import { createRouter, createWebHistory } from "vue-router";
// https://router.vuejs.org/guide/

import DashboardPage from "../views/DashboardPage.vue";

import LandingPage from "../views/landingPage.vue";
import CityPage from "../views/CityPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // page for welcome
      path: "/",
      name: "home",
      component: LandingPage,
      meta: {
        title: "The Weather",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPage,
      meta: {
        title: "Dashboard",
      },
    },
    // we will need to configure the city view later
    {
      path: "/weather/:state/",
      name: "city",
      component: CityPage,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | The Local Weather`;
  next();
});

export default router;
