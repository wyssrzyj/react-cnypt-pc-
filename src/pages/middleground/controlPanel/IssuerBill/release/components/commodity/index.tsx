import React from 'react'
import { Form, Col, Row } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
import Category from './category'
import styles from './index.module.less'

const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
}
const keys = [
  'type',
  'options',
  'keys',
  'placeholder',
  'disabled',
  'max',
  'min',
  'showSearch',
  'onSearch',
  'filterOption',
  'allowClear',
  'width'
]

function Basics() {
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const {
    deliveryType = [],
    materialType = [],
    inquiryProcessType = [],
    productType = []
  } = toJS(dictionary)

  const orderConfigs = [
    {
      label: '面料类型',
      required: true,
      message: '请选择面料类型',
      placeholder: '请选择面料类型',
      type: 'select',
      field: 'plusMaterialType',
      span: 12,
      options: materialType
    },

    {
      label: '目标单价',
      type: 'number',
      message: '请输入目标单价',
      field: 'goodsPrice',
      span: 12,
      options: deliveryType
    },
    {
      label: '加工类型',
      required: true,
      message: '请选择加工类型',
      placeholder: '请选择加工类型',
      type: 'multipleSelect',
      mode: 'multiple',
      field: 'processTypeList',
      span: 12,
      options: inquiryProcessType
    },
    {
      label: '生产方式',
      required: true,
      message: '请选择生产方式',
      placeholder: '请选择生产方式',
      type: 'multipleSelect',
      mode: 'multiple',
      field: 'productTypeList',
      span: 12,
      options: productType
    },
    {
      label: '备注说明',
      field: 'goodsRemark',
      type: 'textarea',
      span: 12
    },
    {
      label: '款图',
      type: 'img',
      field: 'stylePicture',
      span: 13
    }
  ]
  return (
    <div>
      <Category />

      <Row>
        {orderConfigs.map(item => {
          //orderConfigs form的数据
          const data: any = {} //定义一个空对象
          keys.forEach(i => {
            if (![null, undefined].includes(item[i])) {
              //当不等于null和undefined
              data[i] = item[i]
            }
          })

          return (
            <Col key={item.field} span={item.span} className={styles.modify}>
              <FormItem
                name={item.field}
                label={item.label}
                rules={[{ required: item.required, message: item.message }]}
                {...layout}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Basics
