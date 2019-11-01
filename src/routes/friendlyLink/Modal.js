import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, message } from 'antd'
import 'moment/src/locale/zh-cn'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.item.id || '',
    }
  }

  render () {
    const {
      item = {},
      modalType,
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      ...modalProps
    } = this.props

    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: this.state.id,
        }
        if (!data.weight) {
          message.warning('权重不能为空')
          return null
        } else if (data.weight.length > 5) {
          message.warning('权重最多5位数')
          return null
        } else if (!data.zhName) {
          message.warning('中文友链名称不能为空')
          return null
        } else if (!data.enName) {
          message.warning('英文友链名称不能为空')
          return null
        } else if (!data.website) {
          message.warning('网址不能为空')
          return null
        }
        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    const inputWidth = {
      style: {
        width: 300,
      },
    }

    return (
      <Modal {...modalOpts} className="modalAlertBox">
        <Form layout="horizontal">
          <FormItem label="权重" {...formItemLayout}>
            {getFieldDecorator('weight', {
              initialValue: modalType === 'update' ? String(item.weight) : null,
            })(<Input type="number" {...inputWidth} placeholder="请输入数字(最多5位)" />)}
          </FormItem>
          <FormItem label="中文友链名称" {...formItemLayout}>
            {getFieldDecorator('zhName', {
              initialValue: item.zhName,
            })(<Input {...inputWidth} placeholder="请填写中文友链名称" />)}
          </FormItem>
          <FormItem label="英文友链名称" {...formItemLayout}>
            {getFieldDecorator('enName', {
              initialValue: item.enName,
            })(<Input {...inputWidth} placeholder="请填写英文友链名称" />)}
          </FormItem>
          <FormItem label="网址" {...formItemLayout}>
            {getFieldDecorator('website', {
              initialValue: item.website,
            })(<Input {...inputWidth} placeholder="请输入网址" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
