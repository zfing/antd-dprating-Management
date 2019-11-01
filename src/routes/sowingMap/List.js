import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import { defaultSowingMapImg } from '../../utils/config'
import styles from './List.less'

const { confirm } = Modal
const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const deleteCode = (record) => {
    // console.log(record)
    confirm({
      title: '确定删除此轮播图信息？',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }
  const bannerImgStyle = {
    width: 300,
    height: 100,
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      // width: 100,
    }, {
      title: 'Banner图',
      dataIndex: 'webImgUrl',
      key: 'webImgUrl',
      width: 250,
      render: (text, record) =>
        (<a href={record.webJumpUrl} target="_blank">
          <img src={record.webImgUrl ? record.webImgUrl : defaultSowingMapImg} alt={record.webImgUrl} {...bannerImgStyle} />
        </a>),
    }, {
      title: 'Banner描述',
      dataIndex: 'activityDesc',
      key: 'activityDesc',
    }, {
      title: '中英文',
      dataIndex: 'language',
      key: 'language',
      render: (text, record) => {
        if (record.type === 1) {
          return '中文'
        } return '英文'
      },
    },
    {
      title: '上线日期',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
      render: (text, record) => {
        return moment(record.releaseTime).format('YYYY-MM-DD HH:MM')
      },
    }, {
      title: '下架日期',
      dataIndex: 'downlineTime',
      key: 'downlineTime',
      render: (text, record) => {
        return moment(record.downlineTime).format('YYYY-MM-DD HH:MM')
      },
    }, {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === 1) {
          return '展示中'
        } else if (record.status === 2) {
          return '已过期'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 110,
      render: (text, record) =>
        (<div>
          <a onClick={() => onEditItem(record)}> 编辑 </a>
          <Divider type="vertical" />
          <a onClick={() => deleteCode(record)}> 删除 </a>
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
