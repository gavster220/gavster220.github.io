// import Vue from "vue";
// import Router from "vue-router";


// import Router from 'vue-router'
import {createRouter, createWebHistory } from 'vue-router'
import LoginScreen from './components/LoginScreen.vue'
import MonsterList from './components/MonsterList.vue'
import FunctionScreen from './components/FunctionScreen'

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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
