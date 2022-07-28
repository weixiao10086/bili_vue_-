import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter)
    
// 先把Vue原型对象的push方法，先保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第二三个参数：失败的回调

VueRouter.prototype.push=function(location,resolve,reject){
if(resolve&&reject){
    // call||apply区别
    // call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this,location,resolve,reject)
}else{
    originPush.call(this,location,()=>{},()=>{})
}
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}


let router= new VueRouter({
    routes:routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部//vue3 为top:0
        return { y: 0 }
      },
})

export default router;


// 全局守卫：     前置守卫  （在路由跳转之前进行判断
router.beforeEach( (to,from,next)=>{
    // to       可以获取到你要跳转到那个路由的信息
    //from       可以获取到你从哪个路由来的信息
    //next       放行函数         next()放行
    // 用户登录的，才会有token,未登录一定不会有tonken
    let token=Vue.$cookies.get('token')
    if(token){
        //有token不允许进登录页
        if(to.path=='/login'){
            next('/indexpage/recommend')
        }else{
            next()
        }
    }else{
        if(to.path=='/personinit'){
            next('/login')
        }else{
            next()
        }
    }


})