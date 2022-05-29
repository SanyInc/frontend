<template>
  <v-container fluid class="pa-1">
    <ProgressCircleLoading v-if="loading" />

    <v-card v-else class="ma-2 pa-5" elevation="5">
      <v-row class="my-4" no-gutters justify="center">
        <h4>{{ activity.title }}</h4>
      </v-row>

      <v-expansion-panels class="mb-6" focusable>
        <v-expansion-panel
          v-for="(category, index) in activity.categories"
          :key="index"
        >
          <v-expansion-panel-header
            expand-icon="mdi-menu-down"
            color="error"
            disable-icon-rotate
            class="white--text"
          >
            {{ category.title }}
          </v-expansion-panel-header>

          <ExpansionPanelContent
            v-for="(question, index) in category.questions"
            :key="index"
            :question="question"
          />
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  import ExpansionPanelContent from "../components/ExpansionPanelContent.vue";
  import ProgressCircleLoading from "../components/ProgressCircleLoading.vue";

  export default {
    components: { ExpansionPanelContent, ProgressCircleLoading },
    props: ["slug"],
    data() {
      return {
        row: null,
        show: false,
        loading: false,
      };
    },
    created() {
      this.loading = true;
      this.getActivity(this.$route.params.slug).then(() => {
        this.loading = false;
      });
    },

    computed: {
      ...mapState("checklist", ["activity"]),
    },
    methods: {
      ...mapActions("checklist", ["getActivity"]),
    },
  };
</script>

<style></style>
