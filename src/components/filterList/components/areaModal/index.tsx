import React, { useState, useEffect } from 'react'
import { Modal, Button, Tag, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isFunction } from 'lodash'
import axios from '@/utils/axios'
import classNames from 'classnames'
import styles from './index.module.less'

const AreaModal = props => {
  const { visible, handleOk, handleCancel, selectedCity = [] } = props
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ selectedCity', selectedCity)
  const [areaTree, setAreaTree] = useState<any>([])
  const [cityTree, setCityTree] = useState<any>([])
  const [activeCity, setActiveCity] = useState<any>([...selectedCity])
  const [activeProvince, setActiveProvince] = useState<string>('')
  const getAllArea = async () => {
    const response = await axios.get('/api/factory/district/list-city-tree')
    const { success, data } = response
    if (success) {
      setAreaTree([...data])
      setActiveProvince(data[0].id)
      setCityTree([...data[0].childCityList])
    }
  }

  const selectProvince = id => {
    setActiveProvince(id)
    const currentCity = areaTree.find(tree => tree.id === id) || {}
    setCityTree([...currentCity.childCityList])
  }

  const selectCity = params => {
    if (activeCity.length >= 8) {
      message.error('最多可选8个地区')
    } else {
      const index = activeCity.findIndex(city => city.id === params.id)
      if (index < 0) {
        activeCity.push(params)
      } else {
        activeCity.splice(index, 1)
      }
      setActiveCity([...activeCity])
    }
  }

  const closeTag = id => {
    const index = activeCity.findIndex(city => city.id === id)
    activeCity.splice(index, 1)
    setActiveCity([...activeCity])
  }

  const emptyCity = () => {
    setActiveCity([])
    isFunction(handleOk) && handleOk([])
  }
  const confirmFn = () => {
    isFunction(handleOk) && handleOk(activeCity)
  }

  useEffect(() => {
    getAllArea()
  }, [])

  return (
    <Modal
      title="请选择地区（最多选择8个）"
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
          {areaTree.map(item => (
            <div
              key={item.id}
              className={classNames(
                styles.provinces,
                item.id === activeProvince ? styles.active : null
              )}
              onClick={() => selectProvince(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={styles.areaRight}>
          {cityTree.map(city => (
            <span
              key={city.id}
              className={classNames(
                styles.cityBox,
                activeCity.findIndex(val => val.id === city.id) > -1
                  ? styles.cityActive
                  : null
              )}
              onClick={() => selectCity({ id: city.id, name: city.name })}
            >
              {city.name}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AreaModal
