<template>
  <v-container fluid class="pa-1">
    <ProgressCircleLoading v-if="loading" />
    <v-card v-else elevation="5" class="ma-2 pa-3">
      <v-row no-gutters justify="center">
        <h1>Στοιχεία Ελέγχου</h1>
      </v-row>

      <v-row no-gutters class="mt-5">
        <v-col cols="auto" class="mr-auto">
          <div class="caption grey--text">Μοναδικός Κωδικός Επιθεώρησης</div>
          <div>{{ inspection.inspection.uuid }}</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="mr-4">
          <div class="caption grey--text">Ημ/νια-Ωρα Έναρξης</div>
          <div>{{ inspection.inspection.date_created }}</div>
        </v-col>

        <v-col cols="auto">
          <div class="caption grey--text">Ημ/νια-Ωρα Ολοκλήρωσης</div>
          <div>{{ inspection.completed }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-6">
        <v-col cols="auto">
          <div class="caption grey--text">Επιθεωρητής 1</div>
          <div>
            {{ inspection.inspection.inspector.user.first_name }}
            {{ inspection.inspection.inspector.user.last_name }}
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col v-if="inspection.inspection.inspector.partner" cols="auto">
          <div class="caption grey--text">Επιθεωρητής 2</div>
          <div>
            {{ inspection.inspection.inspector.partner.user.first_name }}
            {{ inspection.inspection.inspector.partner.user.last_name }}
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <div class="caption grey--text">Βαθμολογία</div>
          <div class="text-center">
            <v-chip :color="getColor(inspection.score)" text-color="white">
              {{ inspection.score }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <h2>Στοιχεία Eπιχείρησης</h2>
      </v-row>
      <v-row no-gutters class="mt-5">
        <v-col cols="auto" class="mr-auto">
          <div class="caption grey--text">Επωνυμία</div>
          <div>{{ inspection.inspection.store.business }}</div>
        </v-col>
        <v-col cols="auto" class="text-right">
          <div class="caption grey--text">Αριθμός Γνωστοποίησης</div>
          <div>{{ inspection.inspection.store.notify_number }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto" class="mr-auto">
          <div class="caption grey--text">Διεύθυνση</div>
          <div>
            {{ inspection.inspection.store.address }}
            {{ inspection.inspection.store.address_number }},
            {{ inspection.inspection.store.zip_code }},
            {{ inspection.inspection.store.state }}
          </div>
        </v-col>
        <v-col cols="auto" class="text-right">
          <div class="caption grey--text">ΑΦΜ</div>
          <div>{{ inspection.inspection.store.vat }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-5">
        <v-col cols="12">
          <div class="caption grey--text">Ιδιοκτήτης</div>
          <div>Πετρόπουλος Παναγιώτης</div>
        </v-col>
        <v-col cols="12">
          <div class="caption grey--text">Υγειονομικός Υπεύθυνος</div>
          <div>Κυριακάκη Σοφία</div>
        </v-col>
        <v-col class="mb-5" cols="12">
          <div class="caption grey--text">Δραστηριότητα</div>
          <div>{{ inspection.inspection.store.activity }}</div>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mb-10">
        <h2>Αποτελέσματα Ελέγχου</h2>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="inspection.inspection.answers"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>
      <hr />
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import ProgressCircleLoading from "../components/ProgressCircleLoading.vue";

  export default {
    components: { ProgressCircleLoading },
    props: ["uuid"],
    name: "InspectionDetail",
    data() {
      return {
        loading: false,
        headers: [
          {
            text: "Ερώτηση",
            align: "start",
            sortable: false,
            value: "question",
            class: "error white--text text-h6",
          },
          {
            text: "Αποτέλεσμα",
            value: "body",
            class: "error white--text text-h6",
          },
          {
            text: "Σχόλια - Παρατηρήσεις",
            value: "comment",
            class: "error white--text text-h6",
          },
        ],
      };
    },
    created() {
      if (!this.inspection) {
        this.loading = true;
        this.getInspection(this.uuid).then(() => {
          this.loading = false;
        });
      }
    },
    computed: {
      ...mapState("inspection", ["inspection"]),
    },
    methods: {
      ...mapActions("inspection", ["getInspection"]),
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
