<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 10}px`"
    >
      <v-icon dark right class="mr-3"> mdi-{{ snackbar.icon }} </v-icon>
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({ snackbars: (state) => state.snackbar.snackbars }),
    },
  };
</script>

<style></style>
