
import { reqregister, reqlogin } from '@/api';


//登录与注册模块
const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  //或者(需要引入封装)这个token(没必要)
  // token:getToken(),
  userInfo: ''
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地登录数据
  CLEAR(state) {
    //帮vuex仓库中相关用户信息清空
    state.token = '',
      state.userInfo = {};
    //本地存储清空
    localStorage.removeItem('TOKEN');
    //没必要封装
    // removeToken()
  }
};
const actions = {
  //用户注册
  async reqregister({ commit },data) {
    const { username, password } = data
    let result = await reqregister(username, password);
    console.log(result);
    if (result._id) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 登录   token
  async userLogin({ commit }, data) {
    try {
      const { username, password } = data;
      let result = await reqlogin(username, password)
      //将来经常通过token找服务器要用户信息进行展示
      if (result.token) {
        //用户已经登录成功，获取到了token
        commit('USERLOGIN', result.token);
        //本地持久化存储
        localStorage.setItem('TOKEN', result.token);
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    } catch (error) {

    }
  
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      //提交用户信息
      commit('GETUSERINFO', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  // async userLogout({commit}){
  //   //只是向服务器发请求，通知服务器清除token
  //    let result= await reqLogout();
  //   //  actions 里边不能操作state    需要提交mutations修改state
  //    if(result.code==200){
  //     commit('CLEAR');
  //     return 'ok'
  //    }else{
  //      return Promise.reject(new Error('faile'))
  //    }
  // }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}
