/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import 'moment/src/locale/zh-cn'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const { Option } = Select
const FormItem = Form.Item
const { Search } = Input

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  // selectList,
  // selected,
  // onSearchTime,
  // onAdd,
  // onDR,
  onSearchProject,
  // isMotion,
  // switchIsMotion,
  onFilterChange,
  filter,
  form: {
    // getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleChange = (key, values) => {
    // console.log(key, values)
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  const styleFilter = {
    style: {
      fontWeight: 'bold',
      marginBottom: 15,
      marginRight: 0,
    },
  }
  return (
    <Form layout="inline" className="filterStyle">
      <FormItem label="状态" {...styleFilter}>
        <Select style={{ width: 150 }} onChange={handleChange.bind(null, 'status')} defaultValue="" getPopupContainer={trigger => trigger.parentNode}>
          <Option value="">所有</Option>
          {/* <Option value="0">未提交</Option> */}
          {/* <Option value="1">待审核</Option> */}
          {/* <Option value="6">审核未通过</Option> */}
          {/* <Option value="7">尽调未通过</Option> */}
          {/* <Option value="4">尽调中</Option> */}
          {/* <Option value="10">尽调信息待提交</Option> */}
          {/* <Option value="11">尽调信息待审核</Option> */}
          {/* <Option value="12">尽调信息未通过</Option> */}
          <Option value="5">Txhash待提交</Option>
          <Option value="9">Txhash审核中</Option>
          <Option value="8">Txhash审核未通过</Option>
          <Option value="2">评级中</Option>
          <Option value="3">已评级</Option>
        </Select>
      </FormItem>
      <FormItem style={{ marginRight: 0 }} {...styleFilter}>
        <Search
          placeholder="输入项目名称查询"
          onSearch={value => onSearchProject(value)}
          style={{ width: 300 }}
          enterButton="搜索"
        />
      </FormItem>
    </Form>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export { disabledDate }
export default Form.create()(Filter)
