import { request, config } from 'utils'

const { api } = config
const {
  brokeList, brokeDelete, brokeDetail, brokeHistory, brokeUpdate, brokeValue, brokeSticky,
} = api

export function query (params) {
  return request({
    url: brokeList,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: brokeDelete,
    method: 'get',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: brokeDetail,
    method: 'get',
    data: params,
  })
}

export function history (params) {
  return request({
    url: brokeHistory,
    method: 'get',
    data: params,
  })
}

export function update (params) {
  return request({
    url: brokeUpdate,
    method: 'get',
    data: params,
  })
}
export function value (params) {
  return request({
    url: brokeValue,
    method: 'get',
    data: params,
  })
}
export function sticky (params) {
  return request({
    url: brokeSticky,
    method: 'get',
    data: params,
  })
}
