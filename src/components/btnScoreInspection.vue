<template>
  <v-btn class="mx-2" elevation="4" dark :color="getColor(answerTotalScore)">
    Score: {{ answerTotalScore }}
  </v-btn>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters("inspection", ["answerTotalScore"]),
    },
    methods: {
      getColor(score) {
        if (score) {
          if (score > 100) return "red";
          else if (score > 40) return "orange";
          else return "green";
        }
      },
    },
  };
</script>

<style></style>
