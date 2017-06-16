import Vue       from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/Index.vue'

Vue.use(VueRouter)

const base = 'GPKEDITOR - '

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/',
      component: Index,
      meta: {title: `${base}Index`}
    }
    ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
