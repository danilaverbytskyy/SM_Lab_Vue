<script setup>
import {ref} from "vue";
// import store from "../store/index.js";
import router from "../router/index.js";
import {useArticlesStore} from "../store/pinia_index.js";

const props = defineProps({
  title: String,
  body: String,
  author: String,
  isPublished: Boolean,
});

let article = ref({
  title: props.title,
  body: props.body,
  author: props.author,
  published: props.isPublished
})

const store = useArticlesStore()
</script>

<template>
  <div>
    <h2>Add new article</h2>
    <form>
      <div><input type="text" v-model="article.title" placeholder="Title"></div>
      <div><input type="text" v-model="article.author" placeholder="Author"></div>
      <div><textarea v-model="article.body" placeholder="Body"></textarea></div>
      <div><input type="submit" value="Add" v-on:click.prevent="[store.addArticle(article), router.push('/')]"></div>
    </form>
  </div>
</template>

<style scoped>

</style>