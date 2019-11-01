/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')

const { Option } = Select
const FormItem = Form.Item

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  onAdd,
  onAddEn,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleChange = (key, values) => {
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
      <FormItem label="中英文" {...styleFilter}>
        {getFieldDecorator('type', {
          initialValue: filter.type || '0',
          rules: [],
        })(<Select style={{ width: 150 }}
          onChange={handleChange.bind(null, 'type')}
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Option value="0">所有</Option>
          <Option value="1">中文</Option>
          <Option value="2">英文</Option>
        </Select>)}
      </FormItem>
      <FormItem {...styleFilter}>
        <Button type="primary" onClick={onAdd} style={{ marginRight: 10 }}>+ 添加（中文）</Button>
        <Button type="primary" onClick={onAddEn}>+ 添加（英文）</Button>
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
