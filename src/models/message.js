/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query, remove, view, sticky } from 'services/message'
import { pageModel } from './common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'message',

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
        if (location.pathname === '/message') {
          const selected = {
            dateType: 0,
            type: 0,
          }
          const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload: {
              ...selected,
              ...payloads,
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
      const data = yield call(query, {
        ...payload,
      })
      if (data.resultCode === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.page.list,
            selected: data.data.type,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.page.totalSize,
            },
          },
        })
      } else {
        throw data
      }
    },

    * delete ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },

    * viewWords ({ payload }, { call, put }) {
      const data = yield call(view, payload)
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },

    * sticky ({ payload }, { call, put }) {
      const data = yield call(sticky, payload)
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },

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

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    searchSuccess (state, { payload }) {
      // console.log(payload)
      return { ...state, ...payload }
    },
    getCodeRankTimeSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
