import React, { useState, useEffect, useRef } from 'react'
import MapTemp from './areaComponent2'
import styles from './areaSearch.module.less'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { Button } from 'antd'
import { useStores } from '@/utils/mobx'
import { cloneDeep } from 'lodash'

const icons = new Map()
icons.set('310000', 'jack-shanghai')
icons.set('330000', 'jack-zhejiang')
icons.set('320000', 'jack-jiangsu')
icons.set('340000', 'jack-anhui')
icons.set('130000', 'jack-zhongguo_-hebeisheng-ji')
icons.set('370000', 'jack-zhongguo_-shandongsheng-lu')
icons.set('210000', 'jack-zhongguo_-liaoningsheng-liao')
icons.set('440000', 'jack-zhongguo_-guangdongsheng-yue')
icons.set('110000', 'jack-beijing')

const colors = new Map()
colors.set('310000', '#EC808D')
colors.set('330000', '#70B603')
colors.set('320000', '#FACD91')
colors.set('340000', '#F59A23')

const ids = new Map()
ids.set(0, '802,821,934,1047')
ids.set(1, '1965')
ids.set(2, '2,20,38,467,1376')

const centers = new Map()
centers.set(0, [118.521674, 31.464436])
centers.set(1, [113.354725, 22.81488])
centers.set(2, [119.778298, 39.321055])

const zooms = new Map()
zooms.set(0, 5.93)
zooms.set(1, 5.94)
zooms.set(2, 5.48)

const areaMap = new Map()
areaMap.set(0, 'cjDelta')
areaMap.set(1, 'zjDelta')
areaMap.set(2, 'bhRim')

const initKeys = [
  { label: '长三角', count: '0' },
  { label: '珠三角', count: '0' },
  { label: '环渤海', count: '0' }
]

const AreaSearch = () => {
  const mapRef: any = useRef()
  const [activityKey, setActivetyKey] = useState<number>(0)

  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [keys, setKeys] = useState<Array<any>>(initKeys)
  const [allFactorys, setAllFactorys] = useState<Array<any>>([])

  const { factoryPageStore } = useStores()
  const { getFactorys, getAreaConut, getFactorysCount } = factoryPageStore

  useEffect(() => {
    ;(async () => {
      await getData(0)
      const data = (await getAreaConut()) || {}
      const k = cloneDeep(keys)
      k.forEach((item, idx) => {
        item.count = data[areaMap.get(idx)]
      })
      setKeys(k)
      const total = await getFactorysCount()
      setAllFactorys(total)
    })()
  }, [])

  const getData = async key => {
    const params = {
      provinceIds: ids.get(key)
    }
    const data = (await getFactorys(params)) || []
    await setDataSource(data)
  }

  const tabChange = async (key: number) => {
    mapRef.current.map.removeAllLayer()
    await getData(key)
    setActivetyKey(key)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchTitle}>
        <div className={styles.searchTitleL}>
          <div className={styles.searchTitleText}>按地区找工厂</div>
          <Button type={'primary'}>工厂入驻</Button>
        </div>
        <Button>{'更多 >'}</Button>
      </div>
      <div className={styles.searchContent}>
        <div className={styles.leftContent}>
          <div className={styles.areaKeys}>
            {keys &&
              keys.length &&
              keys.map((item, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    styles.areaTab,
                    activityKey === idx && styles.areaActiveTab
                  )}
                  onClick={() => tabChange(idx)}
                >
                  <span className={styles.areaTabL}>{item.label}</span>
                  <span className={styles.areaTabC}>({item.count}家工厂)</span>
                </div>
              ))}
          </div>
          <div>
            {dataSource &&
              dataSource.length &&
              dataSource.map((item, idx) => {
                if (!item) return
                item.children = item.children || []
                const childs = item.children.slice(0, 7) || []

                item.children &&
                  item.children.length > 7 &&
                  childs.push({
                    cityName: '更多'
                  })

                return (
                  <div className={styles.areaChunk} key={idx}>
                    <div className={styles.areaChunkL}>
                      <Icon
                        type={icons.get(item.provinceAdCode)}
                        className={styles.areaIcon}
                      />
                      <span
                        style={{ color: colors.get(item.provinceAdCode) }}
                        className={styles.province}
                      >
                        {item.provinceName}
                      </span>
                      <span className={styles.count}>
                        ({item.statFactory}家工厂)
                      </span>
                    </div>
                    <div className={styles.areaChunkR}>
                      {childs &&
                        childs.length &&
                        childs.map((i, t) => {
                          if (t < 7) {
                            return (
                              <span className={styles.city} key={t}>
                                {i.cityName}
                                &nbsp; ({i.statFactory || 0})
                              </span>
                            )
                          }
                          return (
                            <span className={styles.city} key={t}>
                              {i.cityName}
                            </span>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className={styles.rightContent}>
          <MapTemp
            zoom={zooms.get(activityKey)}
            center={centers.get(activityKey)}
            dataSource={dataSource}
            ref={mapRef}
          ></MapTemp>
        </div>
      </div>
      <div className={styles.allFactorys}>
        {allFactorys &&
          allFactorys.length &&
          allFactorys.map((item, idx) => {
            return (
              <div key={idx}>
                {item.cityName}
                &nbsp;
                {item.statFactory || 0}
                &nbsp;&nbsp;
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AreaSearch
