import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Menu } from 'antd'
import Icon from '@/components/Icon'
import classNames from 'classnames'
import { useHistory } from 'react-router'

const { SubMenu } = Menu
const MenuItem = Menu.Item

const MenuBox = () => {
  const [collapsed, setcollapsed] = useState<boolean>(false)
  const history = useHistory()

  const toggleCollapsed = () => {
    setcollapsed(f => !f)
  }

  useEffect(() => {
    const target = document.getElementsByClassName('ant-menu')
    console.log('🚀 ~ file: menu.tsx ~ line 21 ~ useEffect ~ target', target)
  }, [collapsed])

  const menus = [
    // {
    //   label: '销售管理',
    //   key: 'system1',
    //   icon: 'jack-xitong',
    //   children: [
    //     {
    //       label: '商品管理',
    //       key: 'userManage1',
    //       icon: 'jack-yonghu1',
    //       url: '/userManage'
    //     }
    //   ]
    // },
    // {
    //   label: '采购管理',
    //   key: 'enterprise2',
    //   icon: 'jack-qiye1',
    //   children: [
    //     {
    //       label: '供应商管理',
    //       key: 'audits21',
    //       icon: 'jack-caozuo',
    //       url: '/businessAudits'
    //     },
    //     {
    //       label: '物料管理',
    //       key: 'enterpriseManagement21',
    //       icon: 'jack-ziyuan143',
    //       url: '/enterprise'
    //     }
    //   ]
    // },
    {
      label: '基础配置',
      key: 'basicConfiguration',
      icon: 'jack-qiye1',
      children: [
        {
          label: '商品分类维护',
          key: 'classification',
          icon: 'jack-caozuo',
          url: '/erp/classify'
        },
        {
          label: '颜色维护',
          key: 'color',
          icon: 'jack-ziyuan143',
          url: '/erp/colour'
        },
        {
          label: '尺寸维护',
          key: 'size',
          icon: 'jack-caozuo',
          url: '/erp/measure'
        },
        {
          label: '其它配置',
          key: 'others',
          icon: 'jack-ziyuan143',
          url: '/erp/others'
        }
      ]
    }
  ]

  const getMenuDOM = data => {
    let hasChildren = false
    if (data.children && data.children.length) {
      hasChildren = true
    }

    if (hasChildren) {
      return (
        <SubMenu
          key={data.key}
          title={data.label}
          icon={<Icon type={data.icon} className={styles.menuIcon} />}
        >
          {data.children.map(i => getMenuDOM(i))}
        </SubMenu>
      )
    }
    return (
      <MenuItem
        key={data.key}
        icon={<Icon type={data.icon} className={styles.menuIcon} />}
      >
        {data.label}
      </MenuItem>
    )
  }

  const findRoute = (list: any[], key: string) => {
    let targetUrl = '/home'
    if (list && list.length && key) {
      for (let item of list) {
        if (item.key === key) {
          targetUrl = item.url
          return targetUrl
        }
        if (item.children && item.children.length) {
          const res = findRoute(item.children, key)

          if (res !== targetUrl) {
            return res
          }
        }
      }
    }
    return targetUrl
  }

  const changePage = (event: any) => {
    const { key } = event
    const target = findRoute(menus, key) || '/home'

    history.push(target)
  }

  return (
    <div className={classNames(styles.menu, collapsed && styles.miniMenu)}>
      <Menu
        defaultSelectedKeys={['classification']}
        defaultOpenKeys={['basicConfiguration']}
        mode="inline"
        inlineCollapsed={collapsed}
        style={{ flex: 1 }}
        multiple={false}
        onClick={changePage}
      >
        {menus.map(item => {
          return getMenuDOM(item)
        })}
      </Menu>

      <Icon
        onClick={toggleCollapsed}
        type={collapsed ? 'jack-menu-unfold' : 'jack-menu-fold'}
        className={classNames(
          styles.menuSwitchIcon,
          collapsed && styles.centerSwitchIcon
        )}
      ></Icon>
    </div>
  )
}

export default MenuBox
