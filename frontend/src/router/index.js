import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta:{authRequired:true}

  },
  {
    path: '/signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/nav',
    component: () => import('../components/NavDrawer.vue')
  },
  {
    path:'/postForm',
    component: () => import('../components/PostForm.vue')
  },
  {
    path:'/postList',
    component: () => import('../views/PostList.vue')
  },
  {
    path: '/testForm',
    component: () => import('../components/testForm.vue'),
    meta:{authRequired:true}
  },
  {
    path: '/chartjs',
    name: 'VueChartJS',
    component: () => import('../views/VueChartJS.vue')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next)=>{
  if(to.matched.some(record => !record.meta.authRequired) || localStorage.getItem('token')){
    return next()
  }

  alert('로그인이 필요합니다')
  //return next
})


export default router;
