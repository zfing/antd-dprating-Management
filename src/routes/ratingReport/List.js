import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider, Select } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import styles from './List.less'
import { token, currentUrl, defaultImg } from '../../utils/config'

const { Option } = Select
const { confirm } = Modal

const List = ({
  isMotion, location, onRelease, onDisplay, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const releaseReport = (record) => {
    // console.log(record)
    confirm({
      title: '确定发布此评级报告？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onRelease(record.id)
      },
    })
  }
  const viewChange = (record, value) => {
    onDisplay(value, record.id)
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
      width: 100,
    }, {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 250,
      render: (text, record) =>
        (<div style={{ textAlign: 'left' }}>
          <img src={record.logoUrl ? record.logoUrl : defaultImg} alt={record.projectName} style={imgNameStyle} />
          <span>{record.projectName}</span>
        </div>),
    }, {
      title: '项目类型',
      dataIndex: 'categoryList',
      key: 'categoryList',
      width: 300,
      render: (text, record) => {
        if (record.categoryList) {
          const dataList = record.categoryList
          const dataType = []
          if (dataList) {
            for (let i = 0; i < dataList.length; i++) {
              dataType.push(dataList[i].categoryName)
            }
          }
          return dataType.join(' & ')
        } return '-'
      },
    }, {
      title: '可投资性评级',
      dataIndex: 'investScore',
      key: 'investScore',
      width: 130,
      render: (text, record) => {
        switch (record.investScore) {
          case 0:
            return 'D'
          case 1:
            return 'C'
          case 2:
            return 'Cc'
          case 3:
            return 'Ccc'
          case 4:
            return 'B'
          case 5:
            return 'Bb'
          case 6:
            return 'Bbb'
          case 7:
            return 'A'
          case 8:
            return 'Aa'
          case 9:
            return 'Aaa'
          default:
            return '-'
        }
      },
    }, {
      title: '风险评级',
      dataIndex: 'riskScore',
      key: 'riskScore',
      width: 100,
      render: (text, record) => {
        switch (record.riskScore) {
          case 'A':
            return '极低'
          case 'B':
            return '低'
          case 'C':
            return '中'
          case 'D':
            return '高'
          case 'E':
            return '极高'
          default:
            return '-'
        }
      },
    }, {
      title: '创建时间',
      dataIndex: 'gmtModify',
      key: 'gmtModify',
      width: 115,
      render: (text, record) => {
        return moment(record.gmtModify).format('YYYY-MM-DD HH:mm')
      },
    }, {
      title: '状态',
      dataIndex: 'ratingStatus',
      key: 'ratingStatus',
      width: 90,
      render: (text, record) => {
        if (record.ratingStatus === 0) {
          return '评级中'
        } else if (record.ratingStatus === 1) {
          return '待审核'
        } else if (record.ratingStatus === 2) {
          return '已发布'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) =>
        (<span>
          <a href={`${currentUrl}/rating/report/${record.id}?type=preview&from=admin&token=${token}`} style={{ marginRight: 5 }} target="_blank" > 预览 </a>
          {record.ratingStatus === 1 &&
          <span>
            <Divider type="vertical" />
            <a onClick={() => releaseReport(record)} style={{ marginLeft: 5 }}> 发布 </a>
          </span>}
        </span>),
    }, {
      title: '是否公开',
      dataIndex: 'needDisplay',
      key: 'needDisplay',
      width: 100,
      render: (text, record) =>
        (<span>
          <Select
            style={{ width: 85 }}
            defaultValue={record.needDisplay ? record.needDisplay : 2}
            onChange={(value) => { viewChange(record, value) }}
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Option value={2}>不公开</Option>
            <Option value={1}>公开</Option>
          </Select>
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
