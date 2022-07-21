const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint效验工具
  lintOnSave: false,
    //  代理跨域
    // devServer:{
    //   proxy: {
    //     "/": {
    //       target: "http://localhost:3000",
    //       // pathRewrite: {"^/api" : ""}
    //     }
    //   }
    // }
})
