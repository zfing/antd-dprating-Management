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
        type: 'dynamicContent/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`dynamicContent/${modalType}`],
    title: `${modalType === 'create' ? '新建项目' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: `dynamicContent/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'dynamicContent/hideModal',
      })
    },
    // onSearch (value) {
    //   dispatch({
    //     type: 'dynamicContent/Search',
    //     payload: value,
    //   })
    // },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['dynamicContent/query'],
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
        type: 'dynamicContent/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'dynamicContent/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  };

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
        type: 'dynamicContent/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },

    switchIsMotion () {
      dispatch({ type: 'dynamicContent/switchIsMotion' })
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

export default connect(({ dynamicContent, loading }) => ({ user: dynamicContent, loading }))(User)
