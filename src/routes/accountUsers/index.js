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
    list,
    pagination,
    isMotion,
    selected,
    selectList,
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

  const listProps = {
    dataSource: list,
    loading: loading.effects['accountUsers/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onblocked (status, id, qualification) {
      dispatch({
        type: 'accountUsers/blocked',
        payload: {
          id,
          status,
          qualification,
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
    onSearch (value) {
      dispatch({
        type: 'accountUsers/query',
        payload: {
          account: value,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'accountUsers/switchIsMotion' })
    },
  }


  return (
    <Page inner >
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

export default connect(({ accountUsers, loading }) => ({ user: accountUsers, loading }))(User)
