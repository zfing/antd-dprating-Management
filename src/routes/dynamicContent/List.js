import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
// eslint-disable-next-line import/first
import moment from 'moment'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const deleteItem = (record) => {
    confirm({
      title: '确定删除此信息？',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    }, {
      title: '名称',
      dataIndex: 'confKey',
      key: 'confKey',
      width: 150,
    }, {
      title: '值',
      dataIndex: 'confValue',
      key: 'confValue',
      width: 400,
    }, {
      title: '描述',
      dataIndex: 'confDesc',
      key: 'confDesc',
      width: 250,
    }, {
      title: '更新时间',
      dataIndex: 'gmtModify',
      key: 'gmtModify',
      width: 135,
      render: (text, record) => {
        return moment(record.gmtModify).format('YYYY-MM-DD HH:MM')
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 110,
      render: (text, record) =>
        (<div>
          <a onClick={() => onEditItem(record)}> 编辑 </a>
          <Divider type="vertical" />
          <a onClick={() => deleteItem(record)}> 删除 </a>
        </div>),
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  };

  const CommonBody = (props) => {
    return <tbody {...props} />
  };

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
};

export default List
