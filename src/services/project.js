import { request, config } from 'utils'

const { api } = config
const {
  projectList,
  projectLaunch,
  projectDisplay,
  projectSticky,
  projectUpdate,
} = api


export function query (params) {
  return request({
    url: projectList,
    method: 'get',
    data: params,
  })
}

export function launch (params) {
  return request({
    url: projectLaunch,
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: projectUpdate,
    method: 'post',
    data: params,
  })
}

export function display (params) {
  return request({
    url: projectDisplay,
    method: 'post',
    data: params,
  })
}
export function sticky (params) {
  return request({
    url: projectSticky,
    method: 'get',
    data: params,
  })
}
