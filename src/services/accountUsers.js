import { request, config } from 'utils'

const { api } = config
const { usersList, usersBlocked } = api

export function query (params) {
  return request({
    url: usersList,
    method: 'get',
    data: params,
  })
}

export function blocked (params) {
  return request({
    url: usersBlocked,
    method: 'get',
    data: params,
  })
}
