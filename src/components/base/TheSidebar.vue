<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    width="300"
    temporary
    clipped
    color="black"
    dark
    @input="(val) => $emit('update:is-drawer-open', val)"
  >
    <v-list-item class="my-2">
      <v-app-bar-nav-icon class="mr-1 ml-0" @click="$emit('handleToggle')" />
      <BrandTitle />
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="{ name: `${item.route}` }"
        active-class="red accent-4"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import BrandTitle from "../brandTitle.vue";
  export default {
    components: { BrandTitle },
    props: {
      isDrawerOpen: {
        type: Boolean,
        default: null,
      },
    },
    data() {
      return {
        items: [
          { title: "Inspections", icon: "mdi-home", route: "InspectionList" },
          { title: "Checklists", icon: "mdi-check", route: "Checklists" },
        ],
      };
    },
  };
</script>
