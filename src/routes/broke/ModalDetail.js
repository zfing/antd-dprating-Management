import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, message } from 'antd'
import styles from './modal.less'

const { TextArea } = Input
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}
class modalDetail extends React.Component {
  render () {
    const {
      onCancel,
      item,
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      ...modalPropsDetail
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
        if (!data.title) {
          // eslint-disable-next-line consistent-return
          return message.warning('标题不能为空')
        } else if (!data.content) {
          // eslint-disable-next-line consistent-return
          return message.warning('内容不能为空')
        }
        onOk(data)
      })
    }

    const modalOpts = {
      onCancel,
      ...modalPropsDetail,
      onOk: handleOk,
      // footer: <div>
      //   <Button type="default" onClick={() => onCancel()}>关闭</Button>
      // </div>,
    }
    const labelStyle = {
      style: {
        fontWeight: 600,
      },
    }
    return (
      <Modal {...modalOpts} className={styles.modal}>
        <Form layout="horizontal" >
          <FormItem label={<span {...labelStyle} >标题</span>} {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title || '暂无',
            })(<Input />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >摘要</span>} {...formItemLayout}>
            {getFieldDecorator('subContent', {
              initialValue: item.subContent || '暂无',
            })(<Input />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >内容</span>} {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: item.content || '暂无',
            })(<TextArea autosize={{ minRows: 5 }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

modalDetail.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modalDetail)
