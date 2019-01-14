import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  let unreadList = []
  let readedList = []
  let trashList = []
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const getContentByMsgId = () => {
  return ``
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
  return 0
}
