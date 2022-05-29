<template>
  <v-pagination
    class="mb-10 mt-3"
    v-model="page"
    total-visible="5"
    circle
    :length="lenght"
    @input="$emit('getLoads')"
  ></v-pagination>
</template>

<script>
  export default {
    props: ["lenght"],
    computed: {
      page: {
        get() {
          return this.$store.state.page;
        },
        set(value) {
          this.$store.commit("updatePage", value);
        },
      },
    },
  };
</script>

<style></style>
