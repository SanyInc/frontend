<template>
  <v-container fluid class="pa-1">
    <SearchBar @getLoads="getLoads" :label="label" />

    <ProgressCircleLoading v-if="loading" />

    <div v-else>
      <v-list class="pt-0" two-line>
        <v-list-item-group active-class="pink--text">
          <template v-for="(item, index) in inspections.results">
            <v-card :key="index" class="ma-2">
              <v-list-item @click="viewInspection(item)">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.inspection.store.business"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.inspection.store.vat"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-text="
                      `${item.inspection.store.address} ${item.inspection.store.address_number}, ${item.inspection.store.zip_code}, ${item.inspection.store.state}`
                    "
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.completed"
                  ></v-list-item-action-text>
                  <v-chip :color="getColor(item.score)" dark>
                    Score: {{ item.score }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </template>
        </v-list-item-group>
      </v-list>

      <BasePagination
        v-if="inspections.next || inspections.previous"
        :lenght="Math.ceil(inspections.count / 10)"
        @getLoads="getLoads"
      />
    </div>

    <div
      v-if="!inspections || inspections.count === 0"
      class="text-center text-h6 ma-12"
    >
      Δεν υπάρχουν υγειονομικοί έλεγχοι με αυτό το ΑΦΜ
    </div>

    <BtnFabCreate />
  </v-container>
</template>

<script>
  import authHeader from "../api/headers";
  import http from "../api/axios";

  import { mapState, mapActions } from "vuex";

  import BtnFabCreate from "../components/btnFabCreate.vue";

  import SearchBar from "../components/SearchBar.vue";
  import ProgressCircleLoading from "../components/ProgressCircleLoading.vue";
  import BasePagination from "../components/BasePagination.vue";

  export default {
    components: {
      BtnFabCreate,
      SearchBar,
      ProgressCircleLoading,
      BasePagination,
    },
    name: "InspectionList",
    data() {
      return {
        loading: false,
        label: "Αναζήτηση Ελέγχου",
      };
    },
    created() {
      this.getLoads();
    },

    computed: {
      ...mapState("inspection", ["inspections"]),
      ...mapState("auth", ["token"]),
    },
    methods: {
      ...mapActions("inspection", ["getInspection"]),

      async getLoads() {
        this.loading = true;
        const url = "inspections/";
        // const params = { page: this.$store.state.page };
        // const headers = headers: authHeader()

        if (
          this.$store.state.query === "" ||
          this.$store.state.query === null
        ) {
          await http
            .get(url, {
              params: {
                page: this.$store.state.page,
              },
              headers: authHeader(),
            })
            .then((response) => {
              this.$store.commit("inspection/SET_INSPECTIONS", response.data);
            });
        } else {
          await http
            .get(url, {
              params: {
                page: this.$store.state.page,
                search: this.$store.state.query,
              },
              headers: authHeader(),
            })
            .then((response) => {
              this.$store.commit("inspection/SET_INSPECTIONS", response.data);
            });
        }
        this.loading = false;
      },

      getColor(score) {
        if (score) {
          if (score > 100) return "red";
          else if (score > 40) return "orange";
          else return "green";
        }
      },

      async viewInspection(item) {
        this.selectedItem = this.inspections.results.indexOf(item);
        this.editedItem = Object.assign({}, item);
        await this.getInspection(this.editedItem.inspection.uuid);
        this.$router.push({
          name: "InspectionDetail",
          params: {
            item: this.editedItem,
            uuid: this.editedItem.inspection.uuid,
          },
        });
      },
    },
  };
</script>
