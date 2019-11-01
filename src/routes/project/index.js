import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, isMotion, selected, selectList, currentItem, modalVisible,
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
  const modalProps = {
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
    confirmLoading: loading.effects['project/update'],
    title: '更新',
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: 'project/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'project/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['project/query'],
    pagination,
    location,
    isMotion,
    selected,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onLaunch (value, id) {
      dispatch({
        type: 'project/launch',
        payload: {
          id,
          status: value,
        },
      })
    },
    onDisplay (value, id) {
      dispatch({
        type: 'project/display',
        payload: {
          needDisplay: value,
          id,
        },
      })
    },
    onSticky (value, id) {
      dispatch({
        type: 'project/sticky',
        payload: {
          isSticky: value,
          id,
        }
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'project/showModal',
        payload: {
          currentItem: item,
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
        type: 'project/query',
        payload: {
          sequence: search,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'project/switchIsMotion' })
    },
  }

  return (
    <Page inner >
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ project, loading }) => ({ user: project, loading }))(User)
