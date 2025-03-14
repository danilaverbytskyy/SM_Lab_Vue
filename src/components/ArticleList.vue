<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useArticlesStore} from '../store/pinia_index.js';
import {usePrimeVue} from "primevue/config";
import {useToast} from "primevue/usetoast";


const locale = usePrimeVue().config.locale;
const store = useArticlesStore();
const isLoading = ref(true);
const isCancelled = ref(false);
const visible = ref(false);

const toast = useToast();

const loadArticles = async () => {
  try {
    await store.getArticlesFromServer();
  } catch (error) {
    console.error('Ошибка при загрузке статей:', error);
  } finally {
    isLoading.value = false;
  }
};

let articles = store.articles;
if (articles.length<=0) {
  loadArticles();
}

const cancelFetch = () => {
  store.cancelFetch();
  isCancelled.value = true;
};

const retryFetch = () => {
  isCancelled.value = false;
  loadArticles();
};
</script>

<template>
  <Toast/>
  <div class="hello">
    <div>
      <ul v-for="article in store.articles" :key="article.id">
        <li>
          <RouterLink :to="'/article/' + article.id">
            {{ article.title }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <button @click="cancelFetch" :disabled="!store.abortController">
      Отменить загрузку
    </button>

    <button @click="retryFetch" v-if="store.hasError || isCancelled">
      Обновить
    </button>

    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: block;
}

.add-new-article-button {
  display: block;
  margin: auto;
}
</style>