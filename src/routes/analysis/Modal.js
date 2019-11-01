import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input } from 'antd'
import { debounce } from 'utils'
import { fileSignature } from 'services/ratingReport'
import styles from './modal.less'
import { request } from 'utils'
import 'moment/src/locale/zh-cn'

const { TextArea } = Input
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}
class modal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      id: props.item.id || '',
    }
  }
  render () {
    const {
      onCancel,
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
          type: 2,
          id: item.id,
          sourceType: 1,
        }
        onOk(data)
      })
    }

    const modalOpts = {
      onCancel,
      ...modalProps,
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
          <FormItem label={<span {...labelStyle} >标题</span>} {...formItemLayout} >
            {getFieldDecorator('title', {
              initialValue: item.title || '暂无',
              })(<Input />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >摘要</span>} {...formItemLayout}>
            {getFieldDecorator('subContent', {
              initialValue: item.subContent || '暂无',
              })(<Input />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >封面图地址</span>}{...formItemLayout}>
            {getFieldDecorator('headImg', {
                initialValue: item.headImg || '暂无',
              })(<Input />)}
          </FormItem>
          <FormItem label={<span {...labelStyle} >内容</span>} {...formItemLayout}>
            {getFieldDecorator('content', {
                  initialValue: item.content || '暂无',
                })(<TextArea autosize={{ minRows: 10 }} />)}
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
