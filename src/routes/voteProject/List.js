import React from 'react'
import PropTypes from 'prop-types'
import { Table, Divider } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const List = ({
  onDeleteItem, isMotion, location, onAddTicket, onCancel, onSelected, ...tableProps
}) => {
  location.query = queryString.parse(location.search)
  const cancel = (record, event) => {
    const status = Number(event.target.getAttribute('data-value'))
    onCancel(status, record.id)
  }
  const selected = (record, event) => {
    const status = Number(event.target.getAttribute('data-value'))
    onSelected(status, record.id)
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 300,
      render: (text, record) =>
        <span>{record.projectName ? record.projectName : '-'}</span>,
    }, {
      title: '票数',
      dataIndex: 'votingNumber',
      key: 'votingNumber',
      width: 150,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return '参与中'
          case 1:
            return '被选中'
          case 2:
            return '被撤销'
          default:
            return '-'
        }
      },
    }, {
      title: '期数ID',
      dataIndex: 'periodsId',
      key: 'periodsId',
      width: 160,
    }, {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) =>
        (<span className="operations">
          <a data-value="1" onClick={(event) => { selected(record, event) }}>{record.status === 1 ? '已入选' : '入选'}</a>
          <Divider type="vertical" />
          <a data-value="2" onClick={(event) => { cancel(record, event) }}>{record.status === 2 ? '已撤销' : '撤销'}</a>
          <Divider type="vertical" />
          <a onClick={() => onAddTicket(record)} title="加票">加票</a>
        </span>),
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
