import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button } from 'antd'
import styles from './modal.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 20,
  },
  style: {
    marginBottom: 0,
  },
}
class modal extends React.Component {
  render () {
    const {
      onCancel,
      item,
      onOk,
      dispatch,
      form: {
        validateFields,
        getFieldsValue,
      },
      ...modalPropsHistory
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
        }
        onOk(data)
      })
    }
    const targetTitle = (value) => {
      dispatch({
        type: 'broke/query',
        payload: {
          seq: value,
        },
      });
      dispatch({
        type: 'broke/hideModalHistory',
      })
    }

    const modalOpts = {
      onCancel,
      ...modalPropsHistory,
      onOk: handleOk,
      footer: <div>
        <Button type="default" onClick={() => onCancel()}>关闭</Button>
      </div>,
    }
    const labelStyle = {
      style: {
        fontWeight: 600,
      },
    }
    return (
      <Modal {...modalOpts} className={styles.modal}>
        <Form layout="horizontal" >
          {item && item.map((data, key) =>
            (<FormItem label={<span {...labelStyle} >{ key + 1 }</span>} {...formItemLayout} key={key}>
              <span>{data.title ? <a onClick={() => { targetTitle(data.title) }}>{data.title}</a> : '暂无'}</span>
            </FormItem>))}
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.array,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
