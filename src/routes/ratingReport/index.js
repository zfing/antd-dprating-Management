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
    list, pagination, isMotion,
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
    loading: loading.effects['ratingReport/query'] || loading.effects['ratingReport/delete'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onRelease (item) {
      dispatch({
        type: 'ratingReport/release',
        payload: item,
      })
    },
    onDisplay (value, id) {
      dispatch({
        type: 'ratingReport/update',
        payload: {
          needDisplay: value,
          id,
        },
      })
    },
  }
  const filterProps = {
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
        type: 'ratingReport/query',
        payload: {
          sequence: search,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'ratingReport/switchIsMotion' })
    },
  }

  return (
    <Page inner>
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

export default connect(({ ratingReport, loading }) => ({ user: ratingReport, loading }))(User)
