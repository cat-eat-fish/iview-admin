import axios from '@/libs/api.request'

export const login = ({ userName, password ,token}) => {
  const data = {
    userName,
    password,
    token
  }
  return axios.request({
    url: 'api/login',
    data,
    method: 'post'
  })
}

// 验证Token
export const checkUser = (token) => {
  return axios.request({
    url: 'api/admin/checkUser',
    data:{token},
    method: 'post'
  })
}


export const getUserInfo = (token,username) => {
  return axios.request({
    url: 'api/get_info',
    params: {token,username},
    // data:{token,username},
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'api/logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'api/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'api/message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'api/message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'api/message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'api/message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'api/message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}