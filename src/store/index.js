// import {reactive} from "vue";
// import router from "../router/index.js";
//
//
// const store = reactive({
//     articles: [],
//     fetchArticles() {
//         fetch('/articles.json')
//             .then(response => response.json())
//             .then(articles_fetch => this.articles.push(...articles_fetch))
//     },
//     addArticle(article) {
//         let last_id = this.articles.length
//         let newArticle = {
//             id: last_id + 1,
//             ...article
//         }
//         this.articles.push(newArticle)
//         console.log(article.title)
//     }
// })
//
// store.fetchArticles()
// console.log('Fetch data')
//
// export default store
