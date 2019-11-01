import { request, config } from 'utils'

const { api } = config
const { applyRecordList, applyRecordDetail, applyRecordUpdate } = api

export function query (params) {
  return request({
    url: applyRecordList,
    method: 'get',
    data: params,
  })
}
export function details (params) {
  return request({
    url: applyRecordDetail,
    method: 'get',
    data: params,
  })
}

export function update (params) {
  return request({
    url: applyRecordUpdate,
    method: 'post',
    data: params,
  })
}