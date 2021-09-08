import React, { useState } from 'react'
import { Button, Form, Input, Row, Col, Pagination, Tabs } from 'antd'
import styles from './todo.module.less'
import { PlusCircleTwoTone } from '_@ant-design_icons@4.6.4@@ant-design/icons'
import Product from './Allorders/Product'

// 配置路由

const Issueabill = () => {
  const [sum, setSum] = useState(false)
  const [keyt, setKeyt] = useState(0)

  const [form] = Form.useForm()
  // const location = useLocation()
  // console.log(
  //   '🚀 ~ file: index.tsx ~ line 27 ~ Issueabill ~ location',
  //   location
  // )
  // const history = useHistory()
  // console.log('🚀 ~ file: index.tsx ~ line 29 ~ Issueabill ~ history', history)
  const { TabPane } = Tabs
  const operations = (
    <Button className={styles.newly} icon={<PlusCircleTwoTone />}>
      新增按钮
    </Button>
  )
  // 判断按钮显示是否是在草稿箱
  const onTabClick = key => {
    console.log(key)
    if (key == 8) {
      setKeyt(key)
    } else {
      setKeyt(0)
    }
  }

  return (
    <div className={styles.Issuebill}>
      <div className={styles.tutu}>
        <Tabs
          tabPosition="top"
          tabBarGutter={80}
          tabBarExtraContent={operations}
          onTabClick={onTabClick}
        >
          <TabPane tab="全部订单" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="待确认" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="进行中" key="3">
            Content of tab 3进行中
          </TabPane>
          <TabPane tab="待验收" key="4">
            Content of tab 3待验收
          </TabPane>
          <TabPane tab="已完成" key="5">
            Content of tab 3已完成
          </TabPane>
          <TabPane tab="退回" key="6">
            Content of tab 3退回
          </TabPane>
          <TabPane tab="取消" key="7">
            Content of tab 3取消
          </TabPane>
          <TabPane tab="草稿箱" key="8">
            Content of tab 3草稿箱
          </TabPane>
        </Tabs>
      </div>
      <Form
        form={form}
        className={styles.form}
        onFinish={v => {
          if (sum) {
            console.log(v)
            console.log('查询')
          } else {
            return v === null
          }
        }}
      >
        <Form.Item className={styles.Please} label="发单商名称" name="Issuer">
          <Input className={styles.issuer} placeholder="请输入发单商名称" />
        </Form.Item>
        <Form.Item className={styles.order} label="订单关键字" name="keyword">
          <Input
            className={styles.issuer}
            placeholder="请输入订单号、订单名称"
          />
        </Form.Item>

        <Form.Item
          className={styles.Please}
          label="订单总金额"
          name="MinimumAmount"
        >
          <Input className={styles.amountstart} placeholder="最低金额" />
        </Form.Item>
        <Form.Item className={styles.Please} name="MaximumAmount">
          <Input className={styles.amountend} placeholder="最高金额" />
        </Form.Item>

        <Form.Item
          className={styles.Confirmation}
          label="订单确认时间"
          name="rangetart"
        >
          <Input className={styles.amountendstart} placeholder="时间范围起始" />
        </Form.Item>
        <Form.Item className={styles.Please} name="timeRange">
          <Input
            className={styles.amountendstartend}
            placeholder="时间范围起结束"
          />
        </Form.Item>

        <Form.Item
          className={styles.query}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              setSum(true)
            }}
          >
            查询
          </Button>
        </Form.Item>
        <Form.Item
          className={styles.Reset}
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              setSum(false)
              form.resetFields()
            }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
      {/* 表格 */}
      <div className={styles.tabletop}>
        <Row>
          <Col span={7}>订单详情</Col>
          <Col span={4}>数量</Col>
          <Col span={5}>总金额</Col>
          <Col span={4}>订单状态</Col>
          <Col span={4}>操作</Col>
        </Row>
      </div>
      {/* 全部订单 */}
      <Product keyt={keyt} />

      <Pagination className={styles.paging} defaultCurrent={1} total={50} />
    </div>
  )
}
export default Issueabill
