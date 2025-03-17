import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.js';
import { useArticlesStore } from './store/pinia_index.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Menubar from 'primevue/menubar';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import {Form, FormField} from '@primevue/forms';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Carousel from 'primevue/carousel';
import {Card, Checkbox, Column, DataTable, DatePicker, FloatLabel, Message, OrderList, Tag, Textarea} from "primevue";

const pinia = createPinia();
const app = createApp(App);

app.directive('ripple', Ripple);
app.use(VueAxios, axios);
app.provide('axios', axios);
app.use(router).use(pinia);
app.use(ToastService);
app.use(ConfirmationService);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true,
    locale: {
        goHome: "Главная",
        about: "О Нас",
        addArticle: "Добавить статью",
        articleTitle: "Хранилище Статей",
        about_us_title: "О НАС!",
        about_us_title_text: "Мы хорошо Vue знаем",
        add_new_article_text: "Добавить новую статью",
    }
});
app.component('Menubar', Menubar);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog)
app.component('Button', Button)
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('Form', Form);
app.component('FloatLabel', FloatLabel)
app.component('Message', Message)
app.component('DatePicker', DatePicker)
app.component('Checkbox', Checkbox)
app.component('Textarea', Textarea)
app.component('FormField', FormField)
app.component('Dialog', Dialog)
app.component('Carousel', Carousel)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('OrderList', OrderList)
app.component('Tag', Tag)
app.component('Card', Card)

const store = useArticlesStore();
// store.fetchArticles();

app.mount('#app');