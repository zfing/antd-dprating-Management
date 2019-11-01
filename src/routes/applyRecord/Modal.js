import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Button } from 'antd'
import { debounce } from 'utils'
import { fileSignature } from 'services/ratingReport'
import styles from './modal.less'
import lodash from  'lodash'
import { request } from 'utils'
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
    super (props)
    let fileList = []
    if (!lodash.isEmpty(props.item)) {
      fileList = [
        {
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: props.item.imgUrl,
        },
      ]
    }
    this.state = {
      inputValue: props.item.coinName || '',
      coinId: '',
      loading: false,
      imageUrl: null,
      iconUrl: props.item.imgUrl || null,
      fileUrl: props.item.downloadUrl || null,
      id: props.item.id || '',
      fileList,
      year: null,
      month: null,
      rankTrend: null,
      radioValue: null,
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
        }
        onOk(data)
      })
    }

    const modalOpts = {
      onCancel,
      ...modalProps,
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
            <FormItem label={<span {...labelStyle} >项目名称</span>} {...formItemLayout} >
               <span>{item.projectName ? item.projectName : '暂无'}</span>
            </FormItem>
            <FormItem label={<span {...labelStyle} >联系人</span>} {...formItemLayout}>
                <span>{item.contactName ? item.contactName : '暂无'}</span>
            </FormItem>
            <FormItem  label={<span {...labelStyle} >邮箱</span>}{...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [],
              })(
                <span>{item.email ? item.email : '暂无'}</span>
              )}
            </FormItem>
            <FormItem  label={<span {...labelStyle} >网站</span>}{...formItemLayout}>
                <span>{item.website ? item.website : '暂无'}</span>
            </FormItem>
            <FormItem label={<span {...labelStyle} >电话</span>}{...formItemLayout}>
                <span>{item.phonePrefix ? (item.phonePrefix.substring(0,1) === '+' ? item.phonePrefix : '+'+item.phonePrefix) : null} {item.phone}</span>
            </FormItem>
            <FormItem  label={<span {...labelStyle} >微信</span>}{...formItemLayout}>
                 <span>{item.wechat ? item.wechat : '暂无'}</span>
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
