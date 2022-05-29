export default {
  state: {
    drawer: false,
    page: 1,
    query: "",
  },

  getters: {
    drawerChange(state) {
      return (state.drawer = false);
    },
  },

  mutations: {
    updatePage(state, page) {
      state.page = page;
    },
    updateQuery(state, query) {
      state.query = query;
    },
  },

  namespaced: true,
};
