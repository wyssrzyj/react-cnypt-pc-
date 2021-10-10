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
      label: '需求单名称',
      required: true,
      message: '请输入需求单名称',
      placeholder: '请输入需求单名称',
      field: 'name',
      span: 13
    },
    {
      label: '企业信息',
      field: 'invoice',
      required: true,
      message: '请选择是否有增值税发票',
      type: 'radio',
      span: 13,
      options: [
        { label: '公开', value: 1 },
        { label: '不公开', value: 0 }
      ]
    },
    {
      label: '地区要求',
      required: true,
      message: '不限',
      placeholder: '请选择地区',
      type: 'select',
      field: 'regional',
      span: 12,
      options: paymentType
    },
    {
      label: '有效车位',
      message: '请选择交货方式',
      type: 'select',
      field: 'parking',
      span: 10,
      options: deliveryType
    },
    {
      label: '其他要求',
      field: 'requirement',
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
