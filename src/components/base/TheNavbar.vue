<template>
  <v-app-bar app color="black" clipped-left dark>
    <slot name="left_button">
      <v-app-bar-nav-icon
        v-if="$route.meta.base"
        class="d-block"
        @click="$emit('handleToggle')"
      />
      <BtnGoBack v-else-if="$route.name !== 'InspectionCreateChecklist'" />
    </slot>

    <slot name="title">
      <BtnScoreInspection v-if="$route.name === 'InspectionCreateChecklist'" />
      <BrandTitle v-else />
    </slot>
    <v-spacer></v-spacer>
    <slot name="right_button">
      <BtnSubmitInspection v-if="$route.name === 'InspectionCreateChecklist'" />
      <UserMenu v-else />
    </slot>
  </v-app-bar>
</template>

<script>
  import BrandTitle from "../brandTitle.vue";
  import BtnGoBack from "../btnGoBack.vue";
  import BtnScoreInspection from "../btnScoreInspection.vue";
  import BtnSubmitInspection from "../btnSubmitInspection.vue";
  import UserMenu from "../UserMenu.vue";

  export default {
    components: {
      UserMenu,
      BtnSubmitInspection,
      BtnScoreInspection,
      BtnGoBack,
      BrandTitle,
    },
  };
</script>
