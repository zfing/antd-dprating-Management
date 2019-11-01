import React from 'react'
import { Icon } from 'antd'
import { Page } from 'components'
import styles from './index.less'

const ErrorStyle = {
  position: 'absolute',
  top: '30%',
  marginTop:'-50px',
  left:'40%',
  width: 'auto',
}

const Error = () => (<Page inner>
  <div className={styles.error} style={{...ErrorStyle}}>
    <Icon type="frown-o" />
    <h1>没有当前路由对应的页面，请点击<a href='/applyRecord'>返回首页</a></h1>
  </div>
</Page>)

export default Error
