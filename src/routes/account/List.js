import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment";

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps, onSend
}) => {
  location.query = queryString.parse(location.search)

  const sendMail = (record) => {
    console.log(record)
    confirm({
      title: '确定发送此账号吗？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onSend(record.id)
      },
    })
  }


  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '账号',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: (text, record) => {
        return moment(record.gmtCreate).format("YYYY-MM-DD HH:mm")
      },
    },
    {
      title: '发送状态',
      dataIndex: 'isSend',
      key: 'isSend',
      render: (text, record) => {
        if (record.role === 2) {
          if (record.isSend === 0) {
            return '未发送'
          } else if (record.isSend === 1) {
            return '已发送'
          } else {
            return '-'
          }
        } else {
          return '已发送'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      // width: 150,
      render: (text, record) =>
        <a onClick={() => sendMail(record)}>重发账号</a>,
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
