import React, { useState } from 'react'
import { Modal, Button, Checkbox, Tag, message } from 'antd'
import { DownOutlined, DeleteOutlined } from '@ant-design/icons'
import { isFunction } from 'lodash'
import mainCategories from '@/static/mainCategories'
import styles from './index.module.less'

const MainCategoriesCom = props => {
  const { onChange } = props
  const [checkedCategories, setCheckedCategories] = useState<any>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [checkedObject, setCheckedObject] = useState({})

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
    if (flat.length > 5) {
      message.warning('最多可选5个')
    } else {
      setCheckedCategories([...flat])
    }
  }

  const emptyCategories = () => {
    setCheckedCategories([])
    setCheckedObject({})
  }

  return (
    <div className={styles.mainCategoriesCom}>
      <div
        onClick={() => setModalVisible(!modalVisible)}
        className={styles.trigger}
      >
        <div>
          {checkedCategories.map(type => (
            <span key={type} className={styles.checkedBox}>
              {type}
            </span>
          ))}
        </div>
        <DownOutlined className={styles.arrow} />
      </div>
      <Modal
        title="选择主营类别（最多可选5个）"
        visible={modalVisible}
        width={892}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.checkedCategories}>
          <div>
            {checkedCategories.map(type => (
              <Tag key={type} color="orange">
                {type}
              </Tag>
            ))}
          </div>
          <Button icon={<DeleteOutlined />} onClick={emptyCategories}>
            清空
          </Button>
        </div>
        <ul className={styles.allCategories}>
          {mainCategories.map(category => {
            const { value, label, children } = category
            return (
              <li key={value} className={styles.categoriesRow}>
                <div className={styles.labelName}>{label}</div>
                <Checkbox.Group
                  className={styles.labelValue}
                  options={children}
                  value={checkedCategories}
                  onChange={checkedValue => onGroupChange(checkedValue, label)}
                />
              </li>
            )
          })}
        </ul>
      </Modal>
    </div>
  )
}

export default MainCategoriesCom
