import React from 'react'
import { Form, Col, Row, Input } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 24
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
      label: '付款信息',
      required: true,
      message: '请输入付款信息',
      placeholder: '请输入付款信息',
      field: 'category',
      span: 13,
      options: paymentType
    },
    {
      label: '需求有效期',
      required: true,
      placeholder: '请选择日期',
      type: 'datePicker',
      field: 'processingType',
      span: 13,
      options: deliveryType
    },
    {
      label: '期望收货日期',
      type: 'rangePicker',
      message: '请输入目标单价',
      field: 'unitPrice',
      span: 13,
      options: deliveryType
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
        <Col span={13}>
          <FormItem {...layout} name="delivery" label={'交货期'}>
            <Input
              placeholder={'请输入'}
              addonBefore={'自下单后'}
              addonAfter={'天内交货至指定地址'}
            ></Input>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}

export default Basics
