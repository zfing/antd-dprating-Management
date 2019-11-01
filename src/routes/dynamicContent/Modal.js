import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, message } from 'antd'
import 'moment/src/locale/zh-cn'

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends React.Component {
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
          id: item.id,
        }
        // eslint-disable-next-line no-shadow
        for (let item in data) {
          if (item === 'key' && !data[item]) {
            // eslint-disable-next-line consistent-return
            return message.warning('名称不能为空')
          } else if (item === 'value' && !data[item]) {
            // eslint-disable-next-line consistent-return
            return message.warning('值不能为空')
          }
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
          <FormItem label="名称" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: item.confKey,
            })(<Input {...inputWidth} placeholder="请输入名称" />)}
          </FormItem>
          <FormItem label="值" {...formItemLayout}>
            {getFieldDecorator('value', {
              initialValue: item.confValue,
            })(<Input {...inputWidth} placeholder="请输入值" />)}
          </FormItem>
          <FormItem label="描述" {...formItemLayout}>
            {getFieldDecorator('desc', {
              initialValue: item.confDesc,
            })(<TextArea placeholder="请输入描述" {...inputWidth} autosize={{ minRows: 2 }} />)}
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
