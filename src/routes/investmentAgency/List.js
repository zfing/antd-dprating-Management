import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import { defaultDpRatingImg } from '../../utils/config'
// eslint-disable-next-line import/first
import moment from 'moment'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const deleteCode = (record) => {
    confirm({
      title: '确定删除此信息？',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        onDeleteItem(record)
      },
    })
  }
  const imgNameStyle = {
    width: 150,
    height: 54,
    marginRight: 10,
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    }, {
      title: '投资机构',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (text, record) =>
        (<div style={{ textAlign: 'left' }}>
          <img src={record.logoUrl ? record.logoUrl : defaultDpRatingImg}
            alt={record.name}
            style={imgNameStyle}
          />
          <span>{record.name ? record.name : '-'}</span>
        </div>),
    }, {
      title: '机构官网',
      dataIndex: 'website',
      key: 'website',
      width: 300,
    }, {
      title: '更新时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      width: 135,
      render: (text, record) => {
        return moment(record.gmtCreate).format('YYYY-MM-DD HH:mm')
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
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
