import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { Record } from 'immutable';

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, language, isMotion, selected, selectList, searchList,
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
    language,
    selected,
    searchList,
    onClear () {
      dispatch({
        type: 'createVote/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    // width: 600,
    confirmLoading: loading.effects[`createVote/${modalType}`],
    title: `${modalType === 'create' ? '创建投票' : '更新投票'}`,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: `createVote/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'createVote/hideModal',
      })
    },
    onSearch (value) {
      dispatch({
        type: 'createVote/Search',
        payload: value,
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['createVote/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'createVote/delete',
        payload: id,
      })
    },
    onOpen (status, id) {
      dispatch({
        type: 'createVote/open',
        payload: {
          id,
          status,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'createVote/showModal',
        payload: {
          modalType: 'update',
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
    onAdd () {
      dispatch({
        type: 'createVote/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'createVote/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    onDR () {
      dispatch({
        type: 'createVote/showModalDR',
        payload: {
          modalType: 'upload',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'createVote/switchIsMotion' })
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

export default connect(({ createVote, loading }) => ({ user: createVote, loading }))(User)
