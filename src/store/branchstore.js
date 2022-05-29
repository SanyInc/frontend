import Branchstore from "@/services/branchstore";

export default {
  state: {
    branchstores: [],
    branchstore: null,
    vat: null,
  },

  getters: {
    totalQuestions: (state) => {
      let total = 0;

      state.branchstore.activity.categories.forEach((item) => {
        total += item.questions.length;
      });
      return total;
    },
  },
  mutations: {
    SET_BRANCHSTORES: (state, branchstores) =>
      (state.branchstores = branchstores),
    SET_BRANCHSTORE: (state, branchstore) => (state.branchstore = branchstore),
  },
  actions: {
    async getBranchstore({ commit }, slug) {
      await Branchstore.get(slug)
        .then((response) => {
          commit("SET_BRANCHSTORE", response.data);
          localStorage.setItem("branchstore", JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  namespaced: true,
};
