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
        type: 'sowingMap/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    // width: 600,
    confirmLoading: loading.effects[`sowingMap/${modalType}`],
    title: `${modalType === 'create' ? '添加' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: `sowingMap/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sowingMap/hideModal',
      })
    },
    onSearch (value) {
      dispatch({
        type: 'sowingMap/Search',
        payload: value,
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['sowingMap/query'],
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
        type: 'sowingMap/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sowingMap/showModal',
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
        type: 'sowingMap/showModal',
        payload: {
          modalType: 'create',
          language: 'zh',
        },
      })
    },
    onAddEn () {
      dispatch({
        type: 'sowingMap/showModal',
        payload: {
          modalType: 'create',
          language: 'en',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'sowingMap/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    onDR () {
      dispatch({
        type: 'sowingMap/showModalDR',
        payload: {
          modalType: 'upload',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'sowingMap/switchIsMotion' })
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

export default connect(({ sowingMap, loading }) => ({ user: sowingMap, loading }))(User)
