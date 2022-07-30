<template>
  <!-- <Login /> -->
  <router-view />
</template>

<script>
// import Login from "@/components/auth/Login.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      user: "getUser",
      isAuthenticated: "getIsAuthenticated",
    }),
  },
  // components: {
  //   Login,
  // },
};
</script>

<style scoped></style>
