import { request, config } from 'utils'

const { api } = config
const {
  analysisArticleList, analysisArticleDelete, analysisDetail, analysisUpdate, analysisValue, analysisSticky,
} = api

export function query (params) {
  return request({
    url: analysisArticleList,
    method: 'get',
    data: params,
  })
}
export function detail (params) {
  return request({
    url: analysisDetail,
    method: 'get',
    data: params,
  })
}
export function update (params) {
  return request({
    url: analysisUpdate,
    method: 'post',
    data: params,
  })
}
export function remove (params) {
  return request({
    url: analysisArticleDelete,
    method: 'get',
    data: params,
  })
}
export function value (params) {
  return request({
    url: analysisValue,
    method: 'get',
    data: params,
  })
}
export function sticky (params) {
  return request({
    url: analysisSticky,
    method: 'get',
    data: params,
  })
}
