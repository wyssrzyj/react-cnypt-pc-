import React, { useState } from 'react'
import Title from '../controlPanel/components/title'
import { Input, Modal, Button } from 'antd'
import styles from './index.module.less'

const { TextArea } = Input

const productModalTexts = new Map()
productModalTexts.set('color', { title: '添加颜色', label: '颜色' })
productModalTexts.set('size', { title: '添加尺寸', label: '尺寸' })

const ProductModal = props => {
  const { callback, visible, type, onOk } = props

  const [productModalValue, setProductModalValue] = useState('')

  const productModalValueChange = event => {
    const { value } = event.target
    setProductModalValue(value)
  }

  return (
    <Modal
      visible={visible}
      centered
      maskClosable={false}
      onCancel={callback}
      title={false}
      footer={false}
    >
      <Title title={productModalTexts.get(type).title} size={18}></Title>
      <div className={styles.productModalContent}>
        <span className={styles.label}>
          {productModalTexts.get(type).label}
        </span>
        <TextArea rows={4} onChange={productModalValueChange}></TextArea>
      </div>
      <div className={styles.productModalBtns}>
        <Button
          type={'primary'}
          ghost
          className={styles.tableModalBtn}
          onClick={callback}
        >
          取消
        </Button>
        <Button
          type={'primary'}
          className={styles.tableModalBtn}
          onClick={() => onOk(productModalValue)}
        >
          确定
        </Button>
      </div>
    </Modal>
  )
}

export default ProductModal
