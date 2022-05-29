<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card width="500" height="auto" elevation="24" class="pa-3">
        <div class="text-center my-6">
          <h1>Sany <span class="blue--text">Inspections</span></h1>
        </div>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Email"
              v-model="form.email"
              :rules="emailRules"
              autocomplete="email"
              prepend-icon="mdi-email"
              required
            />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              v-model="form.password"
              autocomplete="current-password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            type="submit"
            :loading="loading"
            @click="submit"
            >Login</v-btn
          >
        </v-card-actions>

        <!-- <div class="text-right mt-4">
          <v-btn color="blue" text>Forgot Password? </v-btn>
        </div> -->
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "Login",
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        loading: false,
        showPassword: false,
        valid: true,
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        passwordRules: [(v) => !!v || "Password is required"],
      };
    },
    methods: {
      ...mapActions("auth", ["signIn"]),

      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.signIn({
            email: this.form.email,
            password: this.form.password,
          })
            .then(() => {
              this.$store.dispatch("snackbar/setSnackbar", {
                text: `You have successfully logged in`,
              });
              this.$router.replace({
                name: "InspectionList",
              });
              this.loading = false;
            })
            .catch((error) => {
              this.$store.dispatch("snackbar/setSnackbar", {
                color: "error",
                icon: "alert-circle",
                text: `${error.response.data.non_field_errors[0]}`,
              });
              this.loading = false;
            });
        }
      },
    },
  };
</script>
