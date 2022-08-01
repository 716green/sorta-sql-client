import { createStore } from "vuex";
import router from "./router";

const store = createStore({
  state() {
    return {
      user: null,
      ghAccessToken: null,
    };
  },
  actions: {
    setGithubAccessToken({ commit }, token) {
      localStorage.setItem("sorta-sql-gh-token", JSON.stringify(token));
      commit("SET_GH_TOKEN", token);
    },
    async setUser({ commit }, user) {
      localStorage.setItem("sorta-sql-user", JSON.stringify(user));
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
      if (!user) {
        localStorage.removeItem("sorta-sql-gh-token");
        localStorage.removeItem("sorta-sql-user");
      }
      state.user = user;
    },
    SET_GH_TOKEN(state, token) {
      state.ghAccessToken = token;
    },
  },
  getters: {
    getUser: (state) => state.user,
    getGhAccessToken: (state) => state.ghAccessToken,
    getIsAuthenticated: (state) => !!state.user?.uid,
  },
});

export default store;
