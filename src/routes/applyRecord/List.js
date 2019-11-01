import React from 'react'
import PropTypes from 'prop-types'
import {Table, Select} from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment";
const { Option } = Select;
import * as currentConfig from '../../utils/config'
const { txHash } = currentConfig
const { defaultImg } = currentConfig

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps, onDetail, onSendEmail, onDisplay, onLaunch,
}) => {
  location.query = queryString.parse(location.search)

  const statusChange = (record, value) => {
    onLaunch(value, record.id)
  }

  const imgNameStyle = {
    width: 30,
    height: 30,
    marginRight: 10,
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
      width: 250,
      render: (text, record) =>
        <div style={{ textAlign: 'left' }}>
          <img src={record.imgUrl ? record.imgUrl : defaultImg} alt="默认图标" style={imgNameStyle}/>
          <span>{record.projectName ? record.projectName : '-'}</span>
        </div>,
    }, {
      title: '用户类别',
      dataIndex: 'userType',
      key: 'userType',
      width: 150,
      render: (text, record) =>
      {
        if(record.userType) {
          if(record.userType === 1) {
            return "普通用户"
          } else if(record.userType === 2) {
            return "项目方"
          } else if(record.userType === 3){
            return "内部人员"
          }
        } else{
          return "-"
        }
      }
    }, {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text, record) => {
        if (record.phonePrefix) {
          if (record.phone) {
            if (record.phonePrefix.substring(0,1) === '+') {
              return <span>{record.phonePrefix}<br />{record.phone}</span>
            } else {
              return <span>+{record.phonePrefix}<br />{record.phone}</span>
            }
          } else {
            return '-'
          }
        } else {
          if (record.phone) {
            return `${record.phone}`
          } else {
            return '-'
          }
        }
      }
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 140,
      render: (text, record) => {
        if (record.email) {
          return `${record.email}`
        } else {
          return '-'
        }
      },
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return '未提交';
          case 1:
            return '待审核';
          case 2:
            return '评级中';
          case 3:
            return '已评级';
          case 4:
            return '尽调中';
          case 5:
            return 'Txhash待提交';
          case 6:
            return '审核未通过';
          // case 7:
          //  return '尽调未通过';
          case 8:
            return 'Txhash审核未通过';
          case 9:
            return '审核中';
          case 10:
            return '尽调信息待提交';
          case 11:
            return '尽调信息待审核';
          case 12:
            return '尽调信息未通过';
        }
      },
    }, {
      title: 'Txhash',
      dataIndex: 'txHash',
      key: 'txHash',
      width: 150,
      render: (text, record) => {
        if (record.txHash) {
          return <a href={txHash+`/tx/${record.txHash}`} target="_blank">{record.txHash}</a>
        } else {
          return "-"
        }
      },
    },{
      title: '提交时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      width: 180,
      render: (text, record) => {
        return moment(record.gmtCreate).format("YYYY-MM-DD HH:mm")
      },
    },{
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) =>
        <span className="operations">
          <a onClick={() => onDetail(record)} style={{ marginRight: 5 }}> 详情 </a>
          {record.status === 9 && <Select style={{ marginLeft: 5, width: 120 }} defaultValue={"操作"} onChange={ (value) => {statusChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={6}>审核未通过</Option>
            <Option value={2}>直接评级</Option>
          </Select>}
          {record.status === 2 && <Select style={{ marginLeft: 5, width: 120 }} defaultValue={"操作"} onChange={ (value) => {statusChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={3}>已评级</Option>
          </Select>}
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
