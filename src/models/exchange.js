/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query, create, update } from 'services/exchange'
import { pageModel } from './common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'exchange',

  state: {
    searchList: [],
    currentItem: {},
    selected: '',
    selectList: [],
    modalVisible: false,
    modalVisibleDR: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/exchange') {
          const selected = {
            page: '1',
            pageSize: '10',
          }
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload: {
              ...selected,
              ...payload,
            },
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      payload.currentPage = payload.page
      delete payload.page
      const data = yield call(query, payload)
      if (data.resultCode === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.totalSize,
            },
          },
        })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.resultCode === '0') {
        yield put({ type: 'hideModal' })
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({ type: 'query', payloads })
      } else {
        throw data
      }
    },
    // 更新 / 删除
    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.resultCode === '0') {
        yield put({ type: 'hideModal' })
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({ type: 'query', payload: payloads })
      } else {
        throw data
      }
    },

    // * Search ({ payload }, { call, put }) {
    //   if (!payload) {
    //     yield put({
    //       type: 'searchSuccess',
    //       payload: {
    //         searchList: [],
    //       },
    //     })
    //     return null
    //   }
    //   const data = yield call(fuzzySearch, { sequence: payload })
    //   // console.log(data)
    //   if (data.resultCode === '0') {
    //     yield put({
    //       type: 'searchSuccess',
    //       payload: {
    //         searchList: data.data,
    //       },
    //     })
    //   } else {
    //     throw data
    //   }
    // },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showModalDR (state) {
      return { ...state, modalVisibleDR: true }
    },

    hideModalDR (state) {
      return { ...state, modalVisibleDR: false }
    },

    searchSuccess (state, { payload }) {
      // console.log(payload)
      return { ...state, ...payload }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
