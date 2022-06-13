<template>
  <div>
    <TheNavbar @handleToggle="isDrawerOpen = !isDrawerOpen" />
    <TheSidebar
      :is-drawer-open.sync="isDrawerOpen"
      @handleToggle="isDrawerOpen = !isDrawerOpen"
    />
    <v-main>
      <slot />
    </v-main>
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
  // import TheFooter from "../components/base/TheFooter.vue";
  import TheSidebar from "../components/base/TheSidebar.vue";
  import TheNavbar from "../components/base/TheNavbar.vue";

  export default {
    components: { TheNavbar, TheSidebar },
    data() {
      return {
        isDrawerOpen: null,
      };
    },
  };
</script>
