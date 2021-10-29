import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, TreeSelect } from 'antd'
// import { toJS } from 'mobx'
import { observer, toJS, useStores } from '@/utils/mobx'
import styles from './index.module.less'
import { isEmpty } from 'lodash'
const { TextArea } = Input
// const { SHOW_PARENT } = TreeSelect
const FormItem = Form.Item
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 12
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
  const { commonStore } = useStores()
  const [value, serValue] = useState([])

  const { allArea } = commonStore
  const { SHOW_PARENT } = TreeSelect

  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    if (!isEmpty(toJS(allArea))) {
      setTreeData([
        {
          label: '全国',
          value: '0',
          key: '0',
          children: list(toJS(allArea))
        }
      ])
    }
  }, [allArea])

  const list = v => {
    if (!isEmpty(v)) {
      v.map(item => {
        if (!isEmpty(item.children)) {
          item.children.forEach(s => {
            s.children = []
          })
        }
      })
    }
    return v
  }
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
      width: '100%'
    }
  }
  return (
    <div>
      <Row>
        <Col span={12} className={styles.requirements}>
          <FormItem
            {...layout}
            name="regionalIdList"
            label="地区要求"
            rules={[{ required: true, message: '请输入地区要求' }]}
          >
            <TreeSelect maxTagCount={5} allowClear={true} {...tProps} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.textArea}>
          <FormItem {...lay} name="otherRequirement" label="其他要求">
            <TextArea
              style={{ width: '82%', resize: 'none' }}
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

export default observer(regional)
