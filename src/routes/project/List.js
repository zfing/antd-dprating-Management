import React from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Select, Tag } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import styles from './List.less'
import { token, currentUrl, txHash, defaultImg } from '../../utils/config'

const { Option } = Select

const List = ({
  selected,
  onLaunch,
  onEditItem,
  onDisplay,
  onSticky,
  isMotion,
  location,
  ...tableProps
}) => {
  location.query = queryString.parse(location.search)


  const statusChange = (record, value) => {
    onLaunch(value, record.id)
  }

  const isSticky = (record, event) => {
    const IsSticky = Number(event.target.getAttribute('data-value'))
    onSticky(IsSticky, record.id)
  }

  const viewChange = (record, value) => {
    onDisplay(value, record.id)
  }


  const imgNameStyle = {
    width: 30,
    height: 30,
    marginRight: 10,
  }
  const previewStyle = {
    style: {
      margin: '10px 5px 10px 0',
    },
  }
  const selectStyle = {
    style: {
      margin: '0px 0px 0px 5px',
      width: 150,
    },
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
      width: 300,
      render: (text, record) =>
        (<div style={{ textAlign: 'left' }}>
          <img src={record.logoUrl ? record.logoUrl : defaultImg} alt={record.projectName} style={imgNameStyle} />
          <span>{record.projectName ? record.projectName : '-'}</span>
        </div>),
    }, {
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: 200,
      render: (text, record) => {
        const data = record.projectCategoryList
        return (<span>
          {data ? data.map((item, index) => {
            return (
              <Tag key={index} title={item.categoryName} style={{ margin: 2, minWidth: 70, textAlign: 'center' }}>
                {item.categoryName}
              </Tag>
            )
          }) : '-'}
        </span>)
      },
    }, {
      title: '项目简介',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text, record) => {
        if (record.description) {
          if (record.description.length > 80) {
            return <span title={record.description}>{`${record.description.replace(/\s+/g, '').substr(0, 60)}...`}</span>
          } return record.description
        } return '-'
      },
    }, {
      title: '提交时间',
      dataIndex: 'gmtModify',
      key: 'gmtModify',
      width: 150,
      render: (text, record) => {
        return moment(record.gmtModify).format('YYYY-MM-DD HH:mm')
      },
    }, {
      title: 'Txhash',
      dataIndex: 'txHash',
      key: 'txHash',
      width: 200,
      render: (text, record) => {
        if (record.txHash) {
          return <a href={`${txHash}/tx/${record.txHash}`} target="_blank">{record.txHash}</a>
        } return '-'
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      // eslint-disable-next-line consistent-return
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return '未提交'
          case 1:
            return '待审核'
          case 2:
            return '评级中'
          case 3:
            return '已评级'
          case 4:
            return '尽调中'
          case 5:
            return 'Txhash待提交'
          case 6:
            return '审核未通过'
          // case 7:
          //    return '尽调未通过'
          case 8:
            return 'Txhash审核未通过'
          case 9:
            return '审核中'
          case 10:
            return '尽调信息待提交'
          case 11:
            return '尽调信息待审核'
          case 12:
            return '尽调信息未通过'
          default: '-'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 250,
      render: (text, record) =>
        (<span className="operations">
          {
            ([4, 10, 11, 12].indexOf(record.status) === -1)
            ? <a href={`${currentUrl}/project/${record.id}?type=preview&from=admin&token=${token}`} {...previewStyle} target="_blank" > 预览 </a>
            : (record.investigationUrl
              ? (record.investigationUrl.substring(0, 4) === 'http'
                ? <a href={record.investigationUrl} target="_blank" {...previewStyle}> 预览 </a>
                : <a href={`//${record.investigationUrl}`} target="_blank" {...previewStyle}> 预览 </a>)
              : <a href="javascript:;" target="_blank" {...previewStyle} title="暂无链接"> 预览 </a>)
          }
          <Divider type="vertical" />
          {
            record.isSticky && record.isSticky === 1
            ? <a data-value="0" onClick={(event) => { isSticky(record, event) }}>取消置顶</a>
            : <a data-value="1" onClick={(event) => { isSticky(record, event) }}>置顶</a>
          }
          <Divider type="vertical" />
          <a onClick={() => onEditItem(record)}>更新</a>
          <Divider type="vertical" />
          {record.status === 1 && <Select {...selectStyle} defaultValue="操作" onChange={(value) => { statusChange(record, value) }} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={6}>不通过</Option>
            <Option value={10}>尽调信息待提交</Option>
            {/* <Option value={9}>审核中</Option> */}
            <Option value={2}>直接评级</Option>
          </Select>}

          {record.status === 4 && <Select {...selectStyle} defaultValue="操作" onChange={(value) => { statusChange(record, value) }} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={2}>直接评级</Option>
          </Select>}

          {record.status === 9 && <Select {...selectStyle} defaultValue="操作" onChange={(value) => { statusChange(record, value) }} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={6}>审核未通过</Option>
            <Option value={2}>直接评级</Option>
            </Select>
          }

          {record.status === 11 && <Select {...selectStyle} defaultValue="操作" onChange={(value) => { statusChange(record, value) }} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={4}>尽调中</Option>
            <Option value={12}>尽调信息未通过</Option>
          </Select>
          }
        </span>)
      ,
    }, {
      title: '是否展示',
      dataIndex: 'view',
      key: 'view',
      width: 100,
      render: (text, record) =>
        (<span>
          {([1, 2, 4, 5, 8, 9].indexOf(record.status) !== -1) &&
          <Select style={{ width: 50 }}
            defaultValue={record.needDisplay ? record.needDisplay : 0}
            onChange={(value) => { viewChange(record, value) }}
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>}
          {(record.status === 3 || record.status === 7) &&
          <Select style={{ width: 50 }}
            defaultValue={record.needDisplay ? record.needDisplay : 0}
            disabled
            onChange={(value) => { viewChange(record, value) }}
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>}
          {(record.status === 0 || record.status === 6) && <span>-</span>}
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
