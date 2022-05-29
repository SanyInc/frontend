<template>
  <v-app>
    <component :is="layout">
      <router-view />
      <Snackbar />
    </component>
  </v-app>
</template>

<script>
  import Snackbar from "./components/Snackbar.vue";

  export default {
    components: { Snackbar },
    name: "App",
    computed: {
      layout() {
        return this.$route.meta.layout;
      },
    },
  };
</script>
