import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
// import HeaderVue from './Header.vue'
// createApp(HeaderVue).mount('#header')
createApp(App).use(Router).mount('#app')
// new Vue({
//     router, 
//     render: h => h(App),
// }).mount('#app')