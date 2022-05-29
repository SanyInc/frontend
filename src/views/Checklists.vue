<template>
  <v-container fluid class="pa-1">
    <SearchBar @getLoads="getLoads" :label="label" />

    <ProgressCircleLoading v-if="loading" />

    <div v-else>
      <v-list class="pt-0" two-line>
        <v-list-item-group active-class="pink--text">
          <template v-for="(item, index) in activities.results">
            <v-card :key="index" class="ma-2">
              <v-list-item @click="viewActivity(item)">
                <v-list-item-content>
                  <v-list-item-title
                    class="red--text"
                    v-text="`Ερωτηματολόγιο ${index + 1}`"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="`${item.title}`"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-list-item-group>
      </v-list>
      <BasePagination
        v-if="activities.next || activities.previous"
        :length="Math.ceil(activities.count / 10)"
        @getLoads="getLoads"
      />
    </div>
  </v-container>
</template>

<script>
  import authHeader from "../api/headers";
  import http from "../api/axios";

  import { mapState, mapActions } from "vuex";

  import ProgressCircleLoading from "../components/ProgressCircleLoading.vue";
  import SearchBar from "../components/SearchBar.vue";
  import BasePagination from "../components/BasePagination.vue";
  export default {
    components: { ProgressCircleLoading, SearchBar, BasePagination },
    data() {
      return {
        page: 1,
        loading: false,
        label: "Αναζήτηση Ερωτηματολογίου",
      };
    },

    created() {
      this.getLoads();
    },
    computed: {
      ...mapState("checklist", ["activities", "activity"]),
    },
    methods: {
      ...mapActions("checklist", ["getActivity"]),

      async getLoads() {
        this.loading = true;

        if (
          this.$store.state.query === "" ||
          this.$store.state.query === null
        ) {
          await http
            .get(`activities/?page=${this.page}`, {
              headers: authHeader(),
            })
            .then((response) => {
              this.$store.commit("checklist/SET_ACTIVITIES", response.data);
            });
        } else {
          await http
            .get(
              `activities/?page=${this.page}&search=${this.$store.state.query}`,
              {
                headers: authHeader(),
              }
            )
            .then((response) => {
              this.$store.commit("checklist/SET_ACTIVITIES", response.data);
            });
        }

        this.loading = false;
      },
      async viewActivity(item) {
        this.selectedItem = this.activities.results.indexOf(item);
        this.editedItem = Object.assign({}, item);
        await this.getActivity(this.editedItem.slug);
        this.$router.push({
          name: "ChecklistDetail",
          params: {
            slug: this.editedItem.slug,
          },
        });
      },
    },
  };
</script>
