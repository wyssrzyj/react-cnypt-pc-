import React, { useState } from 'react'
import { Input, Divider } from 'antd'
import { isEmpty } from 'lodash'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'
import { Icon } from '@/components' //路径
import { Menu, Dropdown, Space } from 'antd'
import classNames from 'classnames'
import moment from 'moment'
const { Search } = Input

const SimpleSearchTop = props => {
  const {
    config = {},
    onFilterChange,
    field = 'name',
    NumberCooperation,
    searchData
  } = props
  const data = [
    {
      icon: 'jack-map',
      name: '公司所在地址',
      content: config.address,
      company: '',
      style: ''
    },
    {
      icon: 'jack-clock',
      name: '成立时间',
      content: moment(config.establishedTime).format('YYYY-MM-DD'),
      company: '',
      style: ''
    },
    {
      icon: 'jack-trust',
      name: '已合作数量',
      content: NumberCooperation.cooperationNum,
      company: '次',
      style: 'texColor'
    },
    {
      icon: 'jack-tool',
      name: '已确认商品数量',
      content: NumberCooperation.confirmCategoryNum,
      company: '件',
      style: 'texColor'
    },
    {
      icon: 'jack-image-text',
      name: '累计发布订单数',
      content: NumberCooperation.cumulativeReleaseOrderNum,
      company: '单',
      style: 'texColor'
    }
  ]

  const currentImg = !isEmpty(config.logoImage)
    ? config.logoImage[0].thumbUrl
    : 'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1635389590602-4logo_moren%402x.png'
  const { searchOrderStore } = useStores()
  const { updateOrderName, orderName } = searchOrderStore
  const [searchWord, setSearchWord] = useState<string>(orderName)
  const onSearch = value => {
    searchData(value)
    updateOrderName(value)
    onFilterChange({
      [field]: value
    })
  }

  const menu = (
    <Menu>
      <div className={styles.hover}>
        {data.map(item => (
          <div className={styles.contents} key={item.name}>
            <div className={styles.address}>
              <Icon type={item.icon} className={classNames(styles.table)} />
              {item.name}
            </div>
            <span>
              <span className={item.style !== '' ? styles.texColor : ''}>
                {item.content}&nbsp;
              </span>
              {item.company}
            </span>
          </div>
        ))}
      </div>
    </Menu>
  )

  return (
    <div className={styles.simpleSearch}>
      <div className={styles.content}>
        <div className={styles.top}>
          <img src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/uchartLogo.png" />
          {!isEmpty(config) && (
            <div className={styles.topRight}>
              <Divider className={styles.verticalLine} type="vertical" />
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <div>
                      <div className={styles.company}>
                        <div className={styles.imgBor}>
                          <img className={styles.image} src={currentImg} />
                        </div>

                        <div className={styles.real}>
                          <div>
                            <span className={styles.title}>
                              {config.enterpriseName}
                              <Icon
                                type="jack-down"
                                className={styles.previous}
                              />
                            </span>
                          </div>
                          <div className={styles.realName}>
                            {config.certificateApprovalStatus === '1' ? (
                              <div className={styles.icon}>
                                <Icon
                                  type="jack-shiming_2"
                                  className={styles.previous}
                                />
                                实名
                              </div>
                            ) : null}
                            {/* <div className={styles.icon}>
                              <Icon
                                type="jack-ycsq_2"
                                className={styles.previous}
                              />
                              验厂
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                </Space>
              </Space>
            </div>
          )}
        </div>
        <Search
          style={{ width: 500 }}
          placeholder={`请输入订单名称`}
          allowClear
          enterButton="搜索"
          size="large"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}

export default SimpleSearchTop
