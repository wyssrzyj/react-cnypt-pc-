import React, { useEffect, useState } from 'react'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'
import BG_LOGO from './bgLogo.png'
import { Tabs, Input, Button } from 'antd'
import { useLocation, useHistory } from 'react-router'

const { TabPane } = Tabs
// const { Option } = Select

type OptionType = {
  label: string
  key: number | string
  url?: string
}

const Search = () => {
  const location = useLocation()
  const history = useHistory()
  const { commonStore } = useStores()
  const { factoryName, updateName } = commonStore

  const tabs: Array<OptionType> = [
    { label: '首页', url: '/platform/home', key: 'home' },
    { label: '订单', url: '/platform/order', key: 'order' },
    { label: '找工厂', url: '/platform/factory', key: 'factory' }
  ]

  const searchTabs: Array<OptionType> = [
    { label: '工厂', key: 'factory' },
    { label: '订单', key: 'order' }
  ]

  const [activityKey, setActivityKey] = useState<string>('home')
  const [searchKey, setSearchKey] = useState<string>('factory')
  // const [companyType, setCompanyType] = useState<number>(1)
  const [searchWord, setSearchWord] = useState<string>(factoryName)

  useEffect(() => {
    const init = { label: '首页', url: '/platform/home', key: 'home' }
    let target = tabs.find(item => item.url === location.pathname) || init

    if (location.pathname.includes('/platform/order-search')) {
      target = { label: '订单', url: '/platform/order-search', key: 'order' }
    }

    if (location.pathname.includes('/platform/factory-search')) {
      target = {
        label: '工厂',
        url: '/platform/factory-search',
        key: 'factory'
      }
    }

    let targetKey = ['/platform/home', '/platform'].includes(location.pathname)
      ? 'factory'
      : (target.key as string)
    setSearchKey(targetKey)
    setActivityKey(target.key as string)
  }, [location])

  const placeholders = {
    order: '请输入订单编号',
    factory: '请输入工厂名称'
  }

  const searchTypeChange = (activeKey: string) => {
    setSearchKey(activeKey)
  }

  // const companyTypes: Array<OptionType> = [
  //   { label: '有限公司', key: 1 },
  //   { label: '股份有限公司', key: 2 },
  //   { label: '集团公司', key: 3 }
  // ]

  // const companyTypeChange = (val: string | number) => {
  //   setCompanyType(+val)
  // }

  const tabClick = (key: string) => {
    const target = tabs.find(item => item.key === key)
    if (target.url === location.pathname) return
    history.push(target.url)
  }

  const searchFunction = () => {
    updateName(searchWord)
    history.push('/platform/factory-search')
  }

  return (
    <div className={styles.searchContainer}>
      <img src={BG_LOGO} alt="" className={styles.bgLogo} />
      <div className={styles.searchBox}>
        <div className={styles.searchTabsBox}>
          {location.pathname === '/platform/home' && (
            <Tabs
              activeKey={searchKey}
              onChange={searchTypeChange}
              type="card"
              size={'small'}
            >
              {searchTabs.map((item: OptionType) => (
                <TabPane tab={item.label} key={item.key} />
              ))}
            </Tabs>
          )}
        </div>

        <div className={styles.search}>
          <Input
            defaultValue={factoryName}
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            className={styles.input}
            placeholder={placeholders[searchKey]}
          />
          {/* {searchKey === 'factory' && (
            <Select
              className={styles.inputSelect}
              value={companyType}
              onChange={companyTypeChange}
            >
              {companyTypes.map((item: OptionType) => (
                <Option value={item.key} key={item.key}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )} */}
          <Button
            className={styles.btn}
            type={'primary'}
            onClick={searchFunction}
          >
            搜索
          </Button>
        </div>
      </div>

      <div className={styles.tabsBox}>
        <Tabs
          onTabClick={tabClick}
          activeKey={activityKey}
          type={'card'}
          size={'small'}
          tabBarGutter={12}
        >
          {tabs.map((item: OptionType) => (
            <TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default observer(Search)
