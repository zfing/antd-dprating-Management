import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Upload, Icon, message } from 'antd'
import { files } from 'services/fileUpload'
import lodash from 'lodash'
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
const imgClickStyle = {
  style: {
    textAlign: 'center',
  },
}

class modal extends React.Component {
  constructor (props) {
    super(props)
    let logoFileList = []
    if (!lodash.isEmpty(props.item)) {
      logoFileList = [
        {
          uid: -1,
          name: 'logo.png',
          status: 'done',
          url: props.item.logoUrl,
        },
      ]
    }
    this.state = {
      loading: false,
      logoUrl: props.item.logoUrl || null,
      id: props.item.id || '',
      logoFileList,
    }
  }

  onCustomRequest = async (info, saveType) => {
    try {
      // const self = this
      const { file } = info

      // eslint-disable-next-line no-undef
      let reader = new FileReader()

      // 限制上传图片尺寸
      /* reader.onload = function (e) {
        const Img = new Image()
        Img.onload = function () {
          if ( saveType === 'logoUrl'){
            if (Img.width != 150 && Img.height != 54){
              self.setState({ logoFileList: []})
              message.warning("请上传正确尺寸的图片")
            }
          }
        }
        Img.src = e.target.result
      }   */

      reader.readAsDataURL(file)

      const data = await files()
      const signData = JSON.parse(data.data)
      const filename = `${Date.now()}${parseInt(Math.random() * 10000)}.${file.type.substr(file.type.lastIndexOf('/') + 1)}`
      const uploadData = {
        name: filename,
        key: `${signData.dir}/dprating/${filename}`,
        policy: signData.policy,
        OSSAccessKeyId: signData.accessid,
        success_action_status: 200,
        signature: signData.signature,
        file,
      }
      // 文件路径
      const fileUrl = `${signData.host}/${uploadData.key}`
      this.setState({
        [saveType]: fileUrl,
      })
      await request({
        url: signData.host,
        method: 'upload',
        data: uploadData,
        withCredentials: true,
      })
      // 返回对象和文件，对象没有为空，将文件塞进去
      info.onSuccess({}, file)
    } catch (e) {
      // 全局打印报错
      message.error(e.message)
    }
  }
  handleChange = (info) => {
    this.setState({ logoFileList: info.fileList })
  };
  render () {
    const uploadWebButton = (
      <div style={{ width: 150, height: 54 }}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <span>尺寸要求：<div>（尽量选择 150 * 54）</div></span>
      </div>
    )
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

    const { logoFileList } = this.state
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          type: '2',
          logoUrl: this.state.logoUrl,
          id: this.state.id,
        }
        if (!data.logoUrl) {
          message.warning('logo不能为空')
          return null
        } else if (!data.name) {
          message.warning('机构名称不能为空')
          return null
        } else if (!data.website) {
          message.warning('机构官网不能为空')
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
        <div className="agencyLogo">
          <Form layout="horizontal">
            <FormItem label="logo" {...formItemLayout} {...imgClickStyle}>
              <Upload
                customRequest={info => this.onCustomRequest(info, 'logoUrl')}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={this.handleChange}
                fileList={logoFileList}
              >
                { logoFileList.length >= 1 ? null : uploadWebButton }
              </Upload>
            </FormItem>
            <FormItem label="机构名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
              })(<Input {...inputWidth} placeholder="请输入机构名称" />)}
            </FormItem>
            <FormItem label="机构官网" {...formItemLayout}>
              {getFieldDecorator('website', {
                initialValue: item.website,
              })(<Input {...inputWidth} placeholder="请输入机构官网" />)}
            </FormItem>
          </Form>
        </div>
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
