import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = ' http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 100000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      // 主要看接口文档，本接口文档的headers参数为Authorization
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 因为响应回来的数据默认带一层data，所以要res.data
    // 如果响应成功，就返回数据
    if (res.data.code === 0) {
      return res
    }
    // 如果失败，则返回失败的数据
    // 这里使用了element的一个错误提示的插件ElMessage
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    console.log(err)
    // 如果状态码为401，就是权限不足（还没登陆）或者是token过期，这时候直接让用户返回到
    // 登录界面
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }

/*
import axios from 'axios'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res
  },
  (err) => {
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default instance
*/
