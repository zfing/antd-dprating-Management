import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Divider} from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment";
const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, onDetail, onHistory, onSticky, onValue, ...tableProps
}) => {
  location.query = queryString.parse(location.search)
  const deleteItem = (record) => {
    confirm({
      title: '确定删除此信息？',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        onDeleteItem(record)
      },
    })
  };
  // 置顶
  const isSticky = (record, event) => {
    const isSticky = Number(event.target.getAttribute("data-value"))
    onSticky(isSticky,record.id)
  };
  // 加精
  const isValue = (record, event) => {
    const isValue = Number(event.target.getAttribute("data-value"))
    onValue(isValue,record.id)
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (text, record) =>
        <span>{record.title ? record.title : '-'}</span>,
    }, {
      title: '摘要',
      dataIndex: 'subContent',
      key: 'subContent',
      width: 300,
      render: (text, record) => {
        if (record.subContent) {
          if (record.subContent.length > 100) {
            return record.subContent.replace(/\s+/g, "").substr(0, 100) + "..."
          } else {
            return record.subContent
          }
        } else {
          return '-'
        }
      }
    },{
      title: '作者ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 140,
      render: (text, record) => {
        if (record.userId) {
          return `${record.userId}`
        } else {
          return '-'
        }
      },
    },{
      title: '发布时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      width: 160,
      render: (text, record) => {
        return moment(record.gmtCreate).format("YYYY-MM-DD HH:mm")
      },
    },{
      title: '操作',
      key: 'operation',
      width: 300,
      render: (text, record) =>
        <span className="operations">
         {record.topFlag && record.topFlag === 1 
          ? <a data-value="0" onClick={ (event) => {isSticky(record,event)}}>取消置顶</a> 
          : <a data-value="1" onClick={ (event) => {isSticky(record,event)}}>置顶</a>}
          <Divider type="vertical" />
          {record.valuableFlag && record.valuableFlag === 1 
            ? <a data-value="0" onClick={ (event) => {isValue(record,event)}}>取消加精</a> 
            : <a data-value="1" onClick={ (event) => {isValue(record,event)}}>加精</a>}
          <Divider type="vertical" />
          <a onClick={() => onDetail(record)} title="详情&更新">更新</a>
          <Divider type="vertical" />
          <a onClick={() => onHistory(record)} title="历史纪录">历史</a>
          <Divider type="vertical" />
          {record.isDeleted 
          ? (record.isDeleted === 0 
              ? <a onClick={() => deleteItem(record)}> 删除 </a> 
              : <span style={{color: 'red'}}> 已删 </span>) 
          : <a onClick={() => deleteItem(record)}> 删除 </a>}
        </span>,
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
