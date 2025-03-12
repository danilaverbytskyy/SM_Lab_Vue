import { defineStore } from 'pinia';
import axios from 'axios';

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [],
    abortController: null,
    error: null,
  }),
  getters: {
    getAll: (state) => state.articles,
    hasError: (state) => state.error !== null,
  },
  actions: {
    async getArticlesFromServer() {
      this.error = null;

      this.abortController = new AbortController();

      try {
        const api = 'http://localhost:10000/articles';
        const response = await axios.get(api, {
          signal: this.abortController.signal,
        });
        this.articles = response.data;
        console.log('Полученные записи:', response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Запрос отменен:', error.message);
          this.error = 'Запрос отменен пользователем';
        } else {
          console.error('Ошибка при загрузке данных:', error);
          this.error = 'Ошибка при загрузке данных';
        }
      } finally {
        this.abortController = null;
      }
    },

    cancelFetch() {
      if (this.abortController) {
        this.abortController.abort();
        console.log('Запрос отменен');
      }
    },

    retryFetch() {
      this.getArticlesFromServer();
    },

    updateArticleStatus(id, isPublished) {
      const article = this.articles.find(article => article.id === id);
      if (article) {
        article.isPublished = isPublished;
      }
    }
  },
});