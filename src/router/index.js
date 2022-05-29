import Vue from "vue";
import VueRouter from "vue-router";
import routes from "../router/routes";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.getters["auth/authenticated"] && to.meta.requiresAuth) {
    return next({
      name: "login",
    });
  } else next();
});

export default router;
