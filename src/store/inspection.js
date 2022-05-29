import Inspection from "@/services/inspection";

export default {
  state: {
    inspection: null,
    inspections: [],
    cart: [],
  },

  getters: {
    answerTotalScore: (state) => {
      let total = 0;

      state.cart.forEach((item) => {
        total += item.body;
      });

      return total;
    },
    totalAnswers: (state) => {
      let total = Object.keys(state.cart).length;
      return total;
    },
  },
  mutations: {
    SET_INSPECTION: (state, inspection) => (state.inspection = inspection),
    SET_INSPECTIONS: (state, inspections) => (state.inspections = inspections),
    CREATE_NEW_INSPECTION: (state, inspection) =>
      (state.inspection = inspection),
    ADD_TO_CART: (state, { inspection, question, body, comment }) => {
      let questionInCart = state.cart.find((item) => {
        return item.question === question;
      });
      if (questionInCart) {
        questionInCart.body = body;
        questionInCart.inspection = inspection;
        return;
      }
      state.cart.push({ inspection, question, body, comment });
    },
    CLEAR_CART: (state) => (state.cart = []),
    CLEAR_INSPECTION: (state) => (state.inspection = null),
  },
  actions: {
    async getInspections({ commit }, data) {
      await Inspection.getAllPaginated(data)
        .then((response) => {
          commit("SET_INSPECTIONS", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async createInspection({ commit }, data) {
      await Inspection.inspectionCreate(data)
        .then((response) => {
          commit("CREATE_NEW_INSPECTION", response.data);
          localStorage.setItem("inspection", JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async createAnswer({ commit }, data) {
      await Inspection.answerCreate(data)
        .then((response) => {
          commit("ADD_TO_CART", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async completeInspection({ commit }, data) {
      await Inspection.inspectionComplete(data)
        .then(() => {
          commit("CLEAR_CART", null);
          commit("CLEAR_INSPECTION", null);
          localStorage.removeItem("inspection");
          localStorage.removeItem("branchstore");
          localStorage.removeItem("cart");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getInspection({ commit }, uuid) {
      await Inspection.get(uuid)
        .then((response) => {
          commit("SET_INSPECTION", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  namespaced: true,
};
