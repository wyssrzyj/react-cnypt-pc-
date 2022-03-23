import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, Select, Radio } from 'antd'
import { observer, toJS, useStores } from '@/utils/mobx'
import styles from './index.module.less'
// import Region from './region'
import { isArray, isEmpty } from 'lodash'

import AreaModal from './components/areaModal'
const { Option } = Select
const { TextArea } = Input
const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
const lay = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 24
  }
}

const regional = props => {
  const { initialValues } = props
  const { commonStore, demandListStore } = useStores()
  const { allArea } = commonStore
  const { popUpData, popData, queryFactoryName } = demandListStore
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [value, setValue] = useState(initialValues.isPointSend)
  const [factoryName, setFactoryName] = useState<any>([])

  useEffect(() => {
    acquisition()
  }, [])
  useEffect(() => {
    setValue(initialValues.isPointSend)
  }, [initialValues])
  const acquisition = async () => {
    const res = await queryFactoryName()
    setFactoryName(res)
  }

  const testMethod = item => {
    if (!isEmpty(item)) {
      let sum = []
      item.forEach(item => {
        sum.push(item)
        if (isArray(item.children)) {
          item.children.forEach(s => {
            sum.push(s)
          })
        }
      })
      return sum
    } else {
      return item
    }
  }
  const wholeCountry = [
    {
      label: '不限',
      value: '0',
      children: []
    }
  ]

  // 把全国添加到最前面

  const newAllArea = wholeCountry.concat(testMethod(toJS(allArea))) //字典数据
  let num = e => {
    let sum = []
    e.map(item => {
      if (!isEmpty(newAllArea)) {
        sum.push(newAllArea.filter(v => v.value === item))
      }
    })
    return sum
  }
  let last = e => {
    if (!isEmpty(e)) {
      let arr = num(e).flat(Infinity)
      arr.map(item => {
        item.id = item.value
        item.name = item.label
      })
      return arr
    }
  }
  const children = []
  newAllArea.map(item =>
    // options
    children.push(
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    )
  )
  const handleModalOk = cities => {
    popUpData(cities)
    setModalVisible(false)
  }
  const onChange = e => {
    setValue(e.target.value)
  }

  return (
    <div>
      <Row>
        <Col
          onClick={() => setModalVisible(true)}
          span={12}
          className={styles.requirements}
        >
          <FormItem
            name="regionalIdList"
            label="地区要求"
            rules={[{ required: true, message: '请选择地区' }]}
            {...layout}
          >
            <Select
              maxTagCount={5}
              mode="multiple"
              allowClear
              open={false}
              style={{ width: '100%' }}
              placeholder="请选择地区"
            >
              {children}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={styles.textArea}>
          <FormItem
            name="isPointSend"
            label="工厂发送"
            {...layout}
            rules={[{ required: true, message: '请选择工厂发送' }]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </FormItem>
        </Col>
      </Row>
      {value === 1 ? (
        <Row>
          <Col span={12} className={styles.textArea}>
            <FormItem {...layout} name="supplierTenantId" label="指定工厂">
              <Select
                showSearch
                placeholder="请选择是否指向工厂"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {factoryName.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.factoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col span={24} className={styles.textArea}>
          <FormItem {...lay} name="otherRequirement" label="其他要求">
            <TextArea
              style={{ width: '74%', resize: 'none' }}
              rows={4}
              allowClear={true}
              showCount
              maxLength={999}
            />
          </FormItem>
        </Col>
      </Row>
      {modalVisible && (
        <AreaModal
          perfect={last(toJS(popData))}
          visible={modalVisible} //弹窗
          handleCancel={() => setModalVisible(false)} //点击遮罩层或右上角叉或取消按钮的回调
          handleOk={handleModalOk} //确认的回调
        />
      )}
    </div>
  )
}

export default observer(regional)
