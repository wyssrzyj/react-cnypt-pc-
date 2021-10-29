import React, { useState, useEffect } from 'react'
import { TreeSelect, Form, Col, Row } from 'antd'
import { observer, toJS, useStores } from '@/utils/mobx'
import FormNode from '@/components/FormNode'

// import Inputs from './inputs'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'

const FormItem = Form.Item

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
const { SHOW_PARENT } = TreeSelect

const Category = () => {
  const { factoryStore, commonStore } = useStores()
  const { productCategoryList } = factoryStore
  const [treeData, setTreeData] = useState([])
  const [value, serValue] = useState([])
  const { dictionary } = commonStore
  const { goodsNum = [] } = toJS(dictionary)

  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 12
    }
  }
  const dealTypeData = data => {
    data.forEach(item => {
      item.label = item.name
      item.value = item.id
      item.key = item.id
      if (Array.isArray(item.children) && item.children.length) {
        dealTypeData(item.children)
      }
    })
    return data
  }
  useEffect(() => {
    ;(async () => {
      const res = cloneDeep(productCategoryList)
      setTreeData(dealTypeData(res))
    })()
  }, [productCategoryList])

  const onChange = value => {
    //获取所有的父节点
    serValue(value)
  }

  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择产品品类',
    style: {
      width: '64%'
    }
  }
  const orderConfigs = [
    {
      label: '发单量',
      required: true,
      message: '请选择发单量',
      placeholder: '请选择发单量',
      type: 'select',
      field: 'goodsNum',
      options: goodsNum
    }
  ]

  return (
    <div>
      <Row>
        <Col span={12}>
          <FormItem
            className={styles.categoryId}
            name="categoryId"
            label="产品品类"
            rules={[{ required: true, message: '请选择产品品类 ' }]}
          >
            <TreeSelect maxTagCount={5} allowClear={true} {...tProps} />
          </FormItem>
        </Col>
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
            <Col key={item.field} span={12} className={styles.modify}>
              <FormItem
                name={item.field}
                label={item.label}
                {...layout}
                rules={[{ required: item.required, message: item.message }]}
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

export default observer(Category)
