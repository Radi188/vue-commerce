import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from '../views/AboutView.vue';
import AdminView from '../views/AdminView.vue';
import Overview from '../views/Overview.vue';
import ProductView from '../views/ProductView.vue';
import OrderView from '../views/OrderView.vue'
import ProfileView from '../views/ProfileView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import { getAuth } from 'firebase/auth';
import { fb } from "../firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: Overview,
        },
        {
          path: 'products',
          name: 'products',
          component: ProductView,
        },
        {
          path: 'orders',
          name: 'orders',
          component: OrderView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {

  const requireAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requireAuth && !getAuth().currentUser) {
    alert("You dont have access")
    next("/")
    console.log(getAuth().currentUser)
  } else if (requireAuth && getAuth().currentUser) {
    next()
    console.log(getAuth().currentUser)
  } else {
    next()
  }

});

export default router;
