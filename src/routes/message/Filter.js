/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')
const { Option } = Select
const FormItem = Form.Item
const { Search } = Input

// const disabledDate = (current) => {
//   // Can not select days before today and today
//   return current && current < moment().endOf('day')
// }

const Filter = ({
  onSearchProject,
  onFilterChange,
  // filter,
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
    },
  }
  return (
    <Form layout="inline" className="filterStyle">
      <div {...styleFilter}>
        <FormItem label="时间">
          <Select style={{ width: 150 }} onChange={handleChange.bind(null, 'dateType')} defaultValue="0" getPopupContainer={trigger => trigger.parentNode}>
            <Option value="0">所有</Option>
            <Option value="1">3天</Option>
            <Option value="2">7天</Option>
            <Option value="3">一个月</Option>
          </Select>
        </FormItem>
        <FormItem label="类型">
          <Select style={{ width: 150 }} onChange={handleChange.bind(null, 'type')} defaultValue="0" getPopupContainer={trigger => trigger.parentNode}>
            <Option value="0">评论</Option>
            <Option value="1">回复</Option>
          </Select>
        </FormItem>
      </div>
      <div {...styleFilter}>
        <FormItem style={{ marginRight: 0 }}>
          <Search
            placeholder="输入关键字查询"
            onSearch={value => onSearchProject(value)}
            style={{ width: 300 }}
            enterButton="搜索"
          />
        </FormItem>
      </div>
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

// export { disabledDate }
export default Form.create()(Filter)
