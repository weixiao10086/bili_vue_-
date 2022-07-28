// 这个模块：API进行统一管理
import $axios from "./axios";


//注册
export const reqregister=(username,password)=>$axios({url:'/auth/register',method:'post',data:{
  username,password
}})

//登录
export const reqlogin=(username,password)=>$axios({url:'/auth/login',method:'post',data:{
  username,password
}})



