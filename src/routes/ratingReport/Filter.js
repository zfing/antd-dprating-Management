/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Select } from 'antd'

const { Search } = Input
const { Option } = Select
const FormItem = Form.Item

const Filter = ({
  onFilterChange,
  // filter,
  onSearchProject,
  form: {
    getFieldsValue,
  },
}) => {
  const handleChange = (key, values) => {
    // console.log(key, values)
    let fields = getFieldsValue()
    fields[key] = values

    onFilterChange(fields)
  }

  // let initialCreateTime = []
  // if (filter.createTime && filter.createTime[0]) {
  //   initialCreateTime[0] = moment(filter.createTime[0])
  // }
  // if (filter.createTime && filter.createTime[1]) {
  //   initialCreateTime[1] = moment(filter.createTime[1])
  // }

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
        <Select style={{ width: 150 }} onChange={handleChange.bind(null, 'type')} defaultValue="-1" getPopupContainer={trigger => trigger.parentNode}>
          <Option value="-1">所有</Option>
          <Option value="1">待审核</Option>
          <Option value="0">评级中</Option>
          <Option value="2">已发布</Option>
        </Select>
      </FormItem>
      <FormItem {...styleFilter}>
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

export default Form.create()(Filter)
