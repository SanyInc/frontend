import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import inspection from "./inspection";
import branchstore from "./branchstore";
import common from "./common";
import snackbar from "./snackbar";
import checklist from "./checklist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    inspection,
    branchstore,
    common,
    snackbar,
    checklist,
  },
  state: {
    page: 1,
    query: null,
  },

  mutations: {
    updatePage(state, page) {
      state.page = page;
    },
    updateQuery(state, query) {
      state.query = query;
    },
  },
});
