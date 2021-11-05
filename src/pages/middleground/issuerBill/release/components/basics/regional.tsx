import React, { useState } from 'react'
import { Form, Row, Col, Input, Select } from 'antd'
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
const regional = () => {
  const { commonStore, demandListStore } = useStores()
  const { allArea } = commonStore
  const { popUpData, popData } = demandListStore
  const [modalVisible, setModalVisible] = useState<boolean>(false)

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
  console.log(newAllArea)

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
            label="地区"
            rules={[{ required: true, message: '请选择地区' }]}
            {...layout}
          >
            <Select
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
