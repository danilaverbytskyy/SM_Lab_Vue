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
import { useConfirm } from "primevue/useconfirm";
import { defineComponent, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const pinia = createPinia();
const app = createApp(App);

app.directive('ripple', Ripple);
app.use(VueAxios, axios);
app.provide('axios', axios);
app.use(router).use(pinia);


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
app.use(ToastService);
app.use(ConfirmationService);
app.component('InputText', InputText);
app.component('Dialog', Dialog);

const store = useArticlesStore();
// store.fetchArticles();

app.mount('#app');