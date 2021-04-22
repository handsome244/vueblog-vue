import axios from "axios";
import router from "./router";
import store from "./store";
import Element from 'element-ui'

axios.defaults.baseURL = "http://localhost:8081"

//前置拦截,可以设置请求头等信息
axios.interceptors.request.use(config => {
    return config
})

//后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("=============")
        console.log(res)
        console.log("=============")
        if (res.code === 200) {
            return response;
        } else {
            Element.Message.error('这是有一条错误信息', {duration: 3 * 1000})
            //阻止返回
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error)

        if (error.response.data) {
            error.message = error.response.data.message
        }
        if (error.response.status === 401) {
            console.log("error:",error.response.status)
            store.commit("REMOVE_INFO")
            router.push("/login")
        }else {
            Element.Message.error(error.message, {duration: 3 * 1000})
            //阻止返回
            return Promise.reject(error)
        }
    }
)
