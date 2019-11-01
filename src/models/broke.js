/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query, remove, detail, history, update, value, sticky } from 'services/broke'
import { pageModel } from './common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'broke',

  state: {
    searchList: [],
    currentItem: {},
    currentItemHistory: [],
    selected: '',
    selectList: [],
    modalVisible: false,
    modalVisibleHistory: false,
    // modalType: 'detail',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    // eslint-disable-next-line no-shadow
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/broke') {
          const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload: {
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

    * detail ({ payload }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.resultCode === '0') {
        yield put({
          type: 'showModal',
          payload: {
            currentItem: data.data,
          },
        })
      } else {
        throw data
      }
    },

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

    * history ({ payload }, { call, put }) {
      const data = yield call(history, payload)
      if (data.resultCode === '0') {
        yield put({
          type: 'showModalHistory',
          payload: {
            currentItemHistory: data.data,
          },
        })
      } else {
        throw data
      }
    },

    * value ({ payload }, { call, put }) {
      const data = yield call(value, payload)
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

    showModalHistory (state, { payload }) {
      return { ...state, ...payload, modalVisibleHistory: true }
    },

    hideModalHistory (state) {
      return { ...state, modalVisibleHistory: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    searchSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
    getCodeRankTimeSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
