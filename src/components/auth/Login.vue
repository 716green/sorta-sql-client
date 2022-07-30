<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- // TODO - update placeholder image -->
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2
          class="mb-6 text-center text-3xl font-extrabold text-gray-900 w-full"
        >
          Sign in with GitHub
        </h2>

        <form class="relative w-full">
          <button
            @click.prevent="loginWithGithub"
            class="relative flex border-2 border-gray-200 w-full rounded-md py-2 hover:bg-gray-100 my-0"
          >
            <div class="m-auto">
              <GHIcon class="text-gray-700" />
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { githubSignin } from "@/firebase";
import GHIcon from "@/components/auth/GHIcon.vue";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      isAuthenticated: "getIsAuthenticated",
    }),
  },
  methods: {
    async loginWithGithub() {
      const user = await githubSignin();
      console.log({ user });
      this.$store.dispatch("setUser", user).then(() => {
        if (this.isAuthenticated) this.$router.push({ name: "Dashboard" });
      });
    },
  },
  components: {
    GHIcon,
  },
};
</script>

<style scoped></style>
