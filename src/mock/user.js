import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  // let unreadList = []
  // let readedList = []
  // let trashList = []
  // return {
  //   unread: unreadList,
  //   readed: readedList,
  //   trash: trashList
  // }

  let unreadList = []
  doCustomTimes(3, () => {
    unreadList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let readedList = []
  doCustomTimes(4, () => {
    readedList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let trashList = []
  doCustomTimes(2, () => {
    trashList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const getContentByMsgId = () => {
  return `测试 文字`
}

export const hasRead = () => {
  return true
}

// 移除已读
export const removeReaded = () => {
  return true
}

// 垃圾恢复
export const restoreTrash = () => {
  return true
}

// 消息中心数量
export const messageCount = () => {
  return 3
}
