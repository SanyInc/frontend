<template>
  <v-container fluid class="pa-1">
    <ProgressCircleLoading v-if="loading" />

    <v-card v-if="branchstore" class="ma-2 pa-5" elevation="5">
      <v-row class="mt-4" no-gutters justify="center">
        <h2>Στοιχεία Eπιχείρησης</h2>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto" class="mr-auto">
          <div class="caption grey--text">Επωνυμία</div>
          <div>{{ branchstore.business.title }}</div>
        </v-col>
        <v-col cols="auto" class="text-right">
          <div class="caption grey--text">Αριθμός Γνωστοποίησης</div>
          <div>{{ branchstore.notify_number }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto" class="mr-auto">
          <div class="caption grey--text">Διεύθυνση</div>
          <div>
            {{ branchstore.address }} {{ branchstore.address_number }},
            {{ branchstore.zip_code }}, {{ branchstore.state }}
          </div>
        </v-col>
        <v-col cols="auto" class="text-right">
          <div class="caption grey--text">ΑΦΜ</div>
          <div>{{ branchstore.business.vat }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-5">
        <v-col cols="12">
          <div class="caption grey--text">Ιδιοκτήτης</div>
          <div>
            {{ branchstore.business.owner.user.first_name }}
            {{ branchstore.business.owner.user.last_name }}
          </div>
        </v-col>
        <v-col cols="12">
          <div class="caption grey--text">Υγειονομικός Υπεύθυνος</div>
          <div>
            {{ branchstore.hr_full_name }}
          </div>
        </v-col>
        <v-col cols="12">
          <div class="caption grey--text">Δραστηριότητα</div>
          <div>{{ branchstore.activity.title }}</div>
        </v-col>
      </v-row>

      <v-expansion-panels class="mb-6" focusable>
        <v-expansion-panel
          v-for="(category, index) in branchstore.activity.categories"
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

          <expansion-panel-content
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
    name: "InspectionCreateChecklist",
    data() {
      return {
        row: null,
        show: false,
        loading: false,
      };
    },
    created() {
      if (!this.branchstore) {
        this.loading = true;
        this.getBranchstore(this.slug);
        this.inspection = JSON.parse(localStorage.getItem("inspection"));
        this.$store.commit("inspection/SET_INSPECTION", this.inspection);
        this.loading = false;
      }
    },
    computed: {
      ...mapState("branchstore", ["branchstore"]),
    },
    methods: {
      ...mapActions("branchstore", ["getBranchstore"]),
    },
  };
</script>
