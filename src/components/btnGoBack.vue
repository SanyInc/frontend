<template>
  <v-btn @click="useGoBack" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>

<script>
  export default {
    methods: {
      useGoBack() {
        return this.$router.go(-1);
      },
    },
  };
</script>

<style></style>
