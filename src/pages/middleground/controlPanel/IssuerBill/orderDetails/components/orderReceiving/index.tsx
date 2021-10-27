import React, { useState } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'

function index({ stated }) {
  const { id, source } = stated
  const [button, setButton] = useState(true)
  console.log(id)

  const { demandListStore } = useStores()
  const { OrderQuantity, SubmitRequisition, RejectSubmission } = demandListStore
  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 12
    }
  }
  const onFinish = async (values: any) => {
    console.log('斩灭剑')

    if (button) {
      console.log('接受')
      const quantitativeJudgment = await OrderQuantity({
        goodsNum: values.receiveGoodsNum,
        id: id
      })
      console.log('数量接口~~~~~~~~~~', quantitativeJudgment)

      if (quantitativeJudgment.code === 200) {
        console.log('可以执行form')
        const res = await SubmitRequisition({
          ...values,
          purchaserInquiryId: id,
          status: 2
        })
        console.log(res)
      }
    } else {
      const res = await RejectSubmission({
        ...values,
        supplierId: id,
        status: -2
      })
      console.log(res)

      console.log('拒绝')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Form
        name="basic"
        // labelCol={{ span:  }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item {...layout} label="报价信息" name="quoteInfo">
              <Input placeholder={'请输入报价信息'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...layout} label="收款条件" name="payDetails">
              <Input placeholder={'请输入收款条件'} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="可接订单数"
              name="receiveGoodsNum"
              rules={[{ required: true, message: '请输入可接订单数' }]}
            >
              <Input placeholder={'请输入可接订单数'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...layout} label="备注" name="remark">
              <Input placeholder={'请输入备注'} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {source == 2 ? (
            <Button
              onClick={() => {
                setButton(false)
              }}
              className={styles.noBtn}
              size="large"
              htmlType="submit"
            >
              拒绝接单
            </Button>
          ) : null}

          <Button
            size="large"
            onClick={() => {
              setButton(true)
            }}
            type="primary"
            htmlType="submit"
          >
            提交订单
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default index
