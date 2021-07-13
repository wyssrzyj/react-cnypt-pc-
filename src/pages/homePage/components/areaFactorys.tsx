import React, { useState, useEffect } from 'react'
import styles from './areaFactorys.module.less'
import classNames from 'classnames'
import AreaMap from '../areaMap'
import { Button } from 'antd'
import { useStores } from '@/utils/mobx'

const fileds = new Map()
fileds.set(0, '934')
fileds.set(1, '821')
fileds.set(2, '1965')

const adcodes = new Map()
adcodes.set(0, 330000)
adcodes.set(1, 320000)
adcodes.set(2, 440000)

const areaTabs = [
  {
    area: '浙江省',
    filed: 'zj'
  },
  {
    area: '江苏省',
    filed: 'zj'
  },
  {
    area: '广东省',
    filed: 'gd'
  }
]

const areaBtns = [
  {
    label: '针织类',
    value: 'wc'
  },
  {
    label: '梭织类',
    value: 'kc'
  },
  {
    label: '其他',
    value: 'other'
  }
]

const AreaFactorys = () => {
  const { homeStore } = useStores()
  const { getAreaFactorys, getProvinceCounts } = homeStore

  const [areaKey, setAreaKey] = useState(0) // 省份
  const [areaType, setAreaType] = useState('wc') // 工厂类型
  const [counts, setCounts] = useState({}) // 省级统计数据
  const [provinceData, setProvinceData] = useState([]) // 市级数据
  const [mapInit, setMapInit] = useState(false)

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [areaKey, areaType])

  const getData = async () => {
    const params = {
      provinceIds: fileds.get(+areaKey),
      categoryCode: areaType
    }
    const res = await getAreaFactorys(params)
    res.children = res.children || []
    const province =
      res.children.reduce((prev, item) => {
        const target = {
          name: item.cityName,
          code: item.cityAdCode,
          value: item.statFactory
        }
        prev.push(target)
        return prev
      }, []) || []
    setProvinceData(province)
    setMapInit(true)
  }

  const areaChange = key => {
    setAreaKey(key)
  }

  const areaTypeChange = key => {
    setAreaType(key)
  }

  useEffect(() => {
    ;(async () => {
      const c = (await getProvinceCounts()) || {}
      setCounts(c)
    })()
  }, [])

  return (
    <>
      <div className={styles.areaHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.areaTitle}>
            <span className={styles.areaFactory}>地区工厂</span>
            <span className={styles.areaFactoryEn}>REGIONAL FACTORIES</span>
          </div>
        </div>
        <div className={styles.areaTabs}>
          {areaTabs.map((item, idx) => {
            return (
              <div
                className={classNames(
                  styles.areaTab,
                  areaKey === idx ? styles.activeAreaTab : null
                )}
                key={idx}
                onClick={() => areaChange(idx)}
              >
                <div>{item.area}</div>
                <div>{`（${counts[item.filed] || 0}）`}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.areaContent}>
        <div className={styles.areaMapBox}>
          {mapInit ? (
            <AreaMap data={provinceData} code={adcodes.get(areaKey)} />
          ) : null}

          <div className={styles.areaBtns}>
            {areaBtns.map(item => {
              return (
                <Button
                  key={item.value}
                  onClick={() => areaTypeChange(item.value)}
                  type={areaType === item.value ? 'primary' : 'default'}
                  ghost={areaType !== item.value}
                  className={styles.areaBtn}
                >
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={styles.areaList}>
          {provinceData.map((item, idx) => {
            return (
              <div key={idx} className={styles.areaItem}>
                <div className={styles.areaCity}>{item.name}</div>
                <div className={styles.areaCountBox}>
                  <span className={styles.areaCount}>{item.value}</span>
                  <span>家</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AreaFactorys
