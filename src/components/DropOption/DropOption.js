import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Icon, Menu } from 'antd'

const DropOption = ({
  onMenuClick, menuOptions = [], buttonStyle, dropdownProps, name,
}) => {
  const menu = menuOptions.map(item => (<Menu.Item key={item.key} style={{ textAlign: 'center' }}>
    {item.key === '0' && <div style={{ height: 1, background: '#d39399' }} />}
    {item.name}
  </Menu.Item>))
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    trigger={['click']}
    getPopupContainer={trigger => trigger.parentNode}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      {/* <Icon style={{ marginRight: 2 }} type="bars" /> */}
      <span>{name}</span>
      <Icon type="down" />
    </Button>
  </Dropdown>)
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
  name: PropTypes.string,
}

export default DropOption
