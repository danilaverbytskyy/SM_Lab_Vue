import {useArticlesStore} from "../store/pinia_index.js";
import {ref} from "vue";

const store = useArticlesStore();
const isLoading = ref(true);

export const loadArticles = async () => {
  try {
    await store.getArticlesFromServer();
  } catch (error) {
    console.error('Ошибка при загрузке статей:', error);
  } finally {
    isLoading.value = false;
  }
};