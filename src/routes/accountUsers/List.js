import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { Table, Modal, Divider } from 'antd'
import { DropOption } from 'components'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, onblocked, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const blocked = (record, event) => {
    const status = Number(event.target.getAttribute('data-value'))
    const qualification = null
    confirm({
      title: `确定${status === 0 ? ' 解封 ' : ' 封禁 '}此账号吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onblocked(status, record.id, qualification)
      },
    })
  }

  const handleMenuClick = (record, e) => {
    const status = null
    const qualification = Number(e.key)
    onblocked(status, record.id, qualification)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return record.email ? record.email : '-'
      },
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => {
        return record.phone ? record.phone : '-'
      },
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return record.name ? record.name : '-'
      },
    }, {
      title: '认证类别',
      dataIndex: 'userQualification',
      key: 'userQualification',
      render: (text, record) => {
        const type = record.userQualification
        if (type) {
          return type === 1 ? '个人' : (type === 2 ? '机构' : '-')
        } return '-'
      },
    }, {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: (text, record) => {
        return moment(record.gmtCreate).format('YYYY-MM-DD HH:mm')
      },
    }, {
      title: '操作',
      key: 'operation',
      // width: 150,
      render: (text, record) =>
        (
          <span>
            {record.isClose === 0 ? <a data-value="1"
              onClick={(event) => { blocked(record, event) }}
              style={{ color: 'red' }}
            >封禁</a> : null}
            {record.isClose === 1 ?
              <a data-value="0"
                onClick={(event) => { blocked(record, event) }}
              >解封</a> : null}
            <Divider type="vertical" />
            <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '个人' }, { key: '2', name: '机构' }, { key: '0', name: '取消认证' }]} name="认证" />
          </span>
        ),
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
