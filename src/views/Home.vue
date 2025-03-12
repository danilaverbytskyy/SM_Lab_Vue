<script setup>

import ArticleList from "../components/ArticleList.vue";
</script>

<template>
  <Suspense>
    <template #default>
<ArticleList articles="">

</ArticleList>
    </template>
    <template #fallback>
      Loading
    </template>
  </Suspense>
</template>

<style scoped>

</style>