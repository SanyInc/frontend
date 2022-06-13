<template>
  <v-expansion-panel-content>
    <v-row align="center" align-content="center" class="my-2">
      <v-col cols="5" sm="4">{{ question.title }}</v-col>
      <v-col cols="3" sm="4" class="pa-0 ma-0 text-center">
        <v-radio-group row v-model="picked">
          <v-radio
            v-for="choice in question.choices"
            :key="choice.number"
            :label="choice.number.toString()"
            :value="choice.number"
            :disabled="disabled"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="mb-2 text-center">
        <v-btn
          class="ma-2"
          fab
          dark
          small
          :disabled="disabled"
          color="primary"
          @click.stop="(dialog1 = true), sendData(question)"
        >
          <v-icon dark> mdi-information-variant </v-icon>
        </v-btn>
        <v-btn
          class="ma-2"
          fab
          dark
          small
          :disabled="disabled"
          color="pink"
          @click.stop="dialog2 = true"
        >
          <v-icon dark> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          v-if="$route.name === 'InspectionCreateChecklist'"
          class="ma-2"
          fab
          dark
          small
          :disabled="disabled"
          color="green"
          @click="addToCart()"
        >
          <v-icon dark> mdi-check </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-dialog v-model="dialog1" max-width="500">
      <v-card>
        <v-row no-gutters justify="center">
          <v-card-title class="headline"> Περιγραφή</v-card-title>
        </v-row>
        <v-card-text>
          {{ selectedQuestion.description }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog1 = false"> Κλεισιμο </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="500">
      <v-card>
        <v-row no-gutters justify="center">
          <v-card-title class="headline"> Σχόλια</v-card-title>
        </v-row>

        <v-card-text>
          <v-textarea
            outlined
            name="input-7-4"
            label="Παρατηρήσεις - Ελλείψεις"
            v-model="comment"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="(dialog2 = false), sendCommentToCart(comment)"
          >
            Καταχωρηση
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-expansion-panel-content>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    props: ["question"],
    name: "ExpansionPanelContent",
    data() {
      return {
        picked: null,
        dialog1: false,
        dialog2: false,
        comment: "",
        submitedComment: "",
        selectedQuestion: "",
        disabled: false,
      };
    },
    computed: {
      ...mapState("inspection", ["inspection", "cart"]),
    },
    methods: {
      ...mapActions("inspection", ["createAnswer"]),
      addToCart() {
        this.createAnswer({
          question: this.question.id,
          body: this.picked,
          inspection: this.inspection.uuid,
          comment: this.submitedComment,
        }).then(() => {
          this.disabled = true;
          localStorage.setItem("cart", JSON.stringify(this.cart));
        });
      },
      sendData(question) {
        this.selectedQuestion = question;
      },
      sendCommentToCart(comment) {
        if (this.$route.name === "InspectionCreateChecklist") {
          this.submitedComment = comment;
        }
      },
    },
  };
</script>

<style></style>
