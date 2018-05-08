<template>
  <div>
    <c-nav/>
    <nuxt/>
    <c-footer/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import cNav from "~/components/Nav.vue";
import cFooter from "~/components/Footer.vue";

export default Vue.extend({
  components: {
    cNav,
    cFooter
  }
});
</script>
