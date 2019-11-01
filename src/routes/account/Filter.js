/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Icon, message } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/src/locale/zh-cn'

moment.locale('zh-cn')
const FormItem = Form.Item
const { Search } = Input
const { confirm } = Modal

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
  onCreate,
  // filter,
  form: {
    getFieldDecorator,
  },
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
      display: 'flex',
      justifyContent: 'space-between',
    },
  }

  const createAccount = (value) => {
    // console.log(value)
    if (!value) {
      message.warning('邮箱不能为空')
      return null
    }
    confirm({
      title: '确定创建此账号吗？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onCreate(value)
      },
    })
  }
  return (
    <Form layout="inline" {...flexStyle} className="filterStyle">
      <FormItem label="分析师账号" style={{ marginRight: 0, marginBottom: 15, fontWeight: 600 }}>
        {getFieldDecorator('types', {
          initialValue: '',
          rules: [],
        })(<Search
          prefix={<Icon type="user-add" />}
          placeholder="请输入邮箱"
          enterButton="创建账号"
          size="default"
          onSearch={value => createAccount(value)}
          style={{ width: 350 }}
        />)}
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
