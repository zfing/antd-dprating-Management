import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, message } from 'antd'
import 'moment/src/locale/zh-cn'

const { TextArea } = Input
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
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
        if (!data.txHash) {
          message.warning('Txhash不能为空')
          return null
        }
        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }
    const labelStyle = {
      style: {
        fontWeight: 600,
      },
    }
    const inputWidth = {
      style: {
        width: 300,
      },
    }

    return (
      <Modal {...modalOpts} className="modalAlertBox">
        <Form layout="horizontal">
          <FormItem label={<span {...labelStyle} >Txhash</span>} {...formItemLayout}>
            {getFieldDecorator('txHash', {
              initialValue: item.txHash,
            })(<Input {...inputWidth} placeholder="请输入Txhash" />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >中文描述</span>} {...formItemLayout}>
            {getFieldDecorator('txHashDesc', {
              initialValue: item.txHashDesc,
            })(<TextArea {...inputWidth} placeholder="请输入中文描述" />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >英文描述</span>} {...formItemLayout}>
            {getFieldDecorator('txHashDescEn', {
              initialValue: item.txHashDescEn,
            })(<TextArea {...inputWidth} placeholder="请输入英文描述" />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >韩文描述</span>} {...formItemLayout}>
            {getFieldDecorator('txHashDescKo', {
              initialValue: item.txHashDescKo,
            })(<TextArea {...inputWidth} placeholder="请输入韩文描述" />)}
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
