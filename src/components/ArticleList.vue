<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useArticlesStore} from '../store/pinia_index.js';
import {usePrimeVue} from "primevue/config";


const locale = usePrimeVue().config.locale;
const store = useArticlesStore();
const isLoading = ref(true);
const isCancelled = ref(false);
const visible = ref(false);


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
    <template>
      <div class="card flex justify-center">
        <Button label="Show" @click="visible = true"/>
        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off"/>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off"/>
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
          </div>
        </Dialog>
      </div>
    </template>

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