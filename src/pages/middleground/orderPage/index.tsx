import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import styles from './index.module.less'
import { Form, Col, Row, Table, Button, message } from 'antd'
import FormNode from '@/components/FormNode'
import { observer, toJS, useStores } from '@/utils/mobx'
import { cloneDeep, isEmpty, debounce, isArray } from 'lodash'
import moment from 'moment'
import { useHistory, useParams } from 'react-router'
import { urlGet } from '@/utils/tool'
import { layout2 } from '../productPage/configs'
import classNames from 'classnames'
import Viewer from 'react-viewer'

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
  'allowClear',
  'width'
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

const OrderTitleMap = new Map()
OrderTitleMap.set('add', '新增订单')
OrderTitleMap.set('edit', '编辑订单')
OrderTitleMap.set('confirm', '确认订单')
OrderTitleMap.set('detail', '订单详情')

export const getViewText = (data: any, value, imgClick?) => {
  if (['select', 'radio'].includes(data.type)) {
    const target = data.options.find(i => i.value === value) || {}
    return target.label || ''
  }
  if (data.type === 'datePicker') {
    return value ? moment(value).format('YYYY-MM-DD') : null
  }
  if (data.type === 'img') {
    if (Array.isArray(value)) {
      return (
        <div className={styles.imgsBox}>
          {value.map((item, idx) => {
            return (
              <img
                key={idx}
                src={item.thumbUrl}
                alt=""
                className={styles.img}
                onClick={() => imgClick(item.thumbUrl)}
              />
            )
          })}
        </div>
      )
    }
  }
  if (data.type === 'annex') {
    if (Array.isArray(value)) {
      return (
        <div className={styles.annexBox}>
          {value.map((item, idx) => {
            if (!item) return
            const arr = `${item.thumbUrl}`.split('__') || []
            const target = arr.length > 0 ? arr[1] : ''
            const text = decodeURI(target)
            return (
              <a key={idx} href={item.thumbUrl} type={'download'}>
                <Icon type={'jack-fujian'} className={styles.icon}></Icon>
                {item.thumbUrl ? text : '--'}
              </a>
            )
          })}
        </div>
      )
    }
  }
  return value
}

