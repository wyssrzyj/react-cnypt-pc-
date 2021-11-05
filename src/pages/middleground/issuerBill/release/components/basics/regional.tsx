import React, { useState } from 'react'
import { Form, Row, Col, Input, Select } from 'antd'
// import { toJS } from 'mobx'
import { observer, toJS, useStores } from '@/utils/mobx'
import styles from './index.module.less'
// import Region from './region'
import { isArray } from 'lodash'

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
  const { popUpData } = demandListStore

  const list = item => {
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
  }
  const children = []
  const wholeCountry = [
    {
      label: '不限',
      value: '0',
      children: []
    }
  ]
  // 把全国添加到最前面
  const newAllArea = wholeCountry.concat(list(toJS(allArea))) //字典数据
  newAllArea.map(item =>
    children.push(
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    )
  )

  // -------------------

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const handleModalOk = cities => {
    popUpData(cities)
    setModalVisible(false)
  }
  // const { commonStore } = useStores()
  // const [value, serValue] = useState([])

  // const { allArea } = commonStore
  // const { SHOW_PARENT } = TreeSelect

  // const [treeData, setTreeData] = useState([])

  // useEffect(() => {
  //   if (!isEmpty(toJS(allArea))) {
  //     setTreeData([
  //       {
  //         label: '全国',
  //         value: '0',
  //         key: '0',
  //         children: list(toJS(allArea))
  //       }
  //     ])
  //   }
  // }, [allArea])

  // const list = v => {
  //   if (!isEmpty(v)) {
  //     v.map(item => {
  //       if (!isEmpty(item.children)) {
  //         item.children.forEach(s => {
  //           s.children = []
  //         })
  //       }
  //     })
  //   }
  //   return v
  // }
  // const onChange = value => {
  //   //获取所有的父节点.
  //   serValue(value)
  // }
  // const tProps = {
  //   treeData,
  //   value: value,
  //   onChange: onChange,
  //   treeCheckable: true,
  //   showCheckedStrategy: SHOW_PARENT,
  //   placeholder: '请选择地区',
  //   style: {
  //     width: '100%'
  //   }
  // }
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
            {/* <Region /> */}

            <Select
              mode="multiple"
              allowClear
              open={false}
              style={{ width: '100%' }}
              placeholder="请选择地区"
            >
              {children}
            </Select>
            {/* <TreeSelect
              defaultOpen={false}
              maxTagCount={5}
              allowClear={true}
              {...tProps}
            /> */}
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
          visible={modalVisible} //弹窗
          handleCancel={() => setModalVisible(false)} //点击遮罩层或右上角叉或取消按钮的回调
          handleOk={handleModalOk} //确认的回调
        />
      )}
    </div>
  )
}

export default observer(regional)
