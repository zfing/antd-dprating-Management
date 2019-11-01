import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ModalDetail from './ModalDetail'
import ModalHistory from './ModalHistory'

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, isMotion, selected, selectList, modalType, searchList, modalVisible, currentItem, modalVisibleHistory, currentItemHistory,
  } = user

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalPropsDetail = {
    modalType,
    selected,
    searchList,
    onClear () {
      dispatch({
        type: 'broke/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['broke/detail'],
    title: '详情及更新',
    width: 1000,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: 'broke/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'broke/hideModal',
      })
    },
    onSearch (value) {
      dispatch({
        type: 'broke/Search',
        payload: value,
      })
    },
  }
  const modalPropsHistory = {
    modalType,
    dispatch,
    selected,
    searchList,
    onClear () {
      dispatch({
        type: 'broke/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: currentItemHistory,
    visible: modalVisibleHistory,
    maskClosable: false,
    confirmLoading: loading.effects['broke/history'],
    title: '历史记录',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'broke/hideModalHistory',
      })
    },
    onSearch (value) {
      dispatch({
        type: 'broke/Search',
        payload: value,
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['broke/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (record) {
      dispatch({
        type: 'broke/delete',
        payload: {
          id: record.id,
        },
      })
    },
    onDetail (item) {
      dispatch({
        type: 'broke/detail',
        payload: {
          id: item.id,
        },
      })
    },
    onHistory (item) {
      dispatch({
        type: 'broke/history',
        payload: {
          userId: item.userId,
        },
      })
    },
    onSticky (value, id) {
      dispatch({
        type: 'broke/sticky',
        payload: {
          status: value,
          id,
        },
      })
    },
    onValue (value, id) {
      dispatch({
        type: 'broke/value',
        payload: {
          status: value,
          id,
        },
      })
    },
  }
  const filterProps = {
    selectList,
    selected,
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onSearchProject (search) {
      dispatch({
        type: 'broke/query',
        payload: {
          seq: search,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'broke/switchIsMotion' })
    },
  }

  return (
    <Page inner loading={loading.effects['broke/detail']}>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <ModalDetail {...modalPropsDetail} />}
      {modalVisibleHistory && <ModalHistory {...modalPropsHistory} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ broke, loading }) => ({ user: broke, loading }))(User)
