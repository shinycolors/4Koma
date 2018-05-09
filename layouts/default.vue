<template>
  <div>
    <c-nav/>
    <nuxt/>
    <c-footer/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import cFooter from "~/components/Footer.vue";
import cNav from "~/components/Nav.vue";

export default Vue.extend({
  components: {
    cFooter,
    cNav
  }
});
</script>
