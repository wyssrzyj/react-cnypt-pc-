import React, { useEffect, useState } from 'react'
import { Icon } from '@/components'
import styles from './searchBar.module.less'
import { Select, TreeSelect, Input } from 'antd'
import { useStores, observer, toJS } from '@/utils/mobx'
import { cloneDeep, isNil } from 'lodash'
import { setUpTimeMap, updateTimeMap } from '@/components/filterList'
import moment from 'moment'
import { useDebounceValue } from '@/utils/tool'
import Factorys from './factorys'
import { useHistory } from 'react-router'

const filterNull = obj => {
  const keys = Reflect.ownKeys(obj)
  keys.forEach(item => {
    const flag = [undefined, null].includes(obj[item])
    if (flag) {
      delete obj[item]
    }
  })
  return obj
}

const { Option } = Select

const SearchBar = props => {
  const { map } = props
  const { commonStore, factoryStore } = useStores()
  const { allArea, dictionary } = commonStore
  const {
    productCategory,
    getMapCityInfo,
    getMapFactorys,
    mapSearchCityValue,
    setMapMove,
    mapSearchFactorys
  } = factoryStore
  const { prodType = [], factoryEffectiveLocation = [] } = toJS(dictionary)

  const history = useHistory()

  const [areaData, setAreaData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [factoryName, setFactoryName] = useState()
  // 默认杭州
  const [params, setParams] = useState<any>({
    cityIds: ['935'],
    pageNum: 1,
    pageSize: 9999
  })

  const debounceFactoryName = useDebounceValue(factoryName, 200)

  useEffect(() => {
    if (!mapSearchCityValue) return
    const newParams = cloneDeep(params)
    newParams.pageNum = 1
    newParams.pageSize = 9999
    newParams.cityIds = [mapSearchCityValue]

    setParams(newParams)
  }, [mapSearchCityValue])

  // 展示数据处理 --------------------------------------
  useEffect(() => {
    ;(async () => {
      let target = await productCategory()
      target = dealTypeData(target)
      setTypeData(target)
    })()
  }, [])

  useEffect(() => {
    const newTreeData = cloneDeep(toJS(allArea))
    const target = dealTreeData(newTreeData)
    setAreaData(target)
  }, [allArea])

  const dealTypeData = data => {
    data.forEach(item => {
      item.label = item.name
      item.value = item.id

      if (Array.isArray(item.children) && item.children.length) {
        dealTypeData(item.children)
      }
    })
    return data
  }

  const dealTreeData = data => {
    if (Array.isArray(data) && data.length) {
      data.forEach(item => {
        if (item.level === 2 && !item.countyCity) {
          item.children = []
        }

        if (item.level === 1) {
          // item.disabled = true
        }
        if (Array.isArray(item.children) && item.children.length) {
          dealTreeData(item.children)
        }
      })
    }
    return data
  }
  // 搜索内容处理 ----------------------------------
  const areaChange = (value, _label, _extra) => {
    const newParams = cloneDeep(params)
    if (value) {
      newParams.cityIds = [value]
      setMapMove(true)
    } else {
      delete newParams.cityIds
    }

    setParams(filterNull(newParams))
  }

  const typeChange = (_value, _label, extra) => {
    const newParams = cloneDeep(params)
    const { triggerNode = {} } = extra
    if (triggerNode) {
      const { props = {} } = triggerNode
      if (props.level === 1) {
        newParams.mainCategoryParentId = props.id
        delete newParams.mainCategoryChildId
      }
      if (props.level === 2) {
        newParams.mainCategoryChildId = props.id
        newParams.mainCategoryParentId = props.parentId
      }
    } else {
      delete newParams.mainCategoryParentId
      delete newParams.mainCategoryChildId
    }
    setParams(filterNull(newParams))
  }

  const searchChange = event => {
    const { value } = event.target
    setFactoryName(value || undefined)
  }

  const valueChange = (value, type) => {
    const newParams = cloneDeep(params)
    // 成立时间处理
    if (type === 'createTime') {
      //  factoryCreateTimeEnd factoryCreateTimeStart
      let start, end
      if (!value) {
        newParams.factoryCreateTimeStart = null
        newParams.factoryCreateTimeEnd = null
      }
      if (value) {
        const newValue = value.split(',')
        if (newValue.length > 1) {
          start = moment().add(-Number(newValue[1]), 'y').format('x')
          end = moment().add(-Number(newValue[0]), 'y').format('x')
        } else {
          start = null
          end = moment().add(-Number(newValue[0]), 'y').format('x')
        }
        newParams.factoryCreateTimeStart = start
        newParams.factoryCreateTimeEnd = end
      }
    }
    // 更新时间处理
    if (type === 'updateTime') {
      let start, end
      if (!isNil(value)) {
        start = moment().subtract('days', value).format('x')
        end = moment().format('x')
      } else {
        start = null
        end = null
      }
      newParams.updateTimeStart = start
      newParams.updateTimeEnd = end
    }

    if (!['createTime', 'updateTime'].includes(type)) {
      newParams[type] = value
    }
    setParams(filterNull(newParams))
  }

  useEffect(() => {
    const newParams = cloneDeep(params)
    const oldFactoryName = newParams.factoryName
    if (debounceFactoryName !== oldFactoryName) {
      newParams.factoryName = debounceFactoryName
      setParams(filterNull(newParams))
    }
  }, [debounceFactoryName, params])

  // 参数更改以后 重新获取工厂列表数据
  useEffect(() => {
    const { cityIds } = params
    ;(async () => {
      if (Array.isArray(cityIds) && cityIds.length) {
        const cityId = cityIds[0]
        const res = await getMapCityInfo(cityId)
        res && (await getMapFactorys(params))
      }
    })()
  }, [params])

  const toHome = () => {
    history.push('/')
  }

  return (
    <section className={styles.searchBar}>
      <div className={styles.searchBarLogo} onClick={toHome}>
        <Icon type={'jack-dtzc'} className={styles.searchIcon}></Icon>
        <div>首页</div>
      </div>

      <div className={styles.searchContent}>
        <TreeSelect
          defaultValue={'935'}
          className={styles.searchBarTree}
          dropdownClassName={styles.searchBarTreeDrop}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="所在地区"
          onChange={areaChange}
          treeData={areaData}
          value={params.cityIds[0]}
        />

        <TreeSelect
          className={styles.searchBarTree}
          dropdownClassName={styles.searchBarTreeDrop}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="产品品类"
          allowClear
          onChange={typeChange}
          treeData={typeData}
          key={'code'}
        />

        <Select
          allowClear
          placeholder={'接单类型'}
          className={styles.prodTypeSelect}
          onChange={value => valueChange(value, 'prodType')}
        >
          {Array.isArray(prodType) &&
            prodType.map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )
            })}
        </Select>

        <Input
          className={styles.searchInput}
          placeholder={'关键字（工厂名称）'}
          onChange={searchChange}
        ></Input>
      </div>

      <div className={styles.searchBarRight}>
        <Select
          allowClear
          placeholder="成立时间"
          className={styles.moreSelect}
          onChange={value => valueChange(value, 'createTime')}
        >
          {setUpTimeMap.map(item => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          allowClear
          placeholder="有效车位"
          className={styles.moreSelect}
          onChange={value => valueChange(value, 'effectiveLocation')}
        >
          {factoryEffectiveLocation.map(item => (
            <Option key={item.id} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          allowClear
          onChange={value => valueChange(value, 'updateTime')}
          placeholder="更新时间"
          className={styles.updateSelect}
        >
          {updateTimeMap.map(item => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>

      <Factorys map={map} list={mapSearchFactorys}></Factorys>
    </section>
  )
}

export default observer(SearchBar)
