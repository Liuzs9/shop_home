import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {state,mutations,getters} from './mutations'
import actions from './actions'
import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manager,
        cate,
        spec,
        goods,
    }
})

export default store