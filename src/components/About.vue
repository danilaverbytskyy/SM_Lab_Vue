<script setup>
import {usePrimeVue} from "primevue/config";

const locale = usePrimeVue().config.locale;
</script>

<template>
<h2>{{locale.about_us_title}}</h2>
  <div>{{locale.about_us_title_text}}</div>
</template>

<style scoped>

</style>