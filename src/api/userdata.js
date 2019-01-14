import axios from '@/libs/api.request'

// 用户数据
export const username = () => {
  return axios.request({
    url: 'https://www.easy-mock.com/mock/5c1c431cc0d4cb7899468a5d/iview_admin/iview_admin',
    methods: 'post'
  })
}
