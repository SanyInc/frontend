export default {
  namespaced: true,
  state: {
    snackbars: [],
  },
  getters: {},
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
  },
  actions: {
    setSnackbar({ commit }, snackbar) {
      snackbar.timeout = 4000;
      snackbar.showing = true;
      snackbar.color = snackbar.color || "success";
      snackbar.icon = snackbar.icon || "checkbox-marked-circle";
      commit("SET_SNACKBAR", snackbar);
    },
  },
};
