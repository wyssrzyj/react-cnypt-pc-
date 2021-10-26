import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, TreeSelect } from 'antd'
// import { toJS } from 'mobx'
import { observer, toJS, useStores } from '@/utils/mobx'
import styles from './index.module.less'
const { TextArea } = Input
// const { SHOW_PARENT } = TreeSelect
const FormItem = Form.Item

const regional = () => {
  const { commonStore } = useStores()
  const [value, serValue] = useState([])

  const { allArea } = commonStore
  const { SHOW_PARENT } = TreeSelect

  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    setTreeData([
      {
        label: '全国',
        value: '0',
        key: '0',
        children: toJS(allArea)
      }
    ])
  }, [allArea])
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
      width: '70%'
    }
  }
  return (
    <div>
      <Row>
        <Col span={12} className={styles.requirements}>
          <FormItem
            name="regionalIdList"
            label="地区要求"
            rules={[{ required: true, message: '请输入地区要求' }]}
          >
            <TreeSelect maxTagCount={5} allowClear={true} {...tProps} />
          </FormItem>
        </Col>

        <Col span={9} className={styles.textArea}>
          <FormItem name="otherRequirement" label="其他要求">
            <TextArea showCount maxLength={100} />
          </FormItem>
        </Col>
      </Row>
    </div>
  )
}

export default observer(regional)
