//二次封装axios
import axios from 'axios';
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

var $axios = axios.create({
    baseURL: 'http://81.68.198.249:3001/',
    // baseURL: 'http://localhost:3001/',
    timeout: 5000,
});
// console.log('axios', this)
$axios.interceptors.request.use(function (config) {
    // console.log('request');
    // console.log(config)
    if (Vue.$cookies.get('token')) {
        config.headers.token = Vue.$cookies.get('token')
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});


$axios.interceptors.response.use(function (response) {
    // console.log('response');
    // console.log(response);
    if ((response.status == 200)||(response.status == 201)) {
        return response.data
    } else {
        alert('服务器出错')
    }
    return;
}, function (error) {
    return Promise.reject(error);
});

export default $axios; //暴露axios实例
