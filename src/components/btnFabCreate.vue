<template>
  <v-fab-transition>
    <v-btn
      color="red"
      fab
      dark
      fixed
      right
      bottom
      :to="{ name: 'InspectionCreate' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    beforeDestroy() {
      this.$store.commit("updatePage", 1);
    },
  };
</script>

<style></style>
