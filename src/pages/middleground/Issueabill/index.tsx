import React from 'react'
import { Button, Menu, Input, Pagination, Row, Col, Form } from 'antd'

import { PlusCircleOutlined } from '@ant-design/icons'
import styles from './todo.module.less'
import Product from './components/Product'

const Issueabill = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className={styles.Issuebill}>
        {/* 头部 */}
        <div>
          <div className={styles.location}>
            <Menu className={styles.topbs} mode="horizontal">
              <Menu.Item className={styles.top} key="mail1">
                全部订单
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail2">
                待确认
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail3">
                进行中
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail4">
                待验收
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail5">
                已完成
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail6">
                返回
              </Menu.Item>
              <Menu.Item className={styles.top} key="mail7">
                取消
              </Menu.Item>
              <Menu.Item className={styles.top} key="alipay8">
                <a
                  href="https://ant.design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  草稿箱
                </a>
              </Menu.Item>
            </Menu>
            <Button
              className={styles.topright}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              新增订单
            </Button>
          </div>
        </div>
        {/* form表单 */}
        <div className={styles.form}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className={styles.Issuer}>
              <Form.Item
                className={styles.inputleft}
                label="发单商名称"
                name="username"
              >
                <Input
                  className={styles.inputc}
                  placeholder="请输入发单商名称 "
                />
              </Form.Item>
              <div className={styles.Order}>
                <Form.Item label="订单关键字" name="password">
                  <Input
                    className={styles.inputc}
                    placeholder="请输入订单号、订单名称 "
                  />
                </Form.Item>
              </div>
            </div>
            <div className={styles.bos}>
              <div className={styles.amount}>
                <div className={styles.Total}>
                  <Form.Item label="订单总金额" name="password">
                    <Input
                      className={styles.inputd}
                      size="small"
                      placeholder="最低金额 "
                    />{' '}
                    -{' '}
                    <Input className={styles.inputd} placeholder="最高金额 " />
                  </Form.Item>
                </div>
                <div className={styles.range}>
                  <Form.Item label="订单确认时间" name="password">
                    <Input
                      className={styles.inputd}
                      placeholder="时间范围起始 "
                    />{' '}
                    -{' '}
                    <Input
                      className={styles.inputd}
                      placeholder="时间范围起结束 "
                    />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.btn}>
                <span className={styles.btnReset}>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit">重置</Button>
                  </Form.Item>
                </span>
                <span className={styles.query}>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </Form.Item>
                </span>
              </div>
            </div>
          </Form>
        </div>

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
        {/* 商品列表 */}
        <div>
          <Product />
        </div>
        {/* 分页 */}
        <div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  )
}

export default Issueabill
