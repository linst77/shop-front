import { createWebHistory, createRouter } from "vue-router";

const InitView = () => import( /* webpackChunkName : "about" */ '@/view/InitView.vue');
const Navi = () => import( /* webpackChunkName : "Review" */ '@/view/Navi.vue')
const Profile = () => import( /* webpackChunkName : "UserVerify" */ '@/view/Profile.vue')
const Content = () => import( /* webpackChunkName : "UserVerify" */ '@/view/Content.vue')
const Review = () => import( /* webpackChunkName : "UserVerify" */ '@/view/Review.vue')

const Order = () => import( /* webpackChunkName : "Content" */ '@/view/order/Order.vue');
const Customerorder = () => import( /* webpackChunkName : "Content" */ '@/view/order/Customerorder.vue');
const Notfound = () => import( /* webpackChunkName : "Content" */ '@/view/order/Notfound.vue');
const Noorder = () => import( /* webpackChunkName : "Content" */ '@/view/order/Noorder.vue');


const routes = [
  {
    path: "/:email?/:language?",
    component: InitView,
    name: "initview",
    children: [
        {
          path: "navi",
          component: Navi,
          name: "navi",
          children: [
            {
              path: "profile",
              component: Profile,
              name: "profile",
            },
            {
              path: "content",
              component: Content,
              name: "content",
            },
            {
              path: "review",
              component: Review,
              name: "review",
            },

          ]
        },
      ]
  },
  {
    path: "",
    component: Order,
    name: "order",
    children: [
      {
        path: "",
        component: Notfound,
        name: "notfound",
      },
      {
        path: "customerorder",
        component: Customerorder,
        name: "customerorder",
      },

      {
        path: "noorder",
        component: Noorder,
        name: "noorder",
      }
    ]

  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;