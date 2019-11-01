import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, DatePicker, message, LocaleProvider, InputNumber } from 'antd'
import { files } from 'services/fileUpload'
// import lodash from 'lodash'
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

// const action = debounce((value, onSearch) => {
//   onSearch(value)
// }, 1000)

class modal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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

    const { endOpen } = this.state
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          votingStart: this.state.startValue || item.votingStart,
          votingEnd: this.state.endValue || item.votingEnd,
          id: item.id,
        }
        if (!data.periodsNumber) {
          message.warning('期数不能为空')
          return null
        } else if (!data.votingTitle) {
          message.warning('标题不能为空')
          return null
        } else if (!data.votingStart) {
          message.warning('投票开始时间不能为空')
          return null
        } else if (!data.votingEnd) {
          message.warning('投票结束时间不能为空')
          return null
        }
        // console.log(data)
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
              <FormItem label="期数" {...formItemLayout}>
                {getFieldDecorator('periodsNumber', {
                  initialValue: item.periodsNumber,
                })(<InputNumber {...inputWidth} min={1} placeholder="请输入期数" />)}
              </FormItem>
              <FormItem label="标题" {...formItemLayout}>
                {getFieldDecorator('votingTitle', {
                  initialValue: item.votingTitle,
                })(<Input {...inputWidth} placeholder="请输入标题" />)}
              </FormItem>
              <FormItem label="投票开始时间" {...formItemLayout}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择投票开始时间"
                  showTime
                  onChange={value => this.onStartChange(value)}
                  onOpenChange={this.handleStartOpenChange}
                  defaultValue={modalType === 'update' ? moment(item.votingStart) : null}
                  {...inputWidth}
                />
              </FormItem>
              <FormItem label="投票结束时间" {...formItemLayout}>
                <DatePicker
                  defaultValue={modalType === 'update' ? moment(item.votingEnd) : null}
                  disabledDate={this.disabledEndDate}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  placeholder="请选择投票结束时间"
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
