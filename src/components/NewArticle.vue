<script setup>
import { useArticlesStore } from "../store/pinia_index.js";
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import router from "../router/index.js";

const title = ref(null);
const author = ref(null);
const publication_date = ref(null);
const isPublished = ref(true);
const body = ref('');

const toast = useToast();

const resolver = zodResolver(
  z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    author: z.string().min(1, { message: 'Author is required.' }),
    content: z.string().min(1, { message: 'Content is required.' }),
    publication_date: z.date({
      required_error: 'Publication date is required.',
      invalid_type_error: 'Please select a valid date.',
    }),
  })
);

const onFormSubmit = ({ valid }) => {
  console.log('Form valid:', valid);
  if (valid) {
    const store = useArticlesStore();
    let newArticle = {
      title: title.value,
      author: author.value,
      isPublished: isPublished.value,
      content: body.value,
      publication_date: publication_date.value,
    };
    store.addArticle(newArticle);
    visible.value = false;
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    router.push({ path: '/', params: {toast: toast} });
  } else {
    console.log('Form is invalid');
    toast.add({ severity: 'error', summary: 'Form is not valid.', life: 3000 });
  }
};

const visible = ref(false);
</script>

<template>
  <Toast />
  <Button label="Add Article" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="card flex justify-center">
      <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
            class="flex flex-col gap-0 w-full sm:w-56">
        <!-- Title Field -->
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="title" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText name="title" type="text" fluid id="on_label" v-model="title" />
              <label for="on_label">Title</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <!-- Author Field -->
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="author" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText name="author" type="text" fluid id="on_label" v-model="author" />
              <label for="on_label">Author</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <!-- Publication Date Field -->
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="publication_date" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <DatePicker dateFormat="dd/mm/yy" name="publication_date" v-model="publication_date" fluid inputId="on_label"
                          showIcon iconDisplay="input" />
              <label for="on_label">Date of publication</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <!-- Body Field -->
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="body" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <Textarea name="body" fluid id="over_label" v-model="body" rows="5" cols="30" style="resize: none" />
              <label for="on_label">Content</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <!-- Publish Immediately Field -->
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="isPublished" initialValue="" class="flex flex-col gap-1">
            <Checkbox name="isPublished" v-model="isPublished" binary variant="filled" />
            <label for="isPublished"> Publish immediately </label>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              {{ $field.error?.message }}
            </Message>
          </FormField>
        </div>

        <!-- Кнопки Add и Cancel -->
        <div class="flex gap-2 mt-4">
          <Button type="submit" style="margin-right: 8px;" severity="success" label="Add" /> <!-- Красная кнопка -->
          <Button type="button" severity="secondary" label="Cancel" @click="visible = false" /> <!-- Кнопка Cancel -->
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<style scoped>
/* Добавьте стили, если необходимо */
</style>