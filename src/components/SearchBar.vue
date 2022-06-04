<template>
  <v-form @submit.prevent class="mt-2 mx-2">
    <v-text-field
      :label="label"
      prepend-inner-icon="mdi-magnify"
      v-model="query"
      outlined
      hide-details
      dense
      @keyup.enter="$emit('getLoads')"
      clearable
    ></v-text-field>
  </v-form>
</template>

<script>
  export default {
    props: ["label"],
    beforeDestroy() {
      this.$store.commit("updateQuery", "");
    },
    computed: {
      query: {
        get() {
          return this.$store.state.query;
        },
        set(value) {
          this.$store.commit("updateQuery", value);
          this.$store.commit("updatePage", 1);
        },
      },
    },
  };
</script>
