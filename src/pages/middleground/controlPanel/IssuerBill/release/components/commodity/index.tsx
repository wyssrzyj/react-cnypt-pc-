import React from 'react'
import { Form, Col, Row, Input } from 'antd'
import { toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
import Category from './category'
import styles from './index.module.less'

const { TextArea } = Input

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
    plusMaterialType = [],
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
      options: plusMaterialType
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
      label: '款图',
      type: 'img',
      field: 'stylePicture',
      span: 12
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
      <Row className={styles.goodsRemark}>
        <span className={styles.payment}>
          上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件
        </span>
        <Col span={20} className={styles.textArea}>
          <FormItem name="goodsRemark" label="备注说明">
            <TextArea
              style={{ width: '100%', resize: 'none' }}
              rows={4}
              allowClear={true}
              showCount
              maxLength={999}
            />
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}

export default Basics
