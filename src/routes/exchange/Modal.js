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
          type: '1',
          id: this.state.id,
        }
        if (!data.name) {
          message.warning('交易所名称不能为空')
          return null
        } else if (!data.website) {
          message.warning('交易所地址不能为空')
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
          <FormItem label="交易所名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
            })(<Input {...inputWidth} placeholder="请输入交易所名称" />)}
          </FormItem>
          <FormItem label="交易所地址" {...formItemLayout}>
            {getFieldDecorator('website', {
              initialValue: item.website,
            })(<Input {...inputWidth} placeholder="请输入交易所地址" />)}
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
