import { request, config } from 'utils'

const { api } = config
const {
  createVoting,
  votingList,
  votingOpen,
  votingUpdate,
} = api

export function create (params) {
  return request({
    url: createVoting,
    method: 'post',
    data: params,
    isJsonPost: true,
  })
}

export function query (params) {
  return request({
    url: votingList,
    method: 'get',
    data: params,
  })
}

// export function remove (params) {
//   return request({
//     url: bannerDelete,
//     method: 'post',
//     data: params,
//   })
// }

export function open (params) {
  return request({
    url: votingOpen,
    method: 'get',
    data: params,
  })
}

export function update (params) {
  return request({
    url: votingUpdate,
    method: 'post',
    data: params,
    isJsonPost: true,
  })
}
