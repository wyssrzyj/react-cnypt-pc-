import React, { useEffect, useState } from 'react'
import { Icon } from '@/components'
import styles from './searchBar.module.less'
import { Select, TreeSelect } from 'antd'
import { useStores, observer, toJS } from '@/utils/mobx'
import { cloneDeep } from 'lodash'

const SearchBar = () => {
  const { commonStore, factoryStore } = useStores()
  const { allArea } = commonStore
  const { productCategory } = factoryStore

  const [areaData, setAreaData] = useState([])
  const [typeData, setTypeData] = useState([])

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
        if (item.level === 2) {
          item.children = []
        }
        if (item.level === 1) {
          item.disabled = true
        }
        if (Array.isArray(item.children) && item.children.length) {
          dealTreeData(item.children)
        }
      })
    }
    return data
  }

  const areaChange = value => {
    console.log('🚀 ~~~~~~~~~', value)
  }

  const typeChange = (value, _label, extra) => {
    const { triggerNode } = extra
    const { props } = triggerNode
    console.log('🚀 ~~~~~~~~~', value)
    console.log('🚀 ~~~~~~~~~', props)
  }

  return (
    <section className={styles.searchBar}>
      <div className={styles.searchBarLogo}>
        <Icon type={'jack-dtzc'} className={styles.searchIcon}></Icon>
        <div>地图找厂</div>
      </div>

      <div className={styles.searchContent}>
        <TreeSelect
          className={styles.searchBarTree}
          showSearch
          dropdownClassName={styles.searchBarTreeDrop}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="所在地区"
          allowClear
          onChange={areaChange}
          treeData={areaData}
        />

        <TreeSelect
          className={styles.searchBarTree}
          showSearch
          dropdownClassName={styles.searchBarTreeDrop}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="产品品类"
          allowClear
          onChange={typeChange}
          treeData={typeData}
        />
      </div>
    </section>
  )
}

export default observer(SearchBar)
