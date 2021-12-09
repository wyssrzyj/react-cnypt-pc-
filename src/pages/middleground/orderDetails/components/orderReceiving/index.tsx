import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'
import { useHistory } from 'react-router-dom'

function index({ stated }) {
  const { push } = useHistory()
  const { id, supplierInquiryId } = stated
  const { demandListStore } = useStores()
  const { orderQuantity, submitRequisition, getInquiryQuote } = demandListStore

  const [form] = Form.useForm()
  const { resetFields, validateFields } = form

  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 12
    }
  }

  const [initialValues, setInitialValues] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      if (!supplierInquiryId) return
      const res = await getInquiryQuote({ supplierInquiryId })

      setInitialValues(res)
      resetFields()
    })()
  }, [])
  let timer
  const onFinish = async flag => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      try {
        if (flag) {
          const values = await validateFields()
          const res = await orderQuantity({
            goodsNum: values.receiveGoodsNum,
            id: id
          })

          if (res.code === 200) {
            const submitRes = await submitRequisition({
              ...values,
              purchaserInquiryId: id,
              supplierInquiryId: supplierInquiryId,
              status: 2
            })

            if (submitRes.code === 200) {
              push({
                pathname: '/control-panel/orderManagement/receiveOrder'
              })
            }
          }
        }
      } catch (err) {}
    }, 1000)
  }

  return (
    <div>
      <Form
        name="basic"
        // labelCol={{ span:  }}
        // wrapperCol={{ span: 16 }}
        form={form}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Row className={styles.quoteInfo}>
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
        <Row className={styles.receiveGoodsNum}>
          <Col span={12}>
            <Form.Item
              {...layout}
              label="可接订单数"
              name="receiveGoodsNum"
              rules={[
                { pattern: /^[0-9]*$/, message: '请输入数字' },
                { required: true, message: `请输入可接订单数` }
              ]}
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

        <div className={styles.noBtn}>
          {/* {source == 2 ? null : (
            <Button ghost type="primary" onClick={() => onFinish(false)}>
              拒绝接单
            </Button>
          )} */}
          <Form.Item>
            <Button
              className={styles.placeOrder}
              onClick={() => onFinish(true)}
              type="primary"
              htmlType="submit"
            >
              提交订单
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default index
