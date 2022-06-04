<template>
  <v-container fluid class="pa-1">
    <SearchBar @getLoads="getLoads" :label="label" />
    <ProgressCircleLoading v-if="loading" />

    <div v-else>
      <v-list two-line>
        <v-list-item-group active-class="pink--text">
          <template v-for="(item, index) in branchstores.results">
            <v-card :key="index" class="ma-2">
              <v-list-item @click.stop="(dialog = true), sendData(item)">
                <v-list-item-content>
                  <v-list-item-title v-text="item.business"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.business"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="
                      `${item.address} ${item.address_number}, ${item.zip_code}, ${item.state}`
                    "
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-subtitle
                    v-text="`License No: ${item.notify_number}`"
                  ></v-list-item-subtitle>
                  <v-list-item-title
                    ><span class="grey--text">ΑΦΜ: </span
                    >155130279</v-list-item-title
                  >
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </template>
        </v-list-item-group>
      </v-list>

      <BasePagination
        v-if="branchstores.next || branchstores.previous"
        :length="Math.ceil(branchstores.count / 10)"
        @getLoads="getLoads"
      />
    </div>
    <div v-if="show" class="text-center mx-12 mt-5 text-h6">
      Αναζήτησε με το ΑΦΜ
    </div>

    <div
      v-if="!branchstores || (branchstores.count === 0 && !loading)"
      class="text-center mx-12 mt-5 text-h6"
    >
      Δεν υπάρχουν επιχειρήσεις με αυτό το ΑΦΜ
    </div>

    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-row no-gutters justify="center">
          <v-card-title> Νέα Επιθεώρηση </v-card-title>
        </v-row>

        <v-card-text>
          Είσαι σίγουρος/η ότι θες να ξεκινήσεις έναν υγειονομικό έλεγχο σε αυτή
          την επιχείρηση
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false"> Disagree </v-btn>

          <v-btn
            color="error"
            @click="(dialog = false), startInspection(selectedBranchstore)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import authHeader from "../api/headers";
  import http from "../api/axios";

  import { mapActions, mapState } from "vuex";
  import SearchBar from "../components/SearchBar.vue";
  import ProgressCircleLoading from "../components/ProgressCircleLoading.vue";
  import BasePagination from "../components/BasePagination.vue";

  export default {
    components: { SearchBar, ProgressCircleLoading, BasePagination },
    name: "InspectionCreate",
    data() {
      return {
        loading: false,
        show: true,
        page: 1,
        dialog: false,
        selectedBranchstore: "",
        label: "Αναζήτηση Επιχείρησης",
      };
    },
    beforeDestroy() {
      this.$store.commit("branchstore/SET_BRANCHSTORES", []);
    },
    computed: {
      ...mapState("branchstore", ["branchstores"]),
      ...mapState("auth", ["token"]),
    },
    methods: {
      ...mapActions("branchstore", ["searchBranchstore"]),
      ...mapActions("inspection", ["createInspection"]),

      async getLoads() {
        this.loading = true;
        this.show = false;

        if (
          (this.$store.state.query === "") |
          (this.$store.state.query === null)
        ) {
          this.show = true;
        }

        const params = {
          page: this.page,
          search: this.$store.state.query,
        };

        const url = "stores/";

        await http
          .getUri({ url, params }, { headers: authHeader() })

          // .get(`stores/?page=${this.page}&search=${this.$store.state.query}`, {
          //   headers: authHeader(),
          // })
          .then((response) => {
            this.$store.commit("branchstore/SET_BRANCHSTORES", response.data);
          });
        this.loading = false;
        if (
          (this.$store.state.query === "") |
          (this.$store.state.query === null)
        ) {
          this.$store.commit("branchstore/SET_BRANCHSTORES", []);
        }
      },

      clearLoads() {
        this.$store.commit("branchstore/SET_BRANCHSTORES", []);
      },

      sendData(item) {
        this.selectedBranchstore = item;
      },
      startInspection() {
        this.createInspection({
          store: this.selectedBranchstore.id,
        });
        this.$router.replace({
          name: "InspectionCreateChecklist",
          params: {
            slug: this.selectedBranchstore.slug,
            branchstore: this.selectedBranchstore,
          },
        });
      },
    },
  };
</script>
