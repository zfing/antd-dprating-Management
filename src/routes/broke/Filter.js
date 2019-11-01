/* global document */
import React from 'react'
import PropTypes from 'prop-types'
// import { FilterItem } from 'components'
import { Form, Input, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')
const FormItem = Form.Item
const { Option } = Select
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
  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  const handleChange = (key, values) => {
    // console.log(key, values)
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }
  const styleFilter = {
    style: {
      fontWeight: 600,
      marginBottom: 15,
      marginRight: 0,
    },
  }

  return (
    <Form layout="inline" className="filterStyle">
      <FormItem label="置顶加精" {...styleFilter}>
        <Select style={{ width: 150 }} onChange={handleChange.bind(null, 'type')} defaultValue="" getPopupContainer={trigger => trigger.parentNode}>
          <Option value="">所有</Option>
          <Option value="1">置顶</Option>
          <Option value="2">加精</Option>
        </Select>
      </FormItem>
      <FormItem style={{ marginRight: 0 }} {...styleFilter}>
        <Search
          placeholder="输入标题查询"
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
