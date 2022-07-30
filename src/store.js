import { createStore } from "vuex";
import router from "./router";

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  actions: {
    async setUser({ commit }, user) {
      console.log("Setting user", user);
      commit("SET_USER", user);
    },
    async signUserOut({ commit }) {
      console.log("Signing User Out");
      commit("SET_USER", null);
      router.push("/auth");
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => !!state.user?.uid,
  },
});

export default store;
