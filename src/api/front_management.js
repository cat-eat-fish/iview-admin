import axios from '@/libs/api.request'

export const advertisement = () => {
    return axios.request({
      url: '/api/advertisement',
      method: 'post'
    })
}

export const deladvertisement = ({id}) => {
    return axios.request({
      url: '/api/deladvertisement',
      data:{id:id},
      method: 'post'
    })
}

export const notice_news = () => {
    return axios.request({
      url: '/api/notice_news',
      method: 'post'
    })
}

export const notice_news_release = (id) => {
    return axios.request({
      url: '/api/notice_news/release',
      data:{id:id},
      method: 'post'
    })
}

export const delnotice_news = ({id}) => {
    return axios.request({
      url: '/api/delnotice_news',
      data:{id:id},
      method: 'post'
    })
}






