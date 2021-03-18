import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入组件
const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')
const menu = ()=>import('../pages/menu/menu')
const home = ()=>import('../pages/home/home')
const role = ()=>import('../pages/role/role')
const manager = ()=>import('../pages/manager/manager')
const cate = ()=>import('../pages/cate/cate')
const spec = ()=>import('../pages/spec/spec')
const goods = ()=>import('../pages/goods/goods')


export default new Router({
  routes: [
    {
      path:'/login',
      alias:'l',
      component:login
    },
    {
      path:'/',
      component:index,
      children:[
        {
          path:'home',
          name:'首页',
          component:home
        },
        {
          path:'menu',
          name:'菜单',
          component:menu
        },
        {
          path:'role',
          name:'角色',
          component:role
        },
        {
          path:'manager',
          name:'管理员',
          component:manager
        },
        {
          path:'cate',
          name:'商品分类',
          component:cate
        },
        {
          path:'spec',
          name:'商品规格',
          component:spec
        },
        {
          path:'goods',
          name:'商品管理',
          component:goods
        },
        {
          path:'',
          redirect:'/home',
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})