import React from 'react'
import { Form, Col, Row, Input } from 'antd'
import { toJS, useStores, observer } from '@/utils/mobx'
import FormNode from '@/components/FormNode'
import Category from './category'
import styles from './index.module.less'

const { TextArea } = Input
console.log(10)

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
  'width',
  'multiple'
]

function Basics() {
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const {
    plusMaterialType = [],
    productType = [],
    // processType = [],
    inquiryProcessType = []
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
      options: plusMaterialType,
      cesar: 0
    },

    {
      label: '目标单价',
      // type: 'number',
      message: '请输入目标单价',
      field: 'goodsPrice',
      span: 12,
      cesar: 1
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
      options: inquiryProcessType,
      cesar: 0
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
      options: productType,
      cesar: 0
    },

    {
      label: '款图',
      type: 'img',
      field: 'stylePicture',
      // multiple: true,
      span: 12
    }
  ]
  let map = new Map()

  const fangfa = item => {
    // map.set(1, [
    //   {
    //     pattern: /^([0-9]+[\d]*(.[0-9]{1,2})?)$/,
    //     message: '请输入正确的数量(小数点最多输入两位)'
    //   }
    // ])
    map.set(0, [{ required: item.required, message: item.message }])
  }

  return (
    <div>
      <Category />
      <div className={styles.orderCon}>
        <Row>
          {orderConfigs.map(item => {
            fangfa(item)
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
                  rules={map.get(item.cesar)}
                  {...layout}
                >
                  <FormNode {...data}></FormNode>
                </FormItem>
              </Col>
            )
          })}
        </Row>
      </div>

      <Row className={styles.goodsRemark}>
        <span className={styles.payment}>
          上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件
        </span>
        <Col span={24} className={styles.textArea}>
          <FormItem name="goodsRemark" label="备注说明" labelCol={{ span: 2 }}>
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

export default observer(Basics)
