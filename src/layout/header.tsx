import React, { useState } from 'react'
import styles from './index.module.less'
import { Select } from 'antd'
import { Link } from 'react-router-dom'

const { Option } = Select

type HeaderProps = {}
type ProvinceOptions = Array<{ label: string; id: number }>

const Header = (props: HeaderProps) => {
  const tips = '全国有XXX家工厂加盟服务，浙江XXX家工厂为您服务'
  console.log(props)

  const options: ProvinceOptions = [
    { label: '浙江省', id: 1 },
    { label: '福建省', id: 2 },
    { label: '江西省', id: 3 },
    { label: '安徽省', id: 4 },
    { label: '湖南省', id: 5 },
    { label: '湖北省', id: 6 }
  ]

  const [province, setProvince] = useState<number>(1)

  const provinceSelect = (value: number) => {
    setProvince(value)
  }

  const rightList = [
    { label: '会员中心', url: '' },
    { label: '我的订单信息', url: '' },
    { label: '请登录', url: '/login' },
    { label: '免费注册', url: '/register' }
  ]

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Select
          className={styles.headerSelect}
          size={'small'}
          onChange={value => provinceSelect(value)}
          value={province}
        >
          {options.map((item, idx: number) => {
            return (
              <Option value={item.id} key={idx}>
                {item.label}
              </Option>
            )
          })}
        </Select>
        <div className={styles.tips}>{tips}</div>
      </div>
      <div className={styles.center} />
      <div>
        {rightList.map((item, idx) => {
          return (
            <Link to={item.url} key={idx} className={styles.link}>
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Header
