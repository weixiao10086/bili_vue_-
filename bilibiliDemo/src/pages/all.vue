<template>
  <div>
    <indexNav v-show="$route.meta.topshow">  </indexNav>
    <router-view></router-view>
    <footerDown  v-show="$route.meta.footershow"></footerDown>
  </div>
</template>

<script>
import indexNav from "@/components/indexNav.vue";
import footerDown from "@/components/downFooter.vue";
export default {
  name: "all",
  components: {
    indexNav,
    footerDown,
  },
};
</script>

<style>
</style>