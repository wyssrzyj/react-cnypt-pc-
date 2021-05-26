import React from 'react'
import { JackCard } from '@/components'
import styles from './index.module.less'

const sampleList = [1, 1, 1, 1, 1, 1, 1, 1]
const FactorySample = () => {
  return (
    <JackCard header="工厂样品展示">
      <div className={styles.factorySample}>
        {sampleList.map((item, index) => (
          <div className={styles.sampleBox} key={index}>
            <img
              className={styles.sampleImg}
              src={require('@/static/images/u1848.png')}
              alt=""
            />
            <div className={styles.sampleDes}>
              {item}浅色松紧腰七分牛仔裤女士2020年新款夏季薄款哈伦裤子
            </div>
          </div>
        ))}
      </div>
    </JackCard>
  )
}

export default FactorySample
