import { request, config } from 'utils'

const { api } = config
const { votingProjectList, votingProjectUpdate } = api

export function query (params) {
  return request({
    url: votingProjectList,
    method: 'get',
    data: params,
  })
}

export function update (params) {
  return request({
    url: votingProjectUpdate,
    method: 'get',
    data: params,
    // isJsonPost: true,
  })
}
