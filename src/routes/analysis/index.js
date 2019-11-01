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
    list, pagination, isMotion, selected, selectList, modalVisible, modalType, currentItem,
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
    modalType,
    selected,
    onClear () {
      dispatch({
        type: 'analysis/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 1200,
    confirmLoading: loading.effects['analysis/detail'],
    title: '详情及更新',
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: 'analysis/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'analysis/hideModal',
      })
    },
    // onSearch (value) {
    //   dispatch({
    //     type: 'analysis/Search',
    //     payload: value,
    //   })
    // },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['analysis/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetail (item) {
      dispatch({
        type: 'analysis/detail',
        payload: {
          id: item.id,
        },
      })
    },
    onDeleteItem (record) {
      dispatch({
        type: 'analysis/delete',
        payload: {
          id: record.id,
        },
      })
    },
    onSticky (value, id) {
      dispatch({
        type: 'analysis/sticky',
        payload: {
          status: value,
          id,
        },
      })
    },
    onValue (value, id) {
      dispatch({
        type: 'analysis/value',
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
        type: 'analysis/query',
        payload: {
          seq: search,
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'analysis/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'analysis/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'analysis/switchIsMotion' })
    },
  }

  return (
    <Page inner loading={loading.effects['analysis/detail']}>
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

export default connect(({ analysis, loading }) => ({ user: analysis, loading }))(User)
