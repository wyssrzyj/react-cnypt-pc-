import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import styles from './index.module.less'
import { Form, Col, Row, Table, Button } from 'antd'
import FormNode from '@/components/FormNode'
import { useHistory } from 'react-router'

const FormItem = Form.Item

const keys = [
  'type',
  'options',
  'keys',
  'maxImgs',
  'maxSize',
  'tips',
  'placeholder',
  'disabled',
  'max',
  'min'
]

const Footer = ({ data }) => {
  const { count } = data
  return (
    <div className={styles.tableFooter}>
      合计总价&nbsp;&nbsp;
      {count >= 0 ? (
        <span className={styles.tableFooterCount}>{count}&nbsp;元</span>
      ) : null}
    </div>
  )
}

const OrderPage = props => {
  const { title = '新增订单' } = props
  const [form] = Form.useForm()
  const history = useHistory()

  const [showInvoiceCount, setShowInvoiceCount] = useState(false)

  useEffect(() => {
    // 编辑 查看时 需要初始化 showInvoiceCount
  }, [])

  const orderConfigs = [
    {
      label: '订单名称',
      required: true,
      message: '请输入订单名称',
      placeholder: '请输入订单名称',
      field: 'name',
      span: 12
    },
    {
      label: '付款方式',
      required: true,
      message: '请选择付款方式',
      placeholder: '请选择付款方式',
      type: 'select',
      field: 'payWay',
      span: 12,
      options: [
        { label: '现金', value: 1 },
        { label: '支付宝', value: 2 }
      ]
    },
    {
      label: '交货方式',
      required: true,
      message: '请选择交货方式',
      placeholder: '请选择交货方式',
      type: 'select',
      field: 'deliveryType',
      span: 12,
      options: [
        { label: '自取', value: 1 },
        { label: '快递', value: 2 }
      ]
    },
    {
      label: '收货地址',
      placeholder: '请输入收货地址',
      field: 'deliveryAddress',
      span: 12
    },
    {
      label: '销售市场',
      required: true,
      message: '请选择销售市场',
      placeholder: '请选择销售市场',
      type: 'select',
      field: 'salesMarketType',
      span: 12,
      options: [
        { label: '华东', value: 1 },
        { label: '华南', value: 2 }
      ]
    },
    {
      label: '加工类型',
      required: true,
      message: '请选择加工类型',
      placeholder: '请选择加工类型',
      type: 'select',
      field: 'processType',
      span: 12,
      options: [
        { label: '清加工', value: 1 },
        { label: 'ODM', value: 2 }
      ]
    },
    {
      label: '物料到货时间',
      placeholder: '请选择物料到货时间',
      type: 'datePicker',
      field: 'materialArrivalTime',
      span: 12
    },
    {
      label: '期望收货时间',
      required: true,
      message: '请选择期望收货时间',
      placeholder: '请选择期望收货时间',
      type: 'datePicker',
      field: 'expectDeliveryTime',
      span: 12
    },
    {
      label: '增值税发票',
      field: 'addedValueTax',
      required: true,
      message: '请选择是否有增值税发票',
      type: 'radio',
      span: 12,
      options: [
        { label: '有', value: 1 },
        { label: '无', value: 0 }
      ]
    },
    {
      label: '发票点数(%)',
      field: 'invoiceCount',
      placeholder: '请填写发票点数',
      type: 'number',
      max: 100,
      min: 0,
      span: 12
    }
  ]

  const contactConfigs = [
    {
      label: '加工厂名称',
      required: true,
      message: '请选择加工厂',
      placeholder: '请选择加工厂',
      type: 'select',
      options: [],
      field: 'supplierName',
      span: 12
    },
    {
      label: '加工厂对接人',
      placeholder: '请输入对接人姓名',
      field: 'supplierContactPerson',
      span: 12
    },
    {
      label: '订单创建人',
      required: true,
      placeholder: '请输入订单创建人',
      message: '请输入订单创建人',
      field: 'orderCreator',
      span: 12
    },
    {
      label: '对接人手机号',
      placeholder: '请输入对接人手机号',
      field: 'contactPersonMobile',
      span: 12
    },
    {
      label: '创建人手机号',
      required: true,
      placeholder: '请输入创建人手机号',
      message: '请输入创建人手机号',
      field: 'orderCreatorMobile',
      span: 12
    }
  ]

  const valuesChange = values => {
    const keys = Reflect.ownKeys(values)
    if (keys.includes('addedValueTax')) {
      setShowInvoiceCount(!!values['addedValueTax'])
    }
  }

  const submitClick = () => {}

  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 12
    }
  }

  const columns: any[] = [
    {
      title: '商品名称',
      dataIndex: 'a',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '商品品类',
      dataIndex: 'b',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '图片',
      dataIndex: 'c',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: 'SPU编号',
      dataIndex: 'd',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '数量(件)',
      dataIndex: 'e',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '操作',
      dataIndex: 'f',
      align: 'center',
      render: (_val, row) => {
        if (row.id > 0) {
          return (
            <div className={styles.goodsBtns}>
              <span className={styles.goodsBtn}>删除</span>
              <div className={styles.line}></div>
              <span className={styles.goodsBtn}>修改</span>
            </div>
          )
        }
        return (
          <div className={styles.goodsBtns}>
            <span className={styles.goodsAddBtn} onClick={toAddProduct}>
              新增
            </span>
          </div>
        )
      }
    }
  ]

  const dataSource = [{ id: -1 }]

  const toAddProduct = () => {
    history.push('/control-panel/product/add')
  }

  const backToBusiness = () => {
    history.push('/control-panel/put-manage')
  }

  return (
    <div className={styles.orderPage}>
      <Form
        form={form}
        labelAlign={'left'}
        colon={false}
        onValuesChange={valuesChange}
        scrollToFirstError={true}
        onFinish={submitClick}
      >
        <div className={styles.header}>
          <Icon
            onClick={backToBusiness}
            type={'jack-left-copy'}
            className={styles.headerIcon}
          ></Icon>
          {title}
        </div>

        <section className={styles.orderSection}>
          <Title title={'订单信息'}></Title>
          <Row className={styles.row}>
            {orderConfigs.map(item => {
              const data: any = {}
              keys.forEach(i => {
                if (![null, undefined].includes(item[i])) {
                  data[i] = item[i]
                }
              })
              if (item.field === 'invoiceCount' && !showInvoiceCount) {
                return null
              }
              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    {...layout}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>

        <section className={styles.goodsSection}>
          <Title title={'商品信息'}></Title>
          <Table
            footer={() => <Footer data={dataSource[0]}></Footer>}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowKey={'id'}
          />
        </section>

        <section className={styles.goodsSection}>
          <Title title={'联系方式'}></Title>
          <Row className={styles.row}>
            {contactConfigs.map(item => {
              const data: any = {}
              keys.forEach(i => {
                if (![null, undefined].includes(item[i])) {
                  data[i] = item[i]
                }
              })

              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    {...layout}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>

        <div className={styles.submitBtns}>
          <Button type={'primary'} ghost className={styles.saveBtn}>
            保存
          </Button>
          <Button type={'primary'} className={styles.submitBtn}>
            提交订单
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default OrderPage
