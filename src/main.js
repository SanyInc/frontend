import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import Admin from "./layouts/Admin.vue";
import Blank from "./layouts/Blank.vue";

Vue.component("admin", Admin);
Vue.component("blank", Blank);

Vue.config.productionTip = false;

require("@/store/subscriber");

store.commit(
  "auth/SET_CREDENTIALS",
  JSON.parse(localStorage.getItem("credentials"))
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
