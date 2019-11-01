import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, isMotion, selected,
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

  const filterProps = {
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
      return value
    },
    onSearchProject (search) {
      dispatch({
        type: 'message/query',
        payload: {
          seq: search,
          type: selected,
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'message/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'message/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'message/switchIsMotion' })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['message/query'],
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
        type: 'message/delete',
        payload: {
          id: record.id,
          type: selected,
        },
      })
    },
    onView (record) {
      dispatch({
        type: 'message/view',
        payload: {
          id: record.id,
          type: selected,
        },
      })
    },
    onSticky (id, status) {
      dispatch({
        type: 'message/sticky',
        payload: {
          id,
          status,
        },
      })
    },
  }

  return (
    <Page inner loading={loading.effects['message/detail']}>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ message, loading }) => ({ user: message, loading }))(User)
