import React, { useState } from 'react'
import styles from './index.module.less'
import LOGO from './logo.png'
import { Tabs, Input, Button, Select } from 'antd'

const { TabPane } = Tabs
const { Option } = Select

type OptionType = {
  label: string
  key: number | string
  url?: string
}

const TabBar = () => {
  const tabs: Array<OptionType> = [
    { label: '最新活动', url: '', key: 'activity' },
    { label: '产品分类', url: '', key: 'product' },
    { label: '解决方案', url: '', key: 'resolve' },
    { label: '行业分析', url: '', key: 'analysis' },
    { label: '支持与服务', url: '', key: 'support' },
    { label: '合作与生态', url: '', key: 'cooperate' },
    { label: '了解杰克', url: '', key: 'understand' },
  ]

  const searchTabs: Array<OptionType> = [
    { label: '订单', key: 'order' },
    { label: '面料', key: 'fabric' },
    { label: '服装', key: 'cloth' },
    { label: '工厂', key: 'factory' },
  ]

  const [searchKey, setSearchKey] = useState<string>('order')
  const [companyType, setCompanyType] = useState<number>(1)
  const placeholders = {
    order: '请输入订单编号',
    fabric: '请输入需要的面料',
    cloth: '请输入想要的服装类型',
    work: '请输入公司名',
  }

  const searchTypeChange = (activeKey: string) => {
    setSearchKey(activeKey)
  }

  const companyTypes: Array<OptionType> = [
    { label: '有限公司', key: 1 },
    { label: '股份有限公司', key: 2 },
    { label: '集团公司', key: 3 },
  ]

  const companyTypeChange = (val: string | number) => {
    setCompanyType(+val)
  }

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabBar}>
        <div className={styles.left}>
          <img src={LOGO} alt="杰克" className={styles.logo} />
          <Tabs activeKey={'activity'}>
            {tabs.map((item: OptionType) => (
              <TabPane tab={item.label} key={item.key} />
            ))}
          </Tabs>
        </div>
        <div className={styles.searchBox}>
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
          <div className={styles.search}>
            <Input
              className={styles.input}
              placeholder={placeholders[searchKey]}
            />
            {searchKey === 'factory' && (
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
            )}
            <Button className={styles.btn} type={'primary'}>
              搜索
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabBar
