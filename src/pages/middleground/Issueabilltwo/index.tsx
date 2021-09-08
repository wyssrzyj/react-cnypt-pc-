import React, { useState } from 'react'
import { Button, Menu, Form, Input, Row, Col, Pagination } from 'antd'
import styles from './todo.module.less'
import { PlusCircleTwoTone } from '_@ant-design_icons@4.6.4@@ant-design/icons'
import { useHistory, useLocation } from 'react-router'
import Component from './components'

// 配置路由

const Issueabill = () => {
  const [sum, setSum] = useState(false)
  const { push } = useHistory()

  const Menus = [
    { name: '全部订单', id: 1 },
    { name: '待确认', id: 2 },
    { name: '进行中', id: 3 },
    { name: '待验收', id: 4 },
    { name: '已完成', id: 5 },
    { name: '退回', id: 6 },
    { name: '取消', id: 7 }
  ]
  const [form] = Form.useForm()
  const location = useLocation()
  console.log(
    '🚀 ~ file: index.tsx ~ line 27 ~ Issueabill ~ location',
    location
  )
  const history = useHistory()
  console.log('🚀 ~ file: index.tsx ~ line 29 ~ Issueabill ~ history', history)

  return (
    <div className={styles.Issuebill}>
      <Menu
        defaultOpenKeys={['1']}
        className={styles.menyTop}
        onClick={({ key }) => {
          push({
            pathname: key
          })
        }}
        // selectedKeys={[current]}
        mode="horizontal"
      >
        {Menus.map(item => {
          return (
            <Menu.Item className={styles.meny} key={item.id}>
              {item.name}
            </Menu.Item>
          )
        })}

        <Menu.Item className={styles.drafts} key="7">
          草稿箱
        </Menu.Item>
        <Button className={styles.newly} icon={<PlusCircleTwoTone />}>
          新增按钮
        </Button>
      </Menu>

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
      <div>
        <Component />
      </div>

      <Pagination className={styles.paging} defaultCurrent={1} total={50} />
    </div>
  )
}
export default Issueabill
