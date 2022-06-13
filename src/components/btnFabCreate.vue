<template>
  <v-fab-transition>
    <v-btn
      color="red"
      fab
      x-large
      dark
      fixed
      right
      elevation="8"
      bottom
      :to="{ name: 'InspectionCreate' }"
    >
      <v-icon large>mdi-plus</v-icon>
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
