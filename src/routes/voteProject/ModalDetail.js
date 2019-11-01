import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, message, InputNumber } from 'antd'
import styles from './modal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
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
          <FormItem label={<span {...labelStyle} >项目名称</span>} {...formItemLayout}>
            <span>{item.projectName}</span>
          </FormItem>
          <FormItem label={<span {...labelStyle} >当前票数</span>} {...formItemLayout}>
            <span>{item.votingNumber}</span>
          </FormItem>
          <FormItem label={<span {...labelStyle} >新加票数</span>} {...formItemLayout}>
            {getFieldDecorator('votingNumber', {
            })(<InputNumber min={1} style={{ width: '100%' }} />)}
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
