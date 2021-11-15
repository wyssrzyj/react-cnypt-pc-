import React from 'react'
import { Form, Col, Row } from 'antd'
import { useStores } from '@/utils/mobx'
import { toJS } from 'mobx'
import FormNode from '@/components/FormNode'
import Regional from './regional'
import styles from './index.module.less'

const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 16
  }
}
const keys = [
  'size',
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

  const { effectiveLocation = [] } = toJS(dictionary)
  const orderConfigs = [
    {
      label: '订单标题',
      required: true,
      message: '输入所要发布订单标题',
      placeholder: '输入所要发布订单标题',
      field: 'name',
      span: 12,
      cesar: 1
    },
    {
      label: '有效车位',
      message: '请选择有效车位',
      required: true,
      placeholder: '请选择有效车位',
      type: 'select',
      field: 'effectiveLocation',
      span: 12,
      cesar: 0,
      options: effectiveLocation
    },
    {
      label: '企业信息',
      cesar: 0,
      field: 'isEnterpriseInfoPublic',
      required: true,
      message: '请选择是否公开',
      type: 'radio',
      span: 12,
      options: [
        { label: '公开', value: 1 },
        { label: '不公开', value: 0 }
      ]
    }
  ]
  let map = new Map()
  const fangfa = item => {
    map.set(1, [
      { required: item.required, message: item.message },
      { max: 99, message: '不得超过99个字符' }
    ])

    map.set(0, [{ required: item.required, message: item.message }])
  }
  return (
    <div className={styles.basic}>
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
          fangfa(item)
          return (
            <Col key={item.field} span={item.span} className={styles.field}>
              <FormItem
                key={item.field}
                name={item.field}
                label={item.label}
                rules={map.get(item.cesar)}
                {...layout}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
      </Row>
      <Regional />
    </div>
  )
}

export default Basics
