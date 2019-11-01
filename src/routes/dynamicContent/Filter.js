/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import moment from 'moment'

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
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }} style={FR}>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={onAdd}>新建项目</Button>
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
