import Home from './components/pages/home.vue'
import Sales from './components/pages/ventas.vue'
import Employees from './components/pages/employees.vue'
import PurchaseOfMaterials from '~/components/pages/purchase-of-materials.vue'
import Sale from './components/pages/sale.vue'
import Employee from './components/pages/employee.vue'
import Login from './components/pages/login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/', component: Home
}, {
  path: '/sales', component: Sales
}, {
  path: '/employees', component: Employees
}, {
  path: '/purchase_of_materials', component: PurchaseOfMaterials
},{
  path: '/sale/:id', component: Sale
}, {
  path: '/employee/:codigo', component: Employee
}, {
  path: '/login', component: Login
}]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
