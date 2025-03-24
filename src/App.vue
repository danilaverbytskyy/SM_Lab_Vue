<script setup>
import {ref} from "vue";
import Menubar from 'primevue/menubar';
import {usePrimeVue} from "primevue/config";
import {useToast} from "primevue/usetoast";
import {useArticlesStore} from "./store/pinia_index.js";
import {zodResolver} from '@primevue/forms/resolvers/zod';
import {z} from 'zod';
import router from "./router/index.js";

const locale = usePrimeVue().config.locale;
const toast = useToast();
const resetForm = () => {
  title.value = null;
  author.value = null;
  publication_date.value = null;
  isPublished.value = true;
  body.value = '';
};

const items = ref([
  {
    label: locale.goHome,
    icon: 'pi pi-palette',
    route: '/',
    command: () => {

    }
  },
  {
    label: locale.about,
    icon: 'pi pi-link',
    route: '/about'
  },
  {
    label: locale.add_new_article_text2,
    icon: 'pi pi-plus',
    command: () => {
      resetForm();
      visible.value = true;
    }
  }
]);

const title = ref(null);
const author = ref(null);
const publication_date = ref(null);
const isPublished = ref(true);
const body = ref('');

const resolver = zodResolver(
    z.object({
      title: z.string().min(1, {message: 'Title is required.'})
          .max(40, {message: 'Максимальная длина названия статьи 40 символов'}),
      author: z.string().min(1, {message: 'Author is required.'})
          .max(40, {message: 'Максимальная длина имени автора статьи 40 символов'}),
      content: z.string().min(1, {message: 'Content is required.'}),
      publication_date: z.date({
        required_error: 'Publication date is required.',
        invalid_type_error: 'Please select a valid date.',
      }),
    })
);

const onFormSubmit = ({valid}) => {
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
    if (router.currentRoute.value.name === 'Home') {
      toast.add({
        severity: 'success',
        summary: 'Статья "' + title.value + '" добавлена',
        life: 3000,
      });
    } else {
      router.push({
        name: 'Home',
        query: {
          toastParams: JSON.stringify({
            severity: 'success',
            summary: 'Статья "' + title.value + '" добавлена',
            life: 3000,
          }),
        },
      });
    }
  } else {
    console.log('Статья не добавлена');
    toast.add({severity: 'error', summary: 'Статья не добавлена.', life: 3000});
  }
};

const visible = ref(false);
</script>

<template>
  <Toast/>
  <h1>{{ locale.articleTitle }}</h1>
  <div class="card-strict flex justify-content-center">
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"/>
        </a>
      </template>
    </Menubar>
  </div>
  <main>
    <RouterView/>
    <Toast/>
  </main>

  <Dialog v-model:visible="visible" modal header="Добавить статью" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="card flex justify-center">
      <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
            class="flex flex-col gap-0 w-full sm:w-56">
        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="title" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText name="title" type="text" fluid id="on_label" v-model="title"/>
              <label for="on_label">{{ locale.title_text }}</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="author" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <InputText name="author" type="text" fluid id="on_label" v-model="author"/>
              <label for="on_label">{{ locale.author_text }}</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="publication_date" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <DatePicker dateFormat="dd/mm/yy" name="publication_date" v-model="publication_date" fluid
                          inputId="on_label"
                          showIcon iconDisplay="input"/>
              <label for="on_label">{{ locale.date_of_publication_text }}</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="body" initialValue="" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <Textarea name="body" fluid id="over_label" v-model="body" rows="5" cols="30" style="resize: none"/>
              <label for="on_label">{{ locale.content_text }}</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FloatLabel>
          </FormField>
        </div>

        <div class="card-element flex flex-col gap-1">
          <FormField v-slot="$field" name="isPublished" initialValue="" class="flex flex-col gap-1">
            <Checkbox name="isPublished" v-model="isPublished" binary variant="filled"/>
            <label style="margin-left: 5px;" for="isPublished">{{ locale.publish_immediately_text }} </label>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              {{ $field.error?.message }}
            </Message>
          </FormField>
        </div>

        <div class="flex gap-2 mt-4">
          <Button type="submit" style="margin-right: 8px;" severity="success" label="Добавить"/>
          <Button type="button" severity="secondary" label="Закрыть" @click="visible = false"/>
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>