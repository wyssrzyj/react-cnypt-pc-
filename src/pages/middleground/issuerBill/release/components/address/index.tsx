import React, { useEffect, useState } from 'react'
import { Cascader, Row, Col, Form, Input, Radio } from 'antd'
import { toJS } from 'mobx'
import { useStores } from '@/utils/mobx'

// import options from './cityData.js'
import styles from './index.module.less'
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 16
  }
}

const index = () => {
  const { commonStore } = useStores()
  const [treeData, setTreeData] = useState([])

  const { allArea } = commonStore
  useEffect(() => {
    setTreeData(toJS(allArea))
  }, [allArea])

  return (
    <div>
      <Row>
        <Col span={12}>
          <Form.Item
            className={styles.address}
            {...layout}
            label="所在地区"
            name="location"
          >
            <Cascader options={treeData} placeholder="请选择所在地区" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <div className={styles.addressRight}>
            <Form.Item
              {...layout}
              rules={[{ max: 99, message: '不得超过99个字符' }]}
              label="详细地址"
              name="address"
            >
              <Input placeholder="请输入详细的地址，如道路、门牌号、小区、单元等" />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            {...layout}
            label="订单联系人"
            name="contactPerson"
            rules={[
              { pattern: /^[^\s]*$/, message: '录入信息不能包含空格' },
              { max: 20, message: '名称不得超过20个字符' },
              { required: true, message: `请输入订单联系人` }
            ]}
          >
            <Input placeholder={`订单联系人`} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...layout}
            label=" 联系人电话"
            name="contactPersonMobile"
            rules={[
              {
                pattern:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '请输入正确的手机号'
              },
              { max: 20, message: '名称不得超过20个字符' },
              { required: true, message: `请输入联系人电话` }
            ]}
          >
            <Input placeholder={`联系人电话`} />
          </Form.Item>
        </Col>
      </Row>
      <Col span={13} className={styles.isContactPublic}>
        <Form.Item
          {...layout}
          label=" 公开方式"
          rules={[{ required: true, message: `请选择公开方式` }]}
          name="isContactPublic"
        >
          <Radio.Group>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>报价后可见</Radio>
            <Radio value={3}>不公开</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </div>
  )
}

export default index
