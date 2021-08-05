import Axios from 'axios'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
const baseURL = '/api'

const axios = Axios.create({
  baseURL,
  timeout: 100000  //超时时间为10s
})

// 请求拦截器
axios.interceptors.request.use(req => {
  if (req.url !== '/user/login' && req.url !== '/user/register') {
    // 在请求头中添加user_id
    const userInfo = JSON.parse(Cookies.get("userInfo") ?? "{}");
    if (userInfo._id) {
      req.headers['user_id'] = userInfo._id;
    }
  }
  return req
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.status === 200) {
    if (res.data.errMsg) {
      ElMessage({
        message: res.data.errMsg,
        type: 'error'
      })
    }
    return res.data
  } else if (res.status === 500) {
    ElMessage({
      message: '系统异常',
      type: 'error'
    })
    return Promise.reject('系统异常')
  } else if (res.status === 404) {
    ElMessage({
      message: "网络错误",
      type: 'error'
    })
    return Promise.reject('网络异常')
  }
}, error => {
  return Promise.reject(error)
})

export default axios