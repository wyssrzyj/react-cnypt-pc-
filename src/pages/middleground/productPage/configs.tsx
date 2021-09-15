import React from 'react'
import { Icon } from '@/components'
import styles from './index.module.less'

export interface Product {
  skuCode: string // SKU编码
  color: string // 颜色
  size: string // 尺寸
  quantity: string | number // 数量
  price: string | number // 单价
  uid: string
}

export interface Material {
  materialTypeId: string // 物料类型ID
  name: string // 物料名称
  remark: string // 其他说明
  supplyType: string | number // 供应类型
  uid: string
}

export const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
}

export const layout2 = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 17
  }
}

export const productConfigs = [
  {
    label: '商品名称',
    required: true,
    message: '请输入商品名称',
    placeholder: '请输入商品名称',
    field: 'name',
    span: 12
  },
  {
    label: '商品品类',
    required: true,
    message: '请选择商品品类',
    placeholder: '请选择商品品类',
    type: 'tree',
    treeData: [],
    field: 'goodsCategoryId',
    span: 12
  },
  {
    label: 'SPU编码',
    placeholder: '请输入SPU编码',
    field: 'spuCode',
    span: 12
  },
  {
    label: '生产方式',
    required: true,
    message: '请选择生产方式',
    placeholder: '请选择生产方式',
    type: 'select',
    options: [],
    field: 'procedureType',
    span: 12
  }
]

export const otherConfigs = [
  {
    label: '款图',
    field: 'stylePicture',
    maxImgs: 10,
    required: true,
    accept: '.jpg,.png,.jpeg',
    message: '请上传款图',
    maxSize: 500,
    span: 20,
    type: 'img',
    tips: '上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件'
  },
  {
    label: '附件',
    type: 'annex',
    field: 'annex',
    maxSize: 20,
    span: 20,
    accept: '.jpg,.png,.jpeg,.rar,.zip,.doc,.docx,.pdf',
    tips: '支持扩展名：.rar .zip .doc .docx .pdf .jpg...'
  },
  {
    label: '备注说明',
    type: 'textarea',
    field: 'remark',
    rows: 4,
    span: 20
  }
]

export const keys = [
  'type',
  'options',
  'keys',
  'maxImgs',
  'maxSize',
  'tips',
  'placeholder',
  'disabled',
  'max',
  'min',
  'treeData'
]

export const TabelTitle = props => {
  const { title, callback, disabled } = props
  const addClick = () => {
    callback && callback()
  }

  return (
    <div className={styles.tableTitle}>
      {title ? title : null}
      {!disabled ? (
        <Icon
          type={'jack-del'}
          onClick={addClick}
          className={styles.tableIcon}
        ></Icon>
      ) : null}
    </div>
  )
}

export const RequiredTitle = props => {
  const { title } = props

  return <div className={styles.requiredTitle}>{title}</div>
}
