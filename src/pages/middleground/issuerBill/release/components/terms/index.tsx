import React from 'react'
import { Form, Col, Row } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
import Date from './date'
import styles from './index.module.less'

const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 15
  }
}
const keys = [
  'type',
  'options',
  'keys',
  'disabled',
  'max',
  'min',
  'showSearch',
  'onSearch',
  'filterOption',
  'allowClear',
  'width',
  'addonBefore',
  'addonAfter',
  'placeholder'
]
function Basics({ data }) {
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { paymentType = [] } = toJS(dictionary)
  const orderConfigs = [
    {
      label: '付款方式',
      required: true,
      message: '请输入付款方式',
      placeholder: '请输入付款方式',
      field: 'payDetails',
      span: 24,
      options: paymentType
    }
  ]

  const unitPrice = value => {
    data(value)
  }
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
            <Col key={item.field} span={item.span} className={styles.message}>
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
      <Date validity={unitPrice} />
    </div>
  )
}

export default Basics
