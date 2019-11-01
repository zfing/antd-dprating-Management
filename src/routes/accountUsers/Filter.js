/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')
const FormItem = Form.Item
const { Search } = Input

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  onSearch,
}) => {
  return (
    <Form layout="inline" style={{ marginBottom: 15 }} className="filterStyle">
      <FormItem>
        <Search
          placeholder="输入手机号或邮箱查询"
          onSearch={value => onSearch(value)}
          style={{ width: 300 }}
          enterButton="搜索"
        />
      </FormItem>
    </Form>
  )
}

Filter.propTypes = {
  onSearch: PropTypes.func,
}

export { disabledDate }
export default Form.create()(Filter)
