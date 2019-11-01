import { request, config } from 'utils'

const { api } = config
const { reportList, ratingRelease, ratingUpdate } = api

export function query (params) {
  return request({
    url: reportList,
    method: 'get',
    data: params,
  })
}

export function release (params) {
  return request({
    url: ratingRelease,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: ratingUpdate,
    method: 'post',
    data: params,
  })
}

