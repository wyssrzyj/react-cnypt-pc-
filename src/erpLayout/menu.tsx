import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Menu } from 'antd'
import { useLocation } from 'react-router'
import Icon from '@/components/Icon'
import classNames from 'classnames'
import { useHistory } from 'react-router'
import { get, isEmpty } from 'lodash'

const { SubMenu } = Menu
const MenuItem = Menu.Item

const MenuBox = () => {
  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const history = useHistory()
  const location = useLocation()

  const toggleCollapsed = () => {
    setCollapsed(f => !f)
  }

  useEffect(() => {}, [collapsed])

  const menus = [
    {
      label: '基础配置',
      key: 'basicConfiguration',
      icon: 'jack-shezhi',
      children: [
        {
          label: '商品分类维护',
          key: 'classification',
          icon: 'jack-gouwu',
          url: '/erp/classify'
        },
        {
          label: '颜色维护',
          key: 'color',
          icon: 'jack-yanse',
          url: '/erp/colour'
        },
        {
          label: '尺寸维护',
          key: 'size',
          icon: 'jack-shangyi',
          url: '/erp/measure'
        },
        {
          label: '其它配置',
          key: 'others',
          icon: 'jack-chuhang',
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

  const getSelectKey = menus => {
    menus.forEach(item => {
      const url = get(item, 'url', '')
      const children = get(item, 'children', [])
      if (url === location.pathname) {
        setCurrentMenu([item.key])
      } else if (!isEmpty(children)) {
        getSelectKey(children)
      }
    })
  }

  useEffect(() => {
    getSelectKey(menus)
    // setCurrentMenu(menuKeys.get(location.pathname))
    // setOpenKeys(subsMap.get(location.pathname))
  }, [location.pathname])

  return (
    <div className={classNames(styles.menu, collapsed && styles.miniMenu)}>
      <Menu
        selectedKeys={currentMenu}
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
