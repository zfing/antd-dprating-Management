import React from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, message } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import styles from './List.less'

const List = ({
  onDeleteItem, onOpen, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const open = (record, event) => {
    const status = Number(event.target.getAttribute('data-value'))
    onOpen(status, record.id)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,

    }, {
      title: '期数',
      dataIndex: 'periodsNumber',
      key: 'periodsNumber',
      width: 100,
    }, {
      title: '标题',
      dataIndex: 'votingTitle',
      key: 'votingTitle',
      width: 250,
    }, {
      title: '投票开始时间',
      dataIndex: 'votingStart',
      key: 'votingStart',
      render: (text, record) => {
        return moment(record.votingStart).format('YYYY-MM-DD HH:MM')
      },
    }, {
      title: '投票结束时间',
      dataIndex: 'votingEnd',
      key: 'votingEnd',
      render: (text, record) => {
        return moment(record.votingEnd).format('YYYY-MM-DD HH:MM')
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status) {
          if (record.status === 0) {
            return '未开启'
          } else if (record.status === 1) {
            return '已开启'
          }
        } return '未开启'
      },
    }, {
      title: '操作',
      key: 'operation',
      // width: 250,
      render: (text, record) =>
        (<div>
          {record.status && record.status === 1
          ? <a data-value="0" onClick={(event) => { open(record, event) }}>关闭</a>
          : <a data-value="1" onClick={(event) => { open(record, event) }}>开启</a>}
          <Divider type="vertical" />
          <a onClick={() => onEditItem(record)}>更新</a>
        </div>),
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
