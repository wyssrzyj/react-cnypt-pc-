import React, { useEffect } from 'react'
import { Form, Col, Row, Select } from 'antd'
import { observer, toJS, useStores } from '@/utils/mobx'
// import FormNode from '@/components/FormNode'
const { Option } = Select
// import Inputs from './inputs'
import styles from './index.module.less'
// import { cloneDeep } from 'lodash'
import MainCategoriesCom from './mainCategoriesCom'

const FormItem = Form.Item
const Category = () => {
  const { factoryStore, commonStore } = useStores()
  const { productCategoryList } = factoryStore
  // const [treeData, setTreeData] = useState([])
  // const [value, serValue] = useState([])
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
    ;(async () => {})()
  }, [productCategoryList])

  return (
    <div className={styles.top}>
      <Row>
        <Col span={12}>
          <FormItem
            className={styles.categoryId}
            name="categoryCodes"
            label="商品品类"
            rules={[{ required: true, message: '请选择商品品类 ' }]}
            {...layout}
          >
            <MainCategoriesCom />

            {/* <TreeSelect maxTagCount={5} allowClear={true} {...tProps} /> */}
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
              // showSearch
              style={{ width: 325 }}
              placeholder="请选择发单量"
              // optionFilterProp="children"
              // filterOption={(input, option) => {
              //   return (
              //     `${option.children}`
              //       .toLowerCase()
              //       .indexOf(input.toLowerCase()) >= 0
              //   )
              // }}
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
