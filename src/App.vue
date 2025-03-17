<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import {usePrimeVue} from "primevue/config";
import {useToast} from "primevue/usetoast";

const locale = usePrimeVue().config.locale;
const toast = useToast();

const items = ref([
    {
        label: locale.goHome,
        icon: 'pi pi-palette',
        route: '/'
    },
    {
        label: locale.about,
        icon: 'pi pi-link',
        route: '/about'
    },
    {
        label: locale.addArticle,
        icon: 'pi pi-home',
        route: '/new'
    }
]);
</script>

<template>
  <h1>{{locale.articleTitle}}</h1>
  <div class="card-strict flex justify-content-center">
        <Menubar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
        </Menubar>
    </div>
  <main>
    <RouterView />
      <Toast />
  </main>
</template>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>