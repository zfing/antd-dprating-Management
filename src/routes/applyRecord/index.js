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
    list, pagination, currentItem, modalVisible, modalType, isMotion, selected, selectList, searchList,
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
    searchList,
    onClear () {
      dispatch({
        type: 'applyRecord/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 600,
    confirmLoading: loading.effects[`applyRecord/${modalType}`],
    title: '详情',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'applyRecord/create',
        payload: data,
      })
        .then(() => {
          dispatch({
            type: 'applyRecord/query',
          })
        })
    },
    onCancel () {
      dispatch({
        type: 'applyRecord/hideModal',
      })
    },
    // onSearch (value) {
    //   dispatch({
    //     type: 'applyRecord/Search',
    //     payload: value,
    //   })
    // },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['applyRecord/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onLaunch (value, id) {
      dispatch({
        type: 'applyRecord/update',
        payload: {
          id,
          status: value,
        },
      })
    },
    onDisplay (value, id) {
      dispatch({
        type: 'applyRecord/update',
        payload: {
          isPublic: value,
          id,
        },
      })
    },
    onDetail (item) {
      dispatch({
        type: 'applyRecord/detail',
        payload: {
          id: item.id,
        },
      })
    },
    onSendEmail (item) {
      dispatch({
        type: 'applyRecord/send',
        payload: item.userId,
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
        type: 'applyRecord/query',
        payload: {
          name: search,
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'applyRecord/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'applyRecord/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    onDR () {
      dispatch({
        type: 'applyRecord/showModalDR',
        payload: {
          modalType: 'upload',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'applyRecord/switchIsMotion' })
    },
  }

  return (
    <Page inner loading={loading.effects['applyRecord/detail']}>
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

export default connect(({ applyRecord, loading }) => ({ user: applyRecord, loading }))(User)
