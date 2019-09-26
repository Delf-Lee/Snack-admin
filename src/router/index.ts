import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import ArticleForm from '@/views/NewArticle.vue'
import ArticleList from '@/views/ArticleList.vue'

import HeaderComponent from '@/components/Layouts/HeaderComponent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      name: 'home',
      components: {
        header: HeaderComponent,
        default: Home
      }
    },
    {
      path: '/admin/signin',
      name: 'Signin',
      components: {
        default: Signin
      }
    },
    {
      path: '/admin/articles',
      name: 'ArticleList',
      components: {
        default: ArticleList
      }
    },
    {
      path: '/admin/new-article',
      name: 'ArticleForm',
      components: {
        default: ArticleForm
      }
    },
  ]
})
