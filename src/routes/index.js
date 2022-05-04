// import Router from 'vue-router'
import {createRouter, createWebHistory } from 'vue-router'
import LoginScreen from '../components/LoginScreen'
import MonsterList from '../components/MonsterList'
import FunctionScreen from '../components/FunctionScreen'

const routes = [
    {
        path: '/',
        name: 'LoginScreen',
        component: LoginScreen
    },
    {
        path: '/monster_list',
        name: 'MonsterList',
        component: MonsterList
    },
    {
        path: '/functions',
        name: 'FunctionScreen',
        component: FunctionScreen
    },
]

// export default new Router({
//         routes: [
//         {
//             path: '/',
//             name: 'LoginScreen',
//             component: LoginScreen
//         },
//         {
//             path: '/monster_list',
//             name: 'MonsterList',
//             component: MonsterList
//         },
//         {
//             path: '/functions',
//             name: 'FunctionScreen',
//             component: FunctionScreen
//         },
//     ]
// })
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
