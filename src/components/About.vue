<script setup>
import {usePrimeVue} from "primevue/config";
import {ProductService} from "../services/ProductService.js";
import {onMounted, ref} from "vue";

const locale = usePrimeVue().config.locale;


onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data));
});

const products = ref();
const columns = [
  {field: 'id', header: 'Id'},
  {field: 'name', header: 'Name'},
  {field: 'category', header: 'Category'},
  {field: 'quantity', header: 'Quantity'}
];

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data.slice(0, 9)));
})

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const getSeverity = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
</script>

<template>
  <div class="card-strict">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable>
  </div>

  <div class="card-strict sm:flex sm:justify-center">
    <OrderList v-model="products" dataKey="id" breakpoint="575px" pt:pcListbox:root="w-full sm:w-56">
      <template #option="{ option }">
        {{ option.name }}
      </template>
    </OrderList>
  </div>

  <div class="card-strict">
    <Carousel :value="products" :numVisible="2" :numScroll="2" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img height="200px" width="200px" :src="'/products/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />
              <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">Кол. {{ slotProps.data.quantity }}</div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2"/>
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
</style>