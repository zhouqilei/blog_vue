import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const Login = () => import('@/views/login.vue')
const Register = () => import('@/views/register.vue')
const Home = () => import('@/views/home.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/editor',
    component: () => import('@/views/editor.vue')
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'menu',
        component: () => import('@/views/menu.vue')
      },
      {
        path: 'article',
        component: () => import('@/views/article.vue'),
        props: route => ({ query: route.query })
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router