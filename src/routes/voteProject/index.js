import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ModalDetail from './ModalDetail'

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, isMotion, selected, selectList, modalType, searchList, modalVisible, currentItem,
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
        type: 'voteProject/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['voteProject/detail'],
    title: '加票',
    // width: 1000,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: 'voteProject/update',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'voteProject/hideModal',
      })
    },
    onSearch (value) {
      dispatch({
        type: 'voteProject/Search',
        payload: value,
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['voteProject/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onAddTicket (item) {
      dispatch({
        type: 'voteProject/showModal',
        payload: {
          id: item.id,
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onCancel (status, id) {
      dispatch({
        type: 'voteProject/update',
        payload: {
          id,
          status,
        },
      })
    },
    onSelected (status, id) {
      dispatch({
        type: 'voteProject/update',
        payload: {
          id,
          status,
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
        type: 'voteProject/query',
        payload: {
          projectName: search,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'voteProject/switchIsMotion' })
    },
  }

  return (
    <Page inner loading={loading.effects['voteProject/detail']}>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <ModalDetail {...modalPropsDetail} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ voteProject, loading }) => ({ user: voteProject, loading }))(User)
