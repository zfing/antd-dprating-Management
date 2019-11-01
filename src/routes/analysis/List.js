import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Divider} from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment";
const { confirm } = Modal
import * as currentConfig from '../../utils/config'
const { defaultImg } = currentConfig

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps, onDetail, onSticky, onValue
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
  const isSticky = (record, event) => {
    const isSticky = Number(event.target.getAttribute("data-value"))
    onSticky(isSticky,record.id)
  }
  const isValue = (record, event) => {
    const isSticky = Number(event.target.getAttribute("data-value"))
    onValue(isSticky,record.id)
  }

  const imgNameStyle = {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: '50%',
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '分析币种',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 150,
      render: (text, record) =>
        <div style={{ textAlign: 'left' }}>
          <img src={record.headImg ? record.headImg : defaultImg} alt="默认图标" style={imgNameStyle}/>
          <span>{record.projectName ? record.projectName : '-'}</span>
        </div>,
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (text, record) => {
        if (record.title) {
          if (record.title.length > 80) {
            return record.title.replace(/\s+/g, "").substr(0, 60) + "..."
          } else {
            return record.title
          }
        } else {
          return '-'
        }
      }
    }, {
      title: '作者',
      dataIndex: 'userName',
      key: 'userName',
      width: 140,
      render: (text, record) => {
        if (record.userName) {
          return `${record.userName}`
        } else {
          return '-'
        }
      },
    },{
      title: '观点',
      dataIndex: 'point',
      key: 'point',
      width: 140,
      render: (text, record) => {
        switch (record.point) {
          case -2:
            return '卖出';
          case -1:
            return '减持';
          case 0:
            return '观望';
          case 1:
            return '增持';
          case 2:
            return '买入';
          default:
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
      width: 250,
      render: (text, record) =>
        <span className="operations">
          {record.topFlag && record.topFlag === 1 ? <a data-value="0" onClick={ (event) => {isSticky(record,event)}}>取消置顶</a> : <a data-value="1" onClick={ (event) => {isSticky(record,event)}}>置顶</a>}
          <Divider type="vertical" />
          {record.valuableFlag && record.valuableFlag === 1 ? <a data-value="0" onClick={ (event) => {isValue(record,event)}}>取消加精</a> : <a data-value="1" onClick={ (event) => {isValue(record,event)}}>加精</a>}
          <Divider type="vertical" />
          <a onClick={() => onDetail(record)} title="详情&更新">更新</a>
          <Divider type="vertical" />
          <a onClick={() => deleteItem(record)}> 删除 </a>
        </span>
      ,
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
