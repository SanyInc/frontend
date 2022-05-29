<template>
  <v-menu offset-y>
    <template v-slot:activator="{ attrs, on }">
      <span style="cursor: pointer" v-bind="attrs" v-on="on">
        <v-btn fab small dark class="mr-2">
          <v-badge dot bottom color="green" offset-y="10" offset-x="10">
            <v-avatar size="40">
              <v-img src="https://randomuser.me/api/portraits/men/10.jpg" />
            </v-avatar>
          </v-badge>
        </v-btn>
      </span>
    </template>
    <v-list width="350" class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/10.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Panagiotis Petropoulos</v-list-item-title>
          <v-list-item-subtitle>ppetropoulos@patt.gov.gr</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.to">
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ menu.title }}
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item @click.prevent="logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title> Logout </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    data() {
      return {
        isDrawerOpen: null,
        menus: [
          { title: "Profile", icon: "mdi-account", to: "/profile" },
          // { title: "Change Password", icon: "mdi-key", to: "/" },
          // { title: "Settings", icon: "mdi-cog", to: "/" },
          // { title: "Logout", icon: "mdi-logout", to: "/login" },
        ],
      };
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.replace({
          name: "login",
        });
      },
    },
  };
</script>

<style></style>
