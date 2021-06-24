import React, { useState, useEffect } from 'react'
import styles from '../index.module.less'
import classNames from 'classnames'
import AreaMap from '../areaMap'
import { Button } from 'antd'
import { useStores } from '@/utils/mobx'

const fileds = new Map()
fileds.set(0, '934')
fileds.set(1, '821')
fileds.set(2, '1965')

const AreaFactorys = () => {
  const { homeStore } = useStores()
  const { getAreaFactorys } = homeStore

  const [areaKey, setAreaKey] = useState(0) // 省份
  const [areaType, setAreaType] = useState('wc') // 工厂类型
  const [data, setData] = useState({})

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
    await getAreaFactorys(params)
  }

  const areaTabs = [
    {
      area: '浙江省',
      count: 1242
    },
    {
      area: '江苏省',
      count: 1242
    },
    {
      area: '广东省',
      count: 1242
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

  const cityList = [
    {
      city: '杭州市',
      count: '346'
    },
    {
      city: '嘉兴市',
      count: '346'
    },
    {
      city: '湖州市',
      count: '346'
    },
    {
      city: '金华市',
      count: '346'
    },
    {
      city: '台州市',
      count: '346'
    },
    {
      city: '舟山市',
      count: '346'
    },
    {
      city: '宁波市',
      count: '346'
    },
    {
      city: '温州市',
      count: '346'
    },
    {
      city: '绍兴市',
      count: '346'
    },
    {
      city: '丽水市',
      count: '346'
    },
    {
      city: '衢州市',
      count: '346'
    }
  ]

  const areaChange = key => {
    setAreaKey(key)
  }

  const areaTypeChange = key => {
    setAreaType(key)
  }

  return (
    <div>
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
                <div>{`（${item.count}）`}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.areaContent}>
        <div className={styles.areaMap}>
          <AreaMap />
          <div className={styles.areaBtns}>
            {areaBtns.map(item => {
              return (
                <Button
                  key={item.value}
                  onClick={() => areaTypeChange(item.value)}
                  type={areaType === item.value ? 'primary' : 'default'}
                  ghost={areaType === item.value}
                  className={styles.areaBtn}
                >
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={styles.areaList}>
          {cityList.map((item, idx) => {
            return (
              <div key={idx} className={styles.areaItem}>
                <div className={styles.areaCity}>{item.city}</div>
                <div className={styles.areaCountBox}>
                  <span className={styles.areaCount}>{item.count}</span>
                  <span>家</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AreaFactorys
