import React, { useState, useEffect } from 'react'
import { TreeSelect, Form, Col, Row, Select } from 'antd'
import { observer, toJS, useStores } from '@/utils/mobx'
// import FormNode from '@/components/FormNode'
const { Option } = Select
// import Inputs from './inputs'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'

const FormItem = Form.Item
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
      span: 16
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
    placeholder: '请选择商品品类',
    style: {
      width: '100%'
    }
  }

  function onChanges(value) {
    console.log(`selected ${value}`)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val) {
    console.log('search:', val)
  }

  return (
    <div className={styles.top}>
      <Row>
        <Col span={12}>
          <FormItem
            className={styles.categoryId}
            name="categoryId"
            label="商品品类"
            rules={[{ required: true, message: '请选择商品品类 ' }]}
            {...layout}
          >
            <TreeSelect maxTagCount={5} allowClear={true} {...tProps} />
          </FormItem>
        </Col>
        <Col span={12} className={styles.cate}>
          <FormItem
            name={'goodsNum'}
            label={'发单量'}
            {...layout}
            rules={[{ required: true, message: '请选择发单量' }]}
          >
            <Select
              showSearch
              style={{ width: 325 }}
              placeholder="请选择发单量"
              optionFilterProp="children"
              onChange={onChanges}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {goodsNum.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}

export default observer(Category)
