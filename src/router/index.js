import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Client/Login/Login.vue'
import Overview from '../views/Client/Overview/Overview.vue'
import Requests from '../views/Client/Requests/Requests.vue'
import UserMgmt from '../views/Client/UserMgmt/UserMgmt.vue'
import CreateRole from '../views/Client/UserMgmt/Roles/CreateRole.vue'
import EditRole from '../views/Client/UserMgmt/Roles/EditRole.vue'
import Activities from '../views/Client/Activities/Activities.vue'
import CardRequest from '../views/Client/Activities/CardRequest.vue'
import PinGeneration from '../views/Client/Activities/PinGeneration.vue'
import PinReIssue from '../views/Client/Activities/PinReIssue.vue'
import CardParam from '../views/Client/Activities/CardParam.vue'
import ChargeBack from '../views/Client/Activities/ChargeBack.vue'
import TransactionLog from '../views/Client/Activities/TransactionLog.vue'
import CardDeactivation from '../views/Client/Activities/CardDeactivation.vue'
import CardActivation from '../views/Client/Activities/CardActivation.vue'
import CardStatus from '../views/Client/Activities/CardStatus.vue'
import ActivityForm from "../views/Client/Activities/ActivityForm";




import Login2 from '../views/Admin/Login/Login.vue'
import Overview2 from '../views/Admin/Overview/Overview.vue'
import Companies2 from '../views/Admin/Companies/Companies.vue'
import Requests2 from '../views/Admin/Requests/Requests.vue'
import UserMgmt2 from '../views/Admin/UserMgmt/UserMgmt.vue'
import CreateRole2 from '../views/Admin/UserMgmt/Roles/CreateRole.vue'
import EditRole2 from '../views/Admin/UserMgmt/Roles/EditRole.vue'
import Activities2 from '../views/Admin/Activities/Activities.vue'



const routes = [
  {
    path: '/client/login',
    name: 'Login',
    component: Login,
    meta: { requiresMfbGuest: true }
  },
  {
    path: '/client/overview',
    name: 'Overview',
    component: Overview,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/requests',
    name: 'Requests',
    component: Requests,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/activities',
    name: 'Activities',
    component: Activities,
    meta: { requiresMfbAuth: true }
  },

  {
    path: '/client/user-management',
    name: 'UserMgmt',
    component: UserMgmt,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-request',
    name: 'CardRequest',
    component: CardRequest,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/activity-form/:slug',
    name: 'ActivityForm',
    component: ActivityForm,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/pin-generation',
    name: 'PinGeneration',
    component: PinGeneration,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/pin-reissue',
    name: 'PinReIssue',
    component: PinReIssue,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-parametization',
    name: 'CardParam',
    component: CardParam,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/chargeback-request',
    name: 'ChargeBack',
    component: ChargeBack,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/transaction-log',
    name: 'TransactionLog',
    component: TransactionLog,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-activation',
    name: 'CardActivation',
    component: CardActivation,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-deactivation',
    name: 'CardDeactivation',
    component: CardDeactivation,
    meta: { requiresMfbAuth: true }
  },
  {
    path: '/client/card-status',
    name: 'CardStatus',
    component: CardStatus,
    meta: { requiresMfbAuth: true }
  },


  {
    path: '/admin/login',
    name: 'Login2',
    component: Login2,
    meta: { requiresAdminGuest: true }
  },
  {
    path: '/admin/overview',
    name: 'Overview2',
    component: Overview2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/companies',
    name: 'Companies2',
    component: Companies2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/requests/:id',
    name: 'Requests2',
    component: Requests2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/activities',
    name: 'Activities2',
    component: Activities2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/create-role',
    name: 'CreateRole2',
    component: CreateRole2,
    meta: { requiresAdminAuth: true }
  },
  {
    path: '/admin/user-management',
    name: 'UserMgmt2',
    component: UserMgmt2,
    meta: { requiresAdminAuth: true }
  }

]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const admin_token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    if (admin_token) {
      next();
    }
    else {    
      next({path: '/admin/login'});
    }
  } else {    
    next();
  }
});

router.beforeEach((to, from, next) => {
  const mfb_token = localStorage.getItem('token-mfb');
  if (to.matched.some((record) => record.meta.requiresMfbAuth)) {
    if (mfb_token) {
      next();
    }
   else {    
    next({path: '/client/login'});
  }
}else {    
  next();
}
});

router.beforeEach((to, from, next) => {
  const admin_token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAdminGuest)) {
    if (admin_token) {
     next({path: '/admin/overview'});
    }
    else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const mfb_token = localStorage.getItem('token-mfb');
  if (to.matched.some((record) => record.meta.requiresMfbGuest)) {
    if (mfb_token) {
      next({path: '/client/overview'});
    }
    else {
      next();
    }
  } else {
    next();
  }
});

export default router
