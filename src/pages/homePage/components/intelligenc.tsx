import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import styles from './intelligenc.module.less'
import { Button, Cascader } from 'antd'
import SEARCH from '../img/sousuo.png'
// import FRATORY from '../img/factory.png'
import { useHistory } from 'react-router'
import { cloneDeep } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { toJS } from 'mobx'

const FRATORY =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210629/9f1f625f42ea46108ff651f2ad78a9ac.jpg?x-oss-process=image/quality,q_90'

const Intelligence = () => {
  const history = useHistory()
  const { factoryStore, commonStore } = useStores()
  const { productCategoryList, productCategory, init } = factoryStore
  const { allArea } = commonStore

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
  }, [])

  const [searchData, setSerachData] = useState({})

  const toSearch = () => {
    init()
    history.push({
      pathname: '/factory-search',
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

  const inputs = [
    {
      icon: <Icon type={'jack-cplb'} className={styles.inputIcon} />,
      field: 'mainCategoryParentId', // mainCategoryChildId
      options: productCategoryList,
      onChange: typeChange,
      placeholder: '产品类别'
    },
    {
      icon: <Icon type={'jack-quyu'} className={styles.inputIcon} />,
      field: 'cityIds',
      options: toJS(allArea),
      onChange: areaChange,
      placeholder: '区域'
    }
  ]

  return (
    <div className={styles.intelligenceInner}>
      <div className={styles.intelligenceLeft}>
        <img src={SEARCH} alt="" className={styles.searchImg} />
        <div className={styles.searchTitle}>智能搜索工厂</div>
        {inputs.map((item, idx) => {
          if (idx === 0) {
            const fieldNames = {
              label: 'name',
              value: 'id',
              children: 'children'
            }
            return (
              <div className={styles.customCascader} key={idx}>
                {item.icon}
                <Cascader
                  options={item.options}
                  onChange={item.onChange}
                  fieldNames={fieldNames}
                  placeholder={'产品类别'}
                  popupClassName={'cascaderPopup'}
                />
              </div>
            )
          }
          if (idx === 1) {
            return (
              <div className={styles.customCascader} key={idx}>
                {item.icon}
                <Cascader
                  options={item.options}
                  onChange={item.onChange}
                  placeholder={'区域'}
                  popupClassName={'cascaderPopup'}
                />
              </div>
            )
          }
          return null
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
