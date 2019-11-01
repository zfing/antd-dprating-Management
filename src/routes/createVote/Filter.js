/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')

const FormItem = Form.Item

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  onAdd,
}) => {
  const styleFilter = {
    style: {
      fontWeight: 'bold',
      marginBottom: 15,
      marginRight: 0,
    },
  }
  return (
    <Form layout="inline" className="filterStyle" style={{ justifyContent: 'flex-end' }}>
      <FormItem {...styleFilter}>
        <Button type="primary" onClick={onAdd}>创建投票</Button>
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
