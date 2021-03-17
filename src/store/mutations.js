export const state = {
  // 存储登录后的用户信息
  user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}
export const mutations = {
  changeUser(state,user){
    // 建用户信心存入到store的state中
    state.user = user;
    if(user){
      // 同时将用户的信息存入sessionStorage中
      sessionStorage.setItem('user'.JSON.stringify(user))
    }else{
      sessionStorage.removeItem('user')
    }
  }
}
export const getters = {
  user(state){
    return state.user
  }
}