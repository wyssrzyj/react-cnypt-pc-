import React, { useState, useEffect } from 'react'
import { Modal, Button, Checkbox, Tag } from 'antd'
import { DownOutlined, DeleteOutlined } from '@ant-design/icons'
import { isFunction, filter, find, isEmpty, isArray } from 'lodash'
import { toJS } from 'mobx'
import classNames from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'
const MainCategoriesCom = props => {
  const { onChange, value, state } = props
  const { factoryStore } = useStores()
  const { productCategoryList } = factoryStore
  const newList = toJS(productCategoryList)
  const childList = newList.reduce((prev, item) => {
    prev.push(...item.children)
    return prev
  }, [])
  const [checkedCategories, setCheckedCategories] = useState<any>(
    isArray(value) ? [...value] : []
  )
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [checkedObject, setCheckedObject] = useState<any>({})
  const [checkedLabel, setCheckedLabel] = useState<any>([])
  /// const [childList, setChildList] = useState<any>([])
  const handleOk = () => {
    setModalVisible(false)
    isFunction(onChange) && onChange(checkedCategories)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }
  const onGroupChange = (checkedValue, label) => {
    checkedObject[label] = [...checkedValue]
    setCheckedObject({ ...checkedObject })
    const newArray = Object.values(checkedObject) as Array<Array<string>>
    const flat = newArray.reduce((prev, next) => {
      return [...prev, ...next]
    }, [])
    const newLabel = filter(childList, function (o) {
      return find(flat, function (item) {
        return item === o.code
      })
    }).map(item => item.name)
    setCheckedLabel([...newLabel])
    // if (flat.length > 5) {
    //   message.warning('最多可选5个')
    // } else {
    //   setCheckedCategories([...flat])
    // }
    setCheckedCategories([...flat])
  }

  const emptyCategories = () => {
    setCheckedCategories([])
    setCheckedObject({})
    setCheckedLabel([])
  }
  const handleCom = () => {
    if (state === 'check') return false
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    if (value && !isEmpty(childList)) {
      setCheckedCategories([...value])
      const newLabel = filter(childList, function (o) {
        return find(value, function (item) {
          return item === o.code
        })
      }).map(item => item.name)
      setCheckedLabel([...newLabel])
    }
  }, [value, productCategoryList])

  return (
    <div className={styles.mainCategoriesCom}>
      <div
        onClick={handleCom}
        className={classNames(
          styles.trigger,
          state === 'check' ? styles.disable : styles.active
        )}
      >
        <div>
          {checkedLabel.map((type, index) => (
            <span key={index} className={styles.checkedBox}>
              {type}
            </span>
          ))}
        </div>
        <DownOutlined className={styles.arrow} />
      </div>
      <Modal
        title="选择主营类别"
        visible={modalVisible}
        width={892}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.checkedCategories}>
          <div>
            {checkedLabel.map((type, index) => (
              <Tag key={index} color="orange">
                {type}
              </Tag>
            ))}
          </div>
          <Button icon={<DeleteOutlined />} onClick={emptyCategories}>
            清空
          </Button>
        </div>
        <ul className={styles.allCategories}>
          {newList.map(category => {
            const { code, name, children } = category
            const newChildren = children.map(item => ({
              value: item.code,
              label: item.name
            }))
            return (
              <li key={code} className={styles.categoriesRow}>
                <div className={styles.labelName}>{name}</div>
                <Checkbox.Group
                  className={styles.labelValue}
                  options={newChildren}
                  value={checkedCategories}
                  onChange={checkedValue => onGroupChange(checkedValue, name)}
                />
              </li>
            )
          })}
        </ul>
      </Modal>
    </div>
  )
}

export default observer(MainCategoriesCom)
