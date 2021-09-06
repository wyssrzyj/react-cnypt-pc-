import React, { useState } from 'react'
import styles from './todo.module.less'

import { Row, Col, Button } from 'antd'
import { PauseCircleOutlined } from '_@ant-design_icons@4.6.4@@ant-design/icons'

const Product = () => {
  // 请求完成会返回状态数据  根据状态数据显示不同操作
  //  根据接口来判断返回的状态数据来判断
  const [judgment, setJudgment] = useState(1) //用来判断订单状态
  console.log(setJudgment)
  return (
    <>
      <Button
        onClick={() => {
          setJudgment(judgment + 1)
        }}
      >
        测试状态-【{judgment}】
      </Button>
      <div className={styles.ayer}>
        {/* 标题 */}
        <div className={styles.themeatx}>
          <Row className={styles.left}>
            <Col span={6}>
              <span className={styles.color}>订单号：</span>{' '}
              <span>1795037941400163361</span>{' '}
            </Col>
            <Col span={5}>
              {' '}
              <span className={styles.color}> 2021-05-14 16:24:52</span>
            </Col>
            <Col span={10}>
              <span className={styles.overflow}>杭州创启服装厂455645645…</span>|
              <span> 查看他的所有订单</span>
            </Col>
            <Col span={3}>
              {' '}
              <div className={styles.count}>
                {' '}
                <PauseCircleOutlined /> 置顶
              </div>{' '}
            </Col>
          </Row>
        </div>
        {/* 内容 */}
        <div className={styles.theme}>
          <Row>
            <Col span={9}>
              <div>
                <div className={styles.imgs}>
                  <img
                    src="https://img2.baidu.com/it/u=1213067744,3505533793&fm=26&fmt=auto&gp=0.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <p>女士梭织连衣裙</p>
                  <p>
                    加工类型：<span>经销单，来图/来样加工</span>
                  </p>
                  <p>
                    订单类别：<span>针织服装（薄料）</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <span>100件</span>
            </Col>
            <Col span={3}>
              {' '}
              <span>20000</span>
            </Col>
            <Col span={4}>
              {/* 有5中状态 */}
              {judgment == 1 ? (
                <div className={styles.kuangsz}>
                  {/* 待确认 */}
                  <span className={styles.confirmed}>待确认</span>
                </div>
              ) : null}
              {judgment == 2 ? (
                <div className={styles.kuangsz}>
                  {/* 进行中 */}
                  <p className={styles.hand}>进行中</p>
                  <p className={styles.receiving}>期望收货时间</p>
                  <p className={styles.time}>2021-09-05</p>
                  <p className={styles.surplus}>
                    剩余 <span className={styles.day}>5</span>天
                  </p>
                </div>
              ) : null}
              {judgment == 3 ? (
                <div className={styles.kuangsz}>
                  {/* 待验收 */}
                  <p>进行中</p>
                  <p>已签收 2021-08-30 12:05</p>
                  <p>
                    剩余 <span>5</span>天
                  </p>
                </div>
              ) : null}
              {judgment == 4 ? (
                <div className={styles.kuangsz}>
                  {/* 退回订单 */}
                  <p>退回订单</p>
                  <p>查看原因</p>
                </div>
              ) : null}
              {judgment == 5 ? (
                <div className={styles.kuangsz}>
                  <p>取消订单</p>
                </div>
              ) : null}
            </Col>
            <Col span={4}>
              {/* 待确认 */}
              {judgment == 1 ? (
                <div>
                  <p>
                    <Button>取消订单</Button>
                  </p>
                </div>
              ) : null}

              {/* 进行中 */}
              {judgment == 2 ? (
                <div>
                  <p>
                    <Button type="primary">状态跟踪</Button>
                  </p>
                  <p>
                    <Button>在线跟单</Button>
                  </p>
                </div>
              ) : null}

              {/* 待验收 */}
              {judgment == 3 ? (
                <div>
                  <p>
                    <Button type="primary">确认验收 </Button>
                  </p>
                  <Button>状态跟踪</Button>
                  <p></p>
                </div>
              ) : null}

              {/* 退回订单 */}
              {judgment == 4 ? (
                <div>
                  <p>
                    <Button type="primary">重新编辑 </Button>
                  </p>
                  <p>
                    <Button className={styles.btn}>退回草稿箱</Button>
                  </p>
                </div>
              ) : null}

              {/* 取消订单 */}
              {judgment == 5 ? (
                <div>
                  <p>
                    <Button type="primary">重新编辑 </Button>
                  </p>
                  <p>
                    <Button className={styles.btn}>退回草稿箱</Button>
                  </p>
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
export default Product
