<script setup>
import {computed, reactive, ref, watch} from 'vue';
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import {useArticlesStore} from "../store/pinia_index.js";

const props = defineProps({
  title: String,
  author: String,
  isPublished: Boolean,
  id: Number
})

let isPublished = ref(props.isPublished)
let title = ref(props.title)
let author = ref(props.author)
const id = ref(props.id)

const authorFontStyle = computed(() => {
  return props.isPublished ? 'normal' : 'italic'
})

const authorNameInUpperCase = computed(() => {
  return props.author.toUpperCase()
})

watch(isPublished, (newIsPublished) => {
  console.log("Статус статьи " + title.value + " " + newIsPublished)
})

const confirm = useConfirm();
const toast = useToast();

const confirm1 = () => {
  confirm.require({
    message: 'Вы точно хотите изменить опубликованность?',
    header: 'Изменение статьи',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Закрыть',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Изменить'
    },
    accept: () => {
      isPublished.value = !isPublished.value
      const store = useArticlesStore()
      store.updateArticleStatus(id.value, isPublished.value);
      toast.add({severity: 'info', summary: 'Принято', detail: 'Статус статьи изменен', life: 3000});
    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Отклонено', detail: 'Изменения отменены', life: 3000});
    }
  });
};
</script>

<template>
  <div :class="['article',{'published': isPublished}, { 'unpublished': !isPublished }]">
    <h2>{{ title }}</h2>
    <div v-if="props.author">
      <p :style="{ fontStyle: authorFontStyle}">{{ authorNameInUpperCase }}</p>
      <p v-if="isPublished">Опубликована</p>
      <p v-else>Не опубликована</p>
        <Toast/>
        <ConfirmDialog></ConfirmDialog>
        <div class="card flex flex-wrap gap-2 justify-center">
          <Button @click="confirm1()" label="Изменить опубликованность" outlined></Button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.unpublished {
  color: red;
}

.published {
  color: green;
}
</style>