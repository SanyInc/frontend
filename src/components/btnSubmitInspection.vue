<template>
  <v-btn
    class="mx-2"
    elevation="4"
    dark
    v-show="totalAnswers === totalQuestions"
    color="primary"
    @click="submitInspection()"
  >
    Submit
  </v-btn>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";

  export default {
    computed: {
      ...mapGetters("inspection", ["answerTotalScore", "totalAnswers"]),
      ...mapGetters("branchstore", ["totalQuestions"]),
      ...mapState("inspection", ["inspection"]),
    },
    methods: {
      ...mapActions("inspection", ["completeInspection"]),
      submitInspection() {
        this.completeInspection({
          score: this.answerTotalScore,
          inspection: this.inspection.uuid,
        }).then(() => {
          this.$store.dispatch("snackbar/setSnackbar", {
            text: `You have successfully made an inspection`,
          });
          this.$router.replace({
            name: "InspectionList",
          });
          this.loading = false;
        });
      },
    },
  };
</script>

<style></style>
