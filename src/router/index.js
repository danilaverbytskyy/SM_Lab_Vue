import {createRouter, createWebHistory} from "vue-router";
// import store from "../store/index.js";
import ArticleListView from "../views/ArticleListView.vue";
import NewArticleView from "../views/NewArticleView.vue";
import AboutView from "../views/AboutView.vue";
import ArticleView from "../views/ArticleView.vue";
import {useArticlesStore} from "../store/pinia_index.js";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: ArticleListView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    {
        path: '/article/:id',
        component: ArticleView,
        props: (route) => {
            const store = useArticlesStore()
            return store.articles.find((x) => {
                return x.id == route.params.id
            })
        },
    },
    {
        path: '/new',
        name: 'addArticle',
        component: NewArticleView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
