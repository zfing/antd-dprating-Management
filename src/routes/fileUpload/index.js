import React from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, Icon } from 'antd'
import { Page } from 'components'
import { message } from "antd/lib/index"
import { request } from 'utils'
import { files } from 'services/fileUpload'

class User extends React.Component {
  constructor () {
    super()
    this.state = {
      fileUrl: null,
    }
  }
  onCustomRequest = async (info) => {
    // 100以内随机整数
    const str = Math.round(Math.random() * 100)
    try {
      const { file } = info
      const data = await files()
      const signData = JSON.parse(data.data)
      const filename = file.name
      const uploadData = {
        name: filename,
        key: `${signData.dir}/rating/${str}-${filename}`,
        policy: signData.policy,
        OSSAccessKeyId: signData.accessid,
        success_action_status: 200,
        signature: signData.signature,
        file,
      }
      // 文件路径
      // eslint-disable-next-line camelcase
      const file_url = `${signData.host}/${uploadData.key}`
      console.log(file_url)
      this.setState({
        fileUrl: file_url,
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
  onChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  }
  render () {
    return (
      <Page inner>
        <Upload
          customRequest={this.onCustomRequest}
          onChange={this.onChange}
        >
          <Button>
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
        <br />
        <div>文件地址：{this.state.fileUrl}</div>
      </Page>
    )
  }
}

User.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  location: PropTypes.object,
}

export default User
