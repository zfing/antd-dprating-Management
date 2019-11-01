import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider } from 'antd'
import moment from 'moment/moment'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onView, onSticky, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const deleteItem = (record) => {
    console.log(record)
    confirm({
      title: '确定删除此信息？',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        onDeleteItem(record)
      },
    })
  }

  const sticky = (record, event) => {
    const IsSticky = Number(event.target.getAttribute('data-value'))
    onSticky(record.id, IsSticky)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 250,
      render: (text, record) => {
        if (record.content) {
          // 去掉标签
          const content = record.content.replace(/<.*?>/ig, '')
          if (content.length > 80) {
            return `${content.replace(/\s+/g, '').substr(0, 60)}...`
          } return content
        } return '-'
      },
    }, {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (text, record) => {
        if (record.userName) {
          return record.userName
        } return '-'
      },
    }, {
      title: '发布时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      width: 160,
      render: (text, record) => {
        return moment(record.gmtCreate).format('YYYY-MM-DD HH:mm')
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) =>
        (<span>
          {record.topFlag === 0 ? <a data-value="1" onClick={(event) => { sticky(record, event) }}>置顶</a> : null}
          {record.topFlag === 1 ? <a data-value="0" onClick={(event) => { sticky(record, event) }}>取消置顶</a> : null}
          {[0, 1].indexOf(record.topFlag) !== -1 && <Divider type="vertical" />}
          <a onClick={() => deleteItem(record)}> 删除 </a>
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
