import React, { useState } from 'react'
import { Modal, Button, Tag, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isFunction } from 'lodash'
import { toJS } from 'mobx'
import { useStores, observer } from '@/utils/mobx'
import classNames from 'classnames'
import styles from './index.module.less'

const AreaModal = props => {
  const { commonStore } = useStores()
  const { allArea } = commonStore
  const newAllArea = toJS(allArea)
  const { visible, handleOk, handleCancel, selectedCity = [] } = props
  const [cityTree, setCityTree] = useState<any>([...newAllArea[0].children])
  const [activeCity, setActiveCity] = useState<any>([...selectedCity])
  const [activeProvince, setActiveProvince] = useState<string>(newAllArea[0].value)

  const selectProvince = id => {
    setActiveProvince(id)
    const currentCity = newAllArea.find(tree => tree.value === id) || {}
    setCityTree([...currentCity.children])
  }

  const selectCity = params => {
    if (activeCity.length >= 8) {
      message.error('最多可选8个地区')
    } else {
      const index = activeCity.findIndex(city => city.value === params.id)
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

  return (
    <Modal title="请选择地区（最多选择8个）" visible={visible} onOk={confirmFn} onCancel={handleCancel} width={660}>
      <div className={styles.hasChosen}>
        <div>
          <span>已选择：</span>
          {activeCity.map(city => (
            <Tag key={city.id} className={styles.selectedTag} closable onClose={() => closeTag(city.id)}>
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
          {newAllArea.map(item => (
            <div
              key={item.value}
              className={classNames(styles.provinces, item.value === activeProvince ? styles.active : null)}
              onClick={() => selectProvince(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.areaRight}>
          {cityTree.map(city => (
            <span
              key={city.value}
              className={classNames(styles.cityBox, activeCity.findIndex(val => val.value === city.value) > -1 ? styles.cityActive : null)}
              onClick={() => selectCity({ id: city.value, name: city.label })}
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
