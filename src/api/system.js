import axios from '@/libs/api.request'

export const database_notice_news = () => {
    return axios.request({
      url: '/api/database/notice_news',
      method: 'post'
    })
}

export const database_delnotice_news = () => {
    return axios.request({
      url: '/api/database/delnotice_news',
      method: 'post'
    })
}

export const database_admin = () => {
    return axios.request({
      url: '/api/database/admin',
      method: 'post'
    })
}

export const database_deladmin = () => {
    return axios.request({
      url: '/api/database/deladmin',
      method: 'post'
    })
}

export const database_advertisement = () => {
    return axios.request({
      url: '/api/database/advertisement',
      method: 'post'
    })
}

export const database_deladvertisement = () => {
    return axios.request({
      url: '/api/database/deladvertisement',
      method: 'post'
    })
}

export const database_delnullfile = () => {
    return axios.request({
      url: '/api/database/delnullfile',
      method: 'post'
    })
}

export const admin = () => {
  return axios.request({
    url: '/api/admin',
    method: 'post'
  })
}

export const delAdmin = (id) => {
  return axios.request({
    url: '/api/deladmin',
    data:{id},
    method: 'post'
  })
}

export const addAdmin = (form) => {
  return axios.request({
    url: '/api/myaddAdmin',
    data:{form},
    method: 'post'
  })
}

export const editAdmin = (form) => {
  console.log(1)
  return axios.request({
    url: '/api/editadmin',
    data:{form},
    method: 'post'
  })
}

