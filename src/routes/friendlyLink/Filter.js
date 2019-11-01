/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
    padding: 0,
  },
}

const FR = {
  padding: 0,
  float: 'right',
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  onAdd,
  filter,
}) => {
  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <Row gutter={24} style={{ marginLeft: 0, marginRight: 0, marginBottom: 16 }}>
      {/* 搜索暂时不用 */}
      {/* <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }} style={FL}>
          <div style={{ textAlign: 'left' }}>
            <Search
              placeholder="输入友链名称查询"
              onSearch={value => onSearch(value)}
              style={{ width: 300 }}
              enterButton="搜索"
            />
          </div>
        </Col> */}
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }} style={FR}>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={onAdd}>添加</Button>
        </div>
      </Col>
    </Row>
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
