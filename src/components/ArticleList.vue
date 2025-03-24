<script setup>
import {defineProps, onMounted, ref, watch} from 'vue';
import {useArticlesStore} from '../store/pinia_index.js';
import {usePrimeVue} from "primevue/config";
import {useToast} from "primevue/usetoast";
import {useRoute} from "vue-router";


const route = useRoute();

const toastParams = ref(route.query.toastParams ? JSON.parse(route.query.toastParams) : null);

if (toastParams.value) {
  useToast().add(toastParams.value);
  toastParams.value = null;
  route.query.toastParams = null;
}

const locale = usePrimeVue().config.locale;
const store = useArticlesStore();
const isLoading = ref(true);
const isCancelled = ref(false);


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
if (articles.length <= 0) {
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

const truncateText = (text, maxLength = 100) => {
  if (!text) return ''; // Проверка на undefined или null
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};
</script>

<template>
  <Toast/>
  <div class="hello">
    <div class="articles-grid">
      <Card v-if="store.articles.length>0" v-for="article in store.articles" :key="article.id"
            style="width: 20rem; overflow: hidden;">
        <template #header>
          <Image preview width="250" height="200" alt="user header" src="/public/articles/1.jpg"/>
        </template>
        <template #title>
          <RouterLink :to="'/article/' + article.id">{{ article.title }}</RouterLink>
        </template>
        <template #subtitle>{{ article.author }}</template>
        <template #content>
          <p class="m-0">
            {{ truncateText(article?.body) }}
          </p>
        </template>
      </Card>
      <div v-else style="margin-left: 33.5em;" class="card-strict flex justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
                         animationDuration=".5s" aria-label="Custom ProgressSpinner"/>
      </div>
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

.hello {
  padding: 20px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 статьи в строке на компьютерах */
  gap: 20px; /* Расстояние между карточками */
}

/* На телефонах — одна статья в строке */
@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.error-message {
  color: red;
  margin-top: 20px;
}

button {
  margin-top: 20px;
  margin-right: 10px;
}
</style>