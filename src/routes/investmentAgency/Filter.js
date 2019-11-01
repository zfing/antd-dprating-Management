/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')

const { Search } = Input
const FormItem = Form.Item

// const disabledDate = (current) => {
//   // Can not select days before today and today
//   return current && current < moment().endOf('day')
// }

const Filter = ({
  onAdd,
  onSearch,
  // filter,
}) => {
  // let initialCreateTime = []
  // if (filter.createTime && filter.createTime[0]) {
  //   initialCreateTime[0] = moment(filter.createTime[0])
  // }
  // if (filter.createTime && filter.createTime[1]) {
  //   initialCreateTime[1] = moment(filter.createTime[1])
  // }

  const flexStyle = {
    style: {
      marginBottom: 15,
      marginRight: 0,
    },
  }

  return (
    <Form layout="inline" className="filterStyle investExchangeFilter">
      <FormItem {...flexStyle} style={{ marginRight: 5 }}>
        <Search
          placeholder="输入投资机构名称查询"
          onSearch={value => onSearch(value)}
          style={{ width: 300 }}
          enterButton="搜索"
        />
      </FormItem>
      <FormItem {...flexStyle}>
        <Button type="primary" onClick={onAdd} className="smallBtn">添加</Button>
      </FormItem>
    </Form>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
}

// export { disabledDate }
export default Form.create()(Filter)
