import { request, config } from 'utils'

const { api } = config
const {
  bannerList,
  bannerAdd,
  bannerUpdate,
  bannerDelete,
  bannerDetail,
} = api

export function query (params) {
  return request({
    url: bannerList,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: bannerDelete,
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: bannerAdd,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: bannerUpdate,
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: bannerDetail,
    method: 'get',
    data: params,
  })
}
