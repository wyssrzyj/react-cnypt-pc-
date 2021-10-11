import React from 'react'
import { Form, Col, Row } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
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
  const { paymentType = [], deliveryType = [] } = toJS(dictionary)
  const orderConfigs = [
    {
      label: '商品品类',
      required: true,
      message: '请选择商品品类',
      placeholder: '请选择商品品类',
      type: 'multipleSelect',
      field: 'category',
      span: 12,
      options: paymentType
    },
    {
      label: '面料类型',
      required: true,
      message: '请选择面料类型',
      placeholder: '请选择面料类型',
      type: 'select',
      field: 'processingType',
      span: 12,
      options: deliveryType
    },
    {
      label: '发单量',
      required: true,
      placeholder: '最少数量 ~ 最大数量 件',
      message: '请输入发单量',
      field: 'orderQuantity',
      span: 12,

      options: deliveryType
    },
    {
      label: '目标单价',
      type: 'number',
      message: '请输入目标单价',
      field: 'unitPrice',
      span: 12,
      options: deliveryType
    },
    {
      label: '款图',
      type: 'img',
      field: 'paymentMap',
      span: 13
    },
    {
      label: '附件上传',
      type: 'annex',
      field: 'attachment',
      span: 13
    },
    {
      label: '备注说明',
      field: 'remarks',
      type: 'textarea',
      span: 12
    }
  ]
  return (
    <div>
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
            <Col key={item.field} span={item.span}>
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
