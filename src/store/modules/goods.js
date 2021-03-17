import {getGoods,goodsCount} from "../../utils/request"

const state = {
    goodsList:[],
    size:2,
    page:1,
    count:0,
}

const mutations = {
    changeGoodsList(state,arr){
        state.goodsList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    goodsListActions(context,value){
        var params = null;
        if(value !== null){
            params = {
                size:context.state.size,
                page:context.state.page,
            }
        }

        getGoods(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state,page > 1){
                var p = context.state.page - 1;
                context.commit("changePage",p)
                context.dispatch("goodsListActions")
                return;
            }
            context.commit('changeGoodsList',res.data.list)
        })
    },countActions(context){
        goodsCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit("changePage",page)
    }
}

const getters = {
    goodList(state){
        return state.goodList
    },
    count(state){
        return state.count
    },
    size(state){
        return state.size
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}