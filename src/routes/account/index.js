import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
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
    // currentItem,
    // modalVisible,
    // modalVisibleDR,
    // modalType,
    isMotion,
    selectedRowKeys,
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
    loading: loading.effects['account/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onSend (id) {
      dispatch({
        type: 'account/send',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'account/showModal',
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
    onCreate (email) {
      dispatch({
        type: 'account/create',
        payload: {
          email,
          type: 3,
        },
      })
    },
    onSearchTime (value) {
      dispatch({
        type: 'account/changeDate',
        payload: {
          selected: value.format('YYYY-M'),
        },
      })
    },
    onDR () {
      dispatch({
        type: 'account/showModalDR',
        payload: {
          modalType: 'upload',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'account/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'account/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }

  return (
    <Page inner >
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
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

export default connect(({ account, loading }) => ({ user: account, loading }))(User)
