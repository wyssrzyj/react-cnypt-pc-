import React from 'react'
import { Cascader, Col, Form, Input, Radio } from 'antd'
import options from './cityData.js'
import styles from './index.module.less'
import Cooperation from './cooperation'
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 24
  }
}
function index() {
  return (
    <div>
      <Col span={12}>
        <Form.Item {...layout} label="收货地址" name="address">
          <div className={styles.receiving}>
            <span>所在地区以及详细地址</span>
            <Cascader
              className={styles.address}
              options={options}
              placeholder="请选择所在地区"
            />
            <Input placeholder="请输入详细的地址，如道路、门牌号、小区、单元等" />
          </div>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          {...layout}
          label="订单联系人"
          name="contacts"
          rules={[
            { pattern: /^[^\s]*$/, message: '录入信息不能包含空格' },
            { max: 20, message: '名称不得超过20个字符' },
            { required: true, message: `请输入订单联系人` }
          ]}
        >
          <Input placeholder={`请输入请输入设备名称`} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          {...layout}
          label=" 联系人电话"
          name="telephone"
          rules={[
            { pattern: /^[^\s]*$/, message: '录入信息不能包含空格' },
            { max: 20, message: '名称不得超过20个字符' },
            { required: true, message: `请输入联系人电话` }
          ]}
        >
          <Input placeholder={`请输入请输入设备名称`} />
        </Form.Item>
      </Col>
      <Col span={13}>
        <Form.Item
          {...layout}
          label=" 公开方式"
          rules={[{ required: true, message: `请选择公开方式` }]}
          name="open"
        >
          <Radio.Group>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>报价后可见</Radio>
            <Radio value={3}>洽谈后可见</Radio>
            <Radio value={4}>不公开</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={13}>
        <Form.Item
          {...layout}
          rules={[{ required: true, message: `请选择询价方式` }]}
          label=" 询价方式"
          name="inquiry"
        >
          <Radio.Group>
            <Radio value={3}>平台公开征集生产商</Radio>
            <Radio value={4}>私密寻找生产商报价</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Cooperation />
    </div>
  )
}

export default index
