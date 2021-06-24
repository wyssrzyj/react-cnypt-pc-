import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import styles from '../index.module.less'
import { Input, Button, Cascader } from 'antd'
import SEARCH from '../img/sousuo.png'
import FRATORY from '../img/factory.png'
import { useHistory } from 'react-router'
import { cloneDeep } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { toJS } from 'mobx'

const Intelligence = () => {
  const history = useHistory()
  const { factoryStore, commonStore } = useStores()
  const { productCategoryList, productCategory } = factoryStore
  const { allArea } = commonStore

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
  }, [])

  const [searchData, setSerachData] = useState({})

  const inputs = [
    {
      icon: <Icon type={'jack-ddsl'} className={styles.inputIcon} />,
      field: 'order',
      placeholder: '订单数量'
    },
    {
      icon: <Icon type={'jack-cplb'} className={styles.inputIcon} />,
      field: 'mainCategoryParentId', // mainCategoryChildId
      placeholder: '产品类别'
    },
    {
      icon: <Icon type={'jack-quyu'} className={styles.inputIcon} />,
      field: 'cityIds',
      placeholder: '区域'
    }
  ]

  const valueChange = (event, field) => {
    const newData = cloneDeep(searchData)
    const { value } = event.target
    newData[field] = value
    setSerachData(newData)
  }

  const toSearch = () => {
    history.push({
      pathname: '/platform/factory-search',
      state: searchData
    })
  }

  const typeChange = value => {
    const newData = cloneDeep(searchData)
    newData['mainCategoryParentId'] = value[0]
    newData['mainCategoryChildId'] = value[1]
    setSerachData(newData)
  }

  const areaChange = value => {
    const newData = cloneDeep(searchData)
    newData['cityIds'] = value
    setSerachData(newData)
  }

  return (
    <div className={styles.intelligenceInner}>
      <div className={styles.intelligenceLeft}>
        <img src={SEARCH} alt="" className={styles.searchImg} />
        <div className={styles.searchTitle}>智能搜索工厂</div>
        {inputs.map((item, idx) => {
          if (idx === 1) {
            const fieldNames = {
              label: 'name',
              value: 'id',
              children: 'childList'
            }
            return (
              <div className={styles.customCascader} key={idx}>
                {item.icon}
                <Cascader
                  options={productCategoryList}
                  onChange={typeChange}
                  placeholder="产品类别"
                  fieldNames={fieldNames}
                />
              </div>
            )
          }

          if (idx === 2) {
            const fieldNames = {
              label: 'name',
              value: 'id',
              children: 'children'
            }
            return (
              <div className={styles.customCascader} key={idx}>
                {item.icon}
                <Cascader
                  options={allArea}
                  onChange={areaChange}
                  fieldNames={fieldNames}
                  placeholder="区域"
                />
              </div>
            )
          }
          return (
            <Input
              prefix={item.icon}
              key={idx}
              placeholder={item.placeholder}
              className={styles.input}
              onChange={event => valueChange(event, item.field)}
            />
          )
        })}
        <Button className={styles.searchBtn} onClick={toSearch}>
          搜索
        </Button>
      </div>
      <div className={styles.intelligenceRight}>
        <img src={FRATORY} className={styles.intellImg} alt="" />
      </div>
    </div>
  )
}

export default React.memo(observer(Intelligence))
