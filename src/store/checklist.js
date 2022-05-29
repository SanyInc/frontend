import Checklist from "../services/checklist";

export default {
  state: {
    activities: [],
    activity: null,
  },

  getters: {},
  mutations: {
    SET_ACTIVITIES: (state, activities) => (state.activities = activities),
    SET_ACTIVITY: (state, activity) => (state.activity = activity),
  },
  actions: {
    async getActivity({ commit }, slug) {
      await Checklist.get(slug)
        .then((response) => {
          commit("SET_ACTIVITY", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  namespaced: true,
};
