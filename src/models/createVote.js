/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query, create, remove, open, update } from 'services/createVote'
import { pageModel } from './common'
import { message } from 'antd';

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'createVote',

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
        if (location.pathname === '/createVote') {
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

    * open ({ payload }, { call, put }) {
      const data = yield call(open, payload)
      if (data.resultCode === '0') {
        yield put({ type: 'hideModal' })
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({ type: 'query', payload: payloads })
      } else if (data.resultCode === '5001') {
        return message.warning('已有活动开启，请关闭后再操作')
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
