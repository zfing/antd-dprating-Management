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
        type: 'investmentAgency/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    // width: 700,
    confirmLoading: loading.effects[`investmentAgency/${modalType}`],
    title: `${modalType === 'create' ? '添加' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      dispatch({
        type: `investmentAgency/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'investmentAgency/hideModal',
      })
    },
    // onSearch (value) {
    //   dispatch({
    //     type: 'investmentAgency/Search',
    //     payload: value,
    //   })
    // },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['investmentAgency/query'],
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
        type: 'investmentAgency/update',
        payload: {
          id: record.id,
          isDeleted: 1,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'investmentAgency/showModal',
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
        type: 'investmentAgency/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'investmentAgency/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    onSearch (search) {
      dispatch({
        type: 'investmentAgency/query',
        payload: {
          sequence: search,
        },
      })
    },
    onDR () {
      dispatch({
        type: 'investmentAgency/showModalDR',
        payload: {
          modalType: 'upload',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'investmentAgency/switchIsMotion' })
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

export default connect(({ investmentAgency, loading }) => ({ user: investmentAgency, loading }))(User)
