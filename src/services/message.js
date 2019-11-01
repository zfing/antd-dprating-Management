import { request, config } from 'utils'

const { api } = config
const { messageList, deleteLeaveWords, messageSticky } = api

export function query (params) {
  return request({
    url: messageList,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: deleteLeaveWords,
    method: 'get',
    data: params,
  })
}

export function sticky (params) {
  return request({
    url: messageSticky,
    method: 'get',
    data: params,
  })
}
