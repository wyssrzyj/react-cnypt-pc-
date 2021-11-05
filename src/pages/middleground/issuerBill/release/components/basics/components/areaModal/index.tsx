import React, { useState } from 'react'
import { Modal, Button, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isFunction } from 'lodash'
import { toJS } from 'mobx'
import { useStores, observer } from '@/utils/mobx'
import classNames from 'classnames'
import styles from './index.module.less'
import { isArray } from '_@antv_util@2.0.17@@antv/util'

const AreaModal = props => {
  const { commonStore } = useStores()
  const { allArea } = commonStore
  const wholeCountry = [
    {
      label: '全国',
      value: '0',
      children: [
        {
          label: '全国',
          value: '0',
          children: []
        }
      ]
    }
  ]
  const newAllArea = wholeCountry.concat(toJS(allArea)) //字典数据

  const { visible, handleOk, handleCancel, selectedCity = [] } = props
  const [cityTree, setCityTree] = useState<any>([...newAllArea[0].children])
  const [activeCity, setActiveCity] = useState<any>([...selectedCity])
  const [activeProvince, setActiveProvince] = useState<string>(
    newAllArea[0].value
  )

  const selectProvince = id => {
    setActiveProvince(id)
    const currentCity = newAllArea.find(tree => tree.value === id) || {}
    if (id !== '0') {
      // 父节点数据 添加到子项中
      let parent = [
        { label: currentCity['label'], value: currentCity['value'] }
      ].concat(currentCity['children'])
      setCityTree(parent)
    } else {
      setCityTree(currentCity['children'])
    }
  }

  const selectCity = (params, city) => {
    // 存点击的数据的
    if (params.id === city[0].value) {
      //  点击父级让子级消失
      let fiji = activeCity.filter(item => item.pid === city[0].value) //获取数组中所有当前父节点的子项数据
      //删除数组中他俩的数据
      fiji.forEach(item => {
        const index = activeCity.findIndex(city => city.id === item.id) //
        if (index !== -1) {
          activeCity.splice(index, 1)
        }
      })
    }
    // 子级问题
    let arr = activeCity.findIndex(item => item.id === city[0].value)
    let arr1 = activeCity.findIndex(item => item.id === '0') //删除全国
    if (arr !== -1) {
      activeCity.splice(arr, 1)
    }
    if (arr1 !== -1) {
      activeCity.splice(arr1, 1)
    }

    // 添加
    const index = activeCity.findIndex(city => city.id === params.id) //
    if (index < 0) {
      activeCity.push(params) //  如果是-1就添加
    } else {
      activeCity.splice(index, 1)
    }
    setActiveCity([...activeCity])
    // 全国
    if (params.id === '0') {
      setActiveCity(activeCity.filter(item => item.id === params.id)) //只留全国
    }
  }

  const closeTag = id => {
    const index = activeCity.findIndex(city => city.id === id)
    activeCity.splice(index, 1)
    setActiveCity([...activeCity])
  }

  const emptyCity = () => {
    setActiveCity([])
    // isFunction(handleOk) && handleOk([])
  }
  const confirmFn = () => {
    isFunction(handleOk) && handleOk(activeCity)
  }

  return (
    <Modal
      title="请选择地区"
      visible={visible}
      onOk={confirmFn}
      onCancel={handleCancel}
      width={660}
    >
      <div className={styles.hasChosen}>
        <div>
          <span>已选择：</span>
          {activeCity.map(city => (
            <Tag
              key={city.id}
              className={styles.selectedTag}
              closable
              onClose={() => closeTag(city.id)}
            >
              {city.name}
            </Tag>
          ))}
        </div>
        <Button icon={<DeleteOutlined />} onClick={emptyCity}>
          清空
        </Button>
      </div>
      <div className={styles.areaList}>
        <div className={styles.areaLeft}>
          {/* 省 */}
          {newAllArea.map(item => (
            <div
              key={item.value}
              className={classNames(
                styles.provinces,
                item.value === activeProvince ? styles.active : null
              )}
              onClick={() => selectProvince(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.areaRight}>
          {isArray(cityTree) &&
            cityTree.map(city => (
              <span
                key={city.value}
                className={classNames(
                  styles.cityBox,
                  activeCity.findIndex(val => val.id === city.value) > -1
                    ? styles.cityActive
                    : null
                )}
                onClick={() =>
                  selectCity(
                    { id: city.value, name: city.label, pid: city.pid },
                    cityTree
                  )
                }
              >
                {city.label}
              </span>
            ))}
        </div>
      </div>
    </Modal>
  )
}

export default observer(AreaModal)
