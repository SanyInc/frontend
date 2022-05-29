import Auth from "../services/auth";

export default {
  state: {
    token: null,
  },

  getters: {
    authenticated(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
  },
  mutations: {
    SET_CREDENTIALS(state, token) {
      state.token = token;
    },
  },

  actions: {
    async signIn({ commit }, credentials) {
      await Auth.login(credentials).then((response) => {
        commit("SET_CREDENTIALS", response.data);
      });
    },
  },
  namespaced: true,
};
