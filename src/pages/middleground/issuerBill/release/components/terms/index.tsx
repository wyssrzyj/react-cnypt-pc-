import React from 'react'
import { Form, Col, Row, Input } from 'antd'
// import { toJS, useStores } from '@/utils/mobx'
// import FormNode from '@/components/FormNode'
import Date from './date'
import styles from './index.module.less'

// const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 8
  }
}

function Basics({ time }) {
  const unitPrice = value => {
    console.log(value)
  }
  return (
    <div>
      <Row>
        <Col span={24} className={styles.payDetails}>
          <Form.Item
            {...layout}
            label=" 付款方式"
            name="payDetails"
            rules={[
              { max: 99, message: '不得超过99个字符' },
              { required: true, message: `请输入付款方式` }
            ]}
          >
            <Input placeholder={`请输入付款方式`} />
          </Form.Item>
        </Col>
        {/* {orderConfigs.map(item => {
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
        })} */}
      </Row>
      <Date time={time} validity={unitPrice} />
    </div>
  )
}

export default Basics
