import { request, config } from 'utils'

const { api } = config
const { linkList, linkAdd, linkUpdate } = api

export function query (params) {
  return request({
    url: linkList,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  return request({
    url: linkAdd,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: linkUpdate,
    method: 'post',
    data: params,
  })
}

/*
export function detail (params) {
  return request({
    url: bannerDetail,
    method: 'get',
    data: params,
  })
}
*/
