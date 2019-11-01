import { request, config } from 'utils'

const { api } = config
const { exchangeList, exchangeAdd, exchangeUpdate } = api

export function query (params) {
  return request({
    url: exchangeList,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  return request({
    url: exchangeAdd,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: exchangeUpdate,
    method: 'post',
    data: params,
  })
}
