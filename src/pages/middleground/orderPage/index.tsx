import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import styles from './index.module.less'
import { Form, Col, Row, Table, Button } from 'antd'
import FormNode from '@/components/FormNode'
import { useHistory } from 'react-router'
import { observer, toJS, useStores } from '@/utils/mobx'
import { cloneDeep, isEmpty, debounce } from 'lodash'
import moment from 'moment'

const FormItem = Form.Item

const keys = [
  'type',
  'options',
  'keys',
  'placeholder',
  'disabled',
  'max',
  'min',
  'showSearch',
  'onSearch',
  'filterOption',
  'allowClear'
]

const Footer = ({ data }) => {
  const { totalPrice } = data

  return (
    <div className={styles.tableFooter}>
      合计总价&nbsp;&nbsp;
      {totalPrice >= 0 ? (
        <span className={styles.tableFooterCount}>{totalPrice}&nbsp;元</span>
      ) : null}
    </div>
  )
}

const OrderPage = props => {
  const { title = '新增订单' } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const history = useHistory()
  const { orderStore, factoryStore, commonStore } = useStores()
  const {
    productInfo,
    resetProductInfo,
    orderInfo,
    setOrderInfo,
    getSearchEnterprises,
    saveOrder
  } = orderStore
  const { getProductCategoryName } = factoryStore
  const { dictionary } = commonStore
  const {
    paymentType = [],
    deliveryType = [],
    salesMarket = [],
    orderProcessType = []
  } = toJS(dictionary)

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
      field: 'payType',
      span: 12,
      options: paymentType
    },
    {
      label: '交货方式',
      required: true,
      message: '请选择交货方式',
      placeholder: '请选择交货方式',
      type: 'select',
      field: 'deliveryType',
      span: 12,
      options: deliveryType
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
      options: salesMarket
    },
    {
      label: '加工类型',
      required: true,
      message: '请选择加工类型',
      placeholder: '请选择加工类型',
      type: 'select',
      field: 'processType',
      span: 12,
      options: orderProcessType
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
      required: true,
      message: '请填写发票点数',
      type: 'number',
      max: 100,
      min: 0,
      span: 12
    }
  ]

  const contactInitConfigs = [
    {
      label: '加工厂名称',
      required: true,
      message: '请选择加工厂',
      placeholder: '请选择加工厂',
      type: 'select',
      showSearch: true,
      options: [],
      field: 'supplierId',
      allowClear: true,
      filterOption: false,
      onSearch: event => onSearch(event),
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

  const [showInvoiceCount, setShowInvoiceCount] = useState(false)
  const [tableData, setTableData] = useState([{ uid: 0 }])
  const [contactConfigs, setContactConfigs] = useState(contactInitConfigs)

  useEffect(() => {
    // 编辑 查看时 需要初始化 showInvoiceCount
  }, [])

  useEffect(() => {
    setShowInvoiceCount(!!orderInfo.addedValueTax)
  }, [orderInfo])

  useEffect(() => {
    onSearch('')
  }, [])

  useEffect(() => {
    if (isEmpty(productInfo)) {
      setTableData([{ uid: 0 }])
    } else {
      ;(async () => {
        const target = cloneDeep(productInfo)
        const data =
          (await getProductCategoryName([productInfo.goodsCategoryId])) || []

        if (Array.isArray(data) && data.length > 0) {
          target.goodsCategory = data[0].name
        }
        setTableData([target])
      })()
    }
  }, [])

  const onSearch = debounce(async value => {
    const target = cloneDeep(contactConfigs)
    const data = (await getSearchEnterprises(value)) || {}
    const { records } = data
    if (Array.isArray(records)) {
      records.forEach(item => {
        item.label = item.enterpriseName
        item.value = item.enterpriseId
      })
      target[0].options = records
    }
    setTimeout(() => {
      setContactConfigs(target)
    })
  }, 200)

  const valuesChange = (values, allValues) => {
    const keys = Reflect.ownKeys(values)
    if (keys.includes('addedValueTax')) {
      setShowInvoiceCount(!!values['addedValueTax'])
    }
    if (keys.includes('supplierName')) {
      //
      onSearch(values['supplierName'])
    }

    setOrderInfo(allValues)
  }

  const delProduct = () => {
    resetProductInfo()
    setTableData([{ uid: 0 }])
  }

  const editProduct = () => {
    history.push('/control-panel/product/edit')
  }

  const submitClick = async status => {
    try {
      const values = await validateFields()
      values.status = status
      let times = ['materialArrivalTime', 'expectDeliveryTime']
      times.forEach(item => {
        values[item] = moment(values[item]).valueOf()
      })

      const params = {
        orderVO: values,
        goodsInfoVO: toJS(productInfo)
      }

      // 处理加工厂名称
      const targetEnterPrise =
        contactConfigs[0].options.find(
          item => item.value === values.supplierId
        ) || {}
      params.orderVO.supplierName = targetEnterPrise['label']
      // 处理商品附件
      params.goodsInfoVO.annex = params.goodsInfoVO.annex.map(
        item => item.thumbUrl
      )
      // 处理商品款图
      params.goodsInfoVO.stylePicture = params.goodsInfoVO.stylePicture.map(
        item => item.thumbUrl
      )
      console.log(
        '🚀 ~ file: index.tsx ~ line 275 ~ submitClick ~ params',
        params
      )
      await saveOrder(params, status)
      history.goBack()
    } catch (err) {
      console.log(err)
    }
  }

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
      dataIndex: 'name',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '商品品类',
      dataIndex: 'goodsCategory',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '图片',
      align: 'center',
      render: (_val, row) => {
        if (Array.isArray(row.stylePicture) && row.stylePicture.length) {
          return (
            <img
              src={row.stylePicture[0].thumbUrl}
              alt=""
              className={styles.tableImg}
            />
          )
        }
        return '-'
      }
    },
    {
      title: 'SPU编号',
      dataIndex: 'spuCode',
      align: 'center',
      render: val => (val ? val : '-')
    },
    {
      title: '数量(件)',
      dataIndex: 'quantity',
      align: 'center',
      render: (_val, row) => {
        const total =
          row.skuVOList &&
          row.skuVOList.reduce((prev, item) => {
            return prev + +item.quantity
          }, 0)
        return total ? total : '-'
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (_val, row) => {
        if (row.uid) {
          return (
            <div className={styles.goodsBtns}>
              <span className={styles.goodsBtn} onClick={delProduct}>
                删除
              </span>
              <div className={styles.line}></div>
              <span className={styles.goodsBtn} onClick={editProduct}>
                修改
              </span>
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
        onFinish={() => submitClick(1)}
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
              let initialValue = orderInfo[item.field]
              if (
                ['materialArrivalTime', 'expectDeliveryTime'].includes(
                  item.field
                )
              ) {
                initialValue = moment(initialValue)
              }

              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    initialValue={orderInfo[item.field]}
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
            footer={() => <Footer data={tableData[0]}></Footer>}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowKey={'uid'}
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
                    initialValue={orderInfo[item.field]}
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
          <Button
            type={'primary'}
            ghost
            className={styles.saveBtn}
            onClick={() => submitClick(-1)}
          >
            保存
          </Button>
          <Button
            type={'primary'}
            className={styles.submitBtn}
            htmlType={'submit'}
          >
            提交订单
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default observer(OrderPage)
