import React, { useState } from 'react'
import { Radio } from 'antd'
import HeaderLine from '../headerLine'
import styles from './index.module.less'

const imageType = [
  {
    value: 'outside',
    label: '厂房外景'
  },
  {
    value: 'workshop',
    label: '车间照片'
  }
]
const EnterpriseImage = () => {
  const [type, setType] = useState('outside')
  return (
    <div className={styles.enterpriseImage}>
      <HeaderLine chinese="企业照片" english="CORPORATE PHOTOS" />
      <Radio.Group
        value={type}
        onChange={e => setType(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      >
        {imageType.map(item => (
          <Radio.Button key={item.value} value={item.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
}

export default EnterpriseImage