interface ProductInfo {
  [key: string]: any
  uid?: string | number
}
const OrderPage = () => {
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form
  const routerParams: { type: string } = useParams()

  const history = useHistory()

  const { orderStore, factoryStore, commonStore } = useStores()
  const {
    productInfo,
    resetProductInfo,
    orderInfo,
    setOrderInfo,
    getSearchEnterprises,
    saveOrder,
    getOrder,
    setOrderGetInfo,
    orderGetInfo,
    initOrderAndProduct,
    setFromOrder,
    factoryConfirmOrder
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

  const confirmConfigs = [
    {
      label: '确认结果',
      required: true,
      message: '请选择确认结果',
      width: 240,
      type: 'select',
      options: [
        { label: '通过', value: 2 },
        { label: '不通过', value: -3 }
      ],
      placeholder: '请选择确认结果',
      field: 'orderStatus',
      span: 20
    },
    {
      label: '附件',
      type: 'annex',
      field: 'urlList',
      maxSize: 20,
      span: 20,
      accept: '.jpg,.png,.jpeg,.rar,.zip,.doc,.docx,.pdf',
      tips: '支持扩展名：.rar .zip .doc .docx .pdf .jpg...'
    },
    {
      label: '不通过原因',
      placeholder: '请输入不通过原因',
      type: 'textarea',
      field: 'passFailReason',
      span: 20
    }
  ]

  const [showInvoiceCount, setShowInvoiceCount] = useState(false)
  const [tableData, setTableData] = useState<Array<ProductInfo>>([{ uid: 0 }])
  const [contactConfigs, setContactConfigs] = useState(contactInitConfigs)
  const [orderId, setOrderId] = useState('') // 订单id
  const [loading, setLoading] = useState(false) // 提交loading
  const [pageType, setPageType] = useState('add') // 页面类型 add edit confirm
  const [factoryOrderStatus, setFactoryOrderStatus] = useState(2) // 加工厂确认订单状态
  const [disabled, setDisabled] = useState(false) // confirm确认订单 detail查看详情时为true
  const [imgVisible, setImgVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    // 编辑 查看时 需要初始化 showInvoiceCount
    const urlParams: { id?: string } = urlGet()
    const { id = '' } = urlParams
    const { type = '' } = routerParams
    const flag = ['detail', 'confirm'].includes(type)
    setDisabled(flag)
    setPageType(type)
    setOrderId(id)
    ;(async () => {
      if (orderGetInfo && id) {
        const order = await getOrder(id)
        if (order) {
          const target = cloneDeep(contactConfigs)
          const factoryInitOptions = [
            {
              label: order?.orderVO?.supplierName,
              value: order?.orderVO?.supplierId
            }
          ]
          target[0].options = factoryInitOptions
          setContactConfigs(target)
        }

        await resetFields()
      }
      if (orderGetInfo && !id) {
        initOrderAndProduct()
        await resetFields()
      }
    })()
  }, [])

  useEffect(() => {
    setShowInvoiceCount(!!orderInfo.addedValueTax)
    // contactInitConfigs
  }, [orderInfo])

  useEffect(() => {
    onSearch('')
    return () => {
      setFromOrder(true)
    }
  }, [])

  useEffect(() => {
    if (isEmpty(productInfo)) {
      setTableData([{ uid: 0 }])
    } else {
      ;(async () => {
        const target: ProductInfo =
          cloneDeep(productInfo) || ({ uid: 0 } as ProductInfo)
        const data =
          (await getProductCategoryName([productInfo.goodsCategoryId])) || []

        if (Array.isArray(data) && data.length > 0) {
          target.goodsCategory = data[0].name
        }
        setTableData([target])
      })()
    }
  }, [productInfo])

  const onSearch = debounce(async value => {
    const target = cloneDeep(contactConfigs) || []
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
    // setFactoryOrderStatus
    const keys = Reflect.ownKeys(values)
    if (keys.includes('addedValueTax')) {
      setShowInvoiceCount(!!values['addedValueTax'])
    }
    if (keys.includes('orderStatus')) {
      setFactoryOrderStatus(values['orderStatus'])
    }
    if (keys.includes('supplierName')) {
      onSearch(values['supplierName'])
    }

    setOrderInfo(allValues)
  }

  const delProduct = () => {
    resetProductInfo()
    setTableData([{ uid: 0 }])
  }

  const submitClick = async status => {
    if (loading) return
    setLoading(true)
    // 确认订单 是否通过
    try {
      // 加工厂确认订单页面
      if (pageType === 'confirm') {
        const values = await validateFields()
        if (orderId) {
          values.id = orderId
        }
        const params = {
          passFailReason: values['passFailReason'],
          status: values['orderStatus'],
          urlList: Array.isArray(values['urlList'])
            ? values['urlList'].map(item => item.thumbUrl)
            : [],
          id: orderId
        }

        const res = await factoryConfirmOrder(params)
        res && back()
        return
      }
    } catch (err) {
    } finally {
      setLoading(false)
    }
    // 保存订单
    try {
      let values
      if (status === -1) {
        const orderName = form.getFieldValue('name')
        if (!orderName) {
          form.scrollToField('name')
          form.validateFields(['name'])
          return
        }
        values = form.getFieldsValue()
      }

      if (status === 1) {
        values = await validateFields()
      }

      values.status = status
      let times = ['materialArrivalTime', 'expectDeliveryTime']
      times.forEach(item => {
        if (values[item]) {
          values[item] = moment(values[item]).valueOf()
        }
      })
      if (orderId) {
        values.id = orderId
      }
      if (pageType === 'add') {
        delete values.id
        delete productInfo.id
      }
      const params = {
        orderVO: values,
        goodsInfoVOList: [toJS(productInfo)]
      }
      // 商品信息为空
      if (
        (status === 1 && isEmpty(params.goodsInfoVOList[0])) ||
        (status === 1 && params.goodsInfoVOList[0].uid === 0)
      ) {
        message.error('请至少填写一条商品信息~')
        return
      }
      // 处理加工厂名称
      const targetEnterPrise =
        contactConfigs[0].options.find(
          item => item.value === values.supplierId
        ) || {}
      params.orderVO.supplierName = targetEnterPrise['label']
      if (
        Array.isArray(params.goodsInfoVOList) &&
        params.goodsInfoVOList.length
      ) {
        // 处理商品附件
        const annex = params.goodsInfoVOList[0].annex
        if (Array.isArray(annex)) {
          params.goodsInfoVOList[0].annex = params.goodsInfoVOList[0].annex.map(
            item => item.thumbUrl
          )
        }
        // 处理商品款图
        const stylePicture = params.goodsInfoVOList[0].stylePicture
        if (Array.isArray(stylePicture)) {
          params.goodsInfoVOList[0].stylePicture =
            params.goodsInfoVOList[0].stylePicture.map(item => item.thumbUrl)
        }
      }
      await saveOrder(params, status)
      history.push(
        pageType === 'add'
          ? '/control-panel/put-manage?key=all&pageNum=1&pageSize=10' // 新增跳到全部页签
          : '/control-panel/put-manage?key=draft&pageNum=1&pageSize=10' // 保存跳到草稿箱
      )
      return
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const imgClick = data => {
    const url = isArray(data) && data.length > 0 ? data[0].thumbUrl : null
    setImgVisible(true)
    setPreviewImage(url)
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
              onClick={() => imgClick(row.stylePicture)}
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
        if (['confirm', 'detail'].includes(pageType)) {
          return (
            <div className={styles.goodsBtns}>
              <span className={styles.goodsAddBtn} onClick={toConfirmProduct}>
                查看
              </span>
            </div>
          )
        }

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

  const toConfirmProduct = () => {
    setOrderGetInfo()
    const url = `/control-panel/product/${pageType}?id=${orderId}`
    history.push(url)
  }

  const toAddProduct = () => {
    setOrderGetInfo()
    resetProductInfo()
    const url = orderId
      ? `/control-panel/product/add?id=${orderId}`
      : `/control-panel/product/add`
    history.push(url)
  }

  const editProduct = () => {
    setOrderGetInfo()
    const url = orderId
      ? `/control-panel/product/edit?id=${orderId}`
      : `/control-panel/product/edit`
    history.push(url)
  }

  const back = async () => {
    await initOrderAndProduct()
    history.goBack()
  }

  return (
    <div className={styles.orderPage}>
      <Form
        form={form}
        labelAlign={'left'}
        colon={false}
        onValuesChange={valuesChange}
        scrollToFirstError={true}
        // onFinish={() => submitClick(1)}
        initialValues={orderInfo}
      >
        <div className={styles.header}>
          <Icon
            onClick={back}
            type={'jack-left-copy'}
            className={styles.headerIcon}
          ></Icon>
          {OrderTitleMap.get(pageType)}
        </div>

        <section className={styles.orderSection}>
          <Title title={'订单信息'}></Title>
          <Row className={styles.row}>
            {orderConfigs.map(item => {
              //orderConfigs form的数据
              const data: any = {} //定义一个空对象
              keys.forEach(i => {
                if (![null, undefined].includes(item[i])) {
                  //当不等于null和undefined
                  data[i] = item[i]
                }
              })
              // 发票点数(%)
              if (item.field === 'invoiceCount' && !showInvoiceCount) {
                return null
              }
              // 时间
              let initialValue = orderInfo[item.field]
              if (
                ['materialArrivalTime', 'expectDeliveryTime'].includes(
                  item.field
                )
              ) {
                initialValue = moment(initialValue)
              }
              if (item.field === 'materialArrivalTime') {
                if (+form.getFieldValue('processType') === 1) {
                  item.required = true
                }
                if (+form.getFieldValue('processType') === 0) {
                  item.required = false
                }
              }
              data.disabled = disabled
              if (disabled) {
                return (
                  <Col key={item.field} span={item.span}>
                    <FormItem label={item.label} {...layout}>
                      <div key={item.field}>
                        {getViewText(item, orderInfo[item.field])}
                      </div>
                    </FormItem>
                  </Col>
                )
              }
              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    // initialValue={orderInfo[item.field]}
                    {...layout}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>

        <section
          className={classNames(
            styles.goodsSection,
            ['confirm', 'detail'].includes(pageType)
              ? styles.grayTableHeader
              : ''
          )}
        >
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

              data.disabled = disabled
              if (disabled) {
                return (
                  <Col key={item.field} span={item.span}>
                    <FormItem label={item.label} {...layout}>
                      <div key={item.field}>
                        {getViewText(item, orderInfo[item.field])}
                      </div>
                    </FormItem>
                  </Col>
                )
              }
              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    // initialValue={orderInfo[item.field]}
                    {...layout}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>

        {pageType === 'confirm' ? (
          <section className={styles.goodsSection}>
            <Title title={'确认订单'}></Title>
            <Row className={styles.row}>
              {/* 根据确认结果显示不同内容 */}
              {(factoryOrderStatus === 2
                ? confirmConfigs.slice(0, 1)
                : confirmConfigs
              ).map(item => {
                const data: any = {}
                keys.forEach(i => {
                  if (![null, undefined].includes(item[i])) {
                    data[i] = item[i]
                  }
                })
                let initialValue = null
                // 初始化确认结果为通过
                if (item.field === 'orderStatus') {
                  initialValue = factoryOrderStatus
                }
                return (
                  <Col key={item.field} span={item.span}>
                    <FormItem
                      name={item.field}
                      label={item.label}
                      rules={[
                        { required: item.required, message: item.message }
                      ]}
                      initialValue={initialValue}
                      {...layout2}
                    >
                      <FormNode {...data}></FormNode>
                    </FormItem>
                  </Col>
                )
              })}
            </Row>
          </section>
        ) : null}

        {pageType === 'confirm' ? (
          <div className={styles.submitBtns}>
            <Button
              type={'primary'}
              ghost
              className={styles.saveBtn}
              onClick={back}
            >
              取消
            </Button>
            <Button
              type={'primary'}
              className={styles.submitBtn}
              htmlType={'submit'}
              onClick={() => submitClick(1)}
            >
              提交
            </Button>
          </div>
        ) : null}
        {['add', 'edit'].includes(pageType) ? (
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
              onClick={() => submitClick(1)}
            >
              提交订单
            </Button>
          </div>
        ) : null}
      </Form>

      <Viewer
        visible={imgVisible}
        noFooter={true}
        onMaskClick={() => {
          setImgVisible(false)
        }}
        onClose={() => {
          setImgVisible(false)
        }}
        images={[{ src: previewImage }]}
      />
    </div>
  )
}

export default observer(OrderPage)
