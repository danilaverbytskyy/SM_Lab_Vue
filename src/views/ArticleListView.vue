<script setup>
import { ref, onMounted } from 'vue';
import { useArticlesStore } from '../store/pinia_index.js';
import ArticleList from '../components/ArticleList.vue';
const store = useArticlesStore();
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <ArticleList />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-item {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
