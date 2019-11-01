import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, DatePicker, Upload, Icon, message, LocaleProvider } from 'antd'
import { files } from 'services/fileUpload'
import lodash from 'lodash'
// import lrz from 'lrz'
import { request } from 'utils'
import moment from 'moment'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
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

// const action = debounce((value, onSearch) => {
//   onSearch(value)
// }, 1000)

class modal extends React.Component {
  constructor (props) {
    super(props)
    let webFileList = []
    let H5FileList = []
    if (!lodash.isEmpty(props.item)) {
      webFileList = [
        {
          uid: -1,
          name: 'webBanner.png',
          status: 'done',
          url: props.item.webImgUrl,
        },
      ]
      H5FileList = [
        {
          uid: -1,
          name: 'H5Banner.png',
          status: 'done',
          url: props.item.phoneImgUrl,
        },
      ]
    }
    this.state = {
      loading: false,
      webUrl: props.item.webImgUrl || null,
      H5Url: props.item.phoneImgUrl || null,
      webFileList,
      H5FileList,
      endOpen: false,
    }
  }

  onCustomRequest = async (info, saveType) => {
    try {
      // const self = this
      const { file } = info
      // eslint-disable-next-line no-undef
      let reader = new FileReader()
      // 限制上传图片尺寸
      /*  reader.onload = function (e) {
        const Img = new Image()
        Img.onload = function () {
          if ( saveType === 'webUrl'){
            if (Img.width != 1200 && Img.height != 180 ){
              self.setState({ webFileList: []})
              message.warning("请上传正确尺寸的图片")
            }
          } else if ( saveType === "H5Url"){
            if (Img.width != 750 && Img.height != 180 ){
              self.setState({ H5FileList: []})
              message.warning("请上传正确尺寸的图片")
            }
          }
        }
        Img.src = e.target.result
      } */

      reader.readAsDataURL(file)

      const data = await files()
      // console.log(data)
      const signData = JSON.parse(data.data)
      // eslint-disable-next-line radix
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
      // console.log(uploadData)
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
  // getDateTime = (value) => {
  //   this.setState({
  //     year : new Date(value._d).getFullYear(),
  //     month : new Date(value._d).getMonth() + 1,
  //   })
  // }
  // getTrend = (value) => {
  //   console.log(value)
  //   this.setState({
  //     rankTrend: value,
  //   })
  // };

  handleChange = (info) => {
    this.setState({ webFileList: info.fileList })
  };
  FilehandleChange = (info) => {
    this.setState({ H5FileList: info.fileList })
  };
  // handleChangeEn = (info) => {
  //   this.setState({ webFileListEn: info.fileList })
  // };
  // FilehandleChangeEn = (info) => {
  //   this.setState({ H5FileListEn: info.fileList })
  // };

  // imgClick = () => {
  //   const inputFile = ReactDOM.findDOMNode(this.refs.imgInput)
  //   inputFile.addEventListener('change', (e) => {
  //     lrz(e.target.files[0])
  //       .then((rst) => {
  //         // 处理成功会执行
  //         // console.log(rst)
  //         // eslint-disable-next-line react/no-unused-state
  //         this.setState({ imgSource: rst.base64 })
  //       })
  //       .catch((err) => {
  //         // 处理失败会执行
  //         throw err
  //       })
  //       .always(() => {
  //         // 不管是成功失败，都会执行
  //       })
  //   })
  //   inputFile.click()
  // };

  // nameQuery = (e) => {
  //   this.setState({ inputValue: e.target.value });
  //   action(e.target.value, this.props.onSearch) // 连续间隔1秒内执行，只会打印最后一次
  // };
  // getValue = (i) => {
  //   // console.log(i)
  //   this.props.onClear()
  //   this.setState({
  //     inputValue: i.coinName,
  //     coinId: i.coinId,
  //   })
  // };

  // time
  disabledStartDate = (startValue) => {
    // eslint-disable-next-line prefer-destructuring
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  };

  disabledEndDate = (endValue) => {
    // eslint-disable-next-line prefer-destructuring
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  };

  onStartChange = (value) => {
    // console.log(value.format('x'))
    this.setState({
      startValue: value.format('x'),
    })
  };

  onEndChange = (value) => {
    // console.log(value.format('x'));
    this.setState({
      endValue: value.format('x'),
    })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  };


  render () {
    const uploadWebButton = (
      <div style={{
        width: 300, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>尺寸要求：1200px * 180px</div>
      </div>
    )
    const uploadH5Button = (
      <div style={{
        width: 300, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>尺寸要求：750px * 180px</div>
      </div>
    )
    const {
      item = {},
      modalType,
      language,
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      ...modalProps
    } = this.props

    const { webFileList, H5FileList, endOpen } = this.state
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          webImgUrl: this.state.webUrl,
          appImgUrl: this.state.H5Url,
          releaseTime: this.state.startValue || item.releaseTime,
          downlineTime: this.state.endValue || item.downlineTime,
          id: item.id,
          type: language === 'zh' ? 1 : 2,
        }
        if (!data.weight) {
          message.warning('权重不能为空')
          return null
        } else if (data.weight.length > 9) {
          message.warning('权重最多为9位')
          return null
        } else if (!data.bannerDesc) {
          message.warning('描述不能为空')
          return null
        } else if (!data.webImgUrl) {
          message.warning('web图片不能为空')
          return null
        } else if (!data.webJumpUrl) {
          message.warning('web链接不能为空')
          return null
        } else if (!data.appImgUrl) {
          message.warning('H5图片不能为空')
          return null
        } else if (!data.phoneJumpUrl) {
          message.warning('H5链接不能为空')
          return null
        } else if (!data.releaseTime) {
          message.warning('上线时间不能为空')
          return null
        } else if (!data.downlineTime) {
          message.warning('下架时间不能为空')
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
      <LocaleProvider locale={zh_CN}>
        <Modal {...modalOpts} className="modalAlertBox">
          <div className="sowingMapBanner">
            <Form layout="horizontal">
              <FormItem label="权重" {...formItemLayout}>
                {getFieldDecorator('weight', {
                  initialValue: modalType === 'update' ? String(item.weight) : null,
                })(<Input type="number" {...inputWidth} placeholder="请输入数字(最多9位)" />)}
              </FormItem>
              <FormItem label="Banner描述" {...formItemLayout}>
                {getFieldDecorator('bannerDesc', {
                  initialValue: item.activityDesc,
                })(<Input {...inputWidth} placeholder="请输入描述" />)}
              </FormItem>
              {modalType === 'update' ?
                <FormItem label="Web端banner" {...formItemLayout} {...imgClickStyle}>
                  <Upload
                    customRequest={info => this.onCustomRequest(info, 'webUrl')}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={this.handleChange}
                    fileList={webFileList}
                  >
                    { webFileList.length >= 1 ? null : uploadWebButton }
                  </Upload>
                </FormItem> :
                <FormItem label={language === 'zh' ? "Web端Banner(中文)": "Web端Banner(英文)"} {...formItemLayout} {...imgClickStyle}>
                  <Upload
                    customRequest={info => this.onCustomRequest(info, 'webUrl')}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={this.handleChange}
                    fileList={webFileList}
                  >
                    { webFileList.length >= 1 ? null : uploadWebButton }
                  </Upload>
                </FormItem>
              }
              <FormItem label="链接地址" {...formItemLayout}>
                {getFieldDecorator('webJumpUrl', {
                  initialValue: item.webJumpUrl,
                })(<Input {...inputWidth} placeholder="请输入链接地址" />)}
              </FormItem>
              {modalType === 'update' ?
                <FormItem label="H5端Banner" {...formItemLayout} {...imgClickStyle}>
                  <Upload
                    customRequest={info => this.onCustomRequest(info, 'H5Url')}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={this.FilehandleChange}
                    fileList={H5FileList}
                  >
                    { H5FileList.length >= 1 ? null : uploadH5Button }
                  </Upload>
                </FormItem> :
                <FormItem label={language === 'zh' ? "H5端Banner(中文)" : "H5端Banner(英文)"} {...formItemLayout} {...imgClickStyle}>
                  <Upload
                    customRequest={info => this.onCustomRequest(info, 'H5Url')}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={this.FilehandleChange}
                    fileList={H5FileList}
                  >
                    { H5FileList.length >= 1 ? null : uploadH5Button }
                  </Upload>
                </FormItem>
              }
              <FormItem label="链接地址" {...formItemLayout}>
                {getFieldDecorator('phoneJumpUrl', {
                  initialValue: item.phoneJumpUrl,
                })(<Input {...inputWidth} placeholder="请输入链接地址" />)}
              </FormItem>
              <FormItem label="上线日期" {...formItemLayout}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="YYYY-MM-DD"
                  placeholder="请选择上线日期"
                  onChange={value => this.onStartChange(value)}
                  onOpenChange={this.handleStartOpenChange}
                  defaultValue={modalType === 'update' ? moment(item.releaseTime) : null}
                  {...inputWidth}
                />
              </FormItem>
              <FormItem label="下架日期" {...formItemLayout}>
                <DatePicker
                  defaultValue={modalType === 'update' ? moment(item.downlineTime) : null}
                  disabledDate={this.disabledEndDate}
                  format="YYYY-MM-DD"
                  placeholder="请选择下架日期"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                  {...inputWidth}
                />
              </FormItem>
            </Form>
          </div>
        </Modal>
      </LocaleProvider>
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
