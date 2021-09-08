import React, { useState } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import { Form, Col, Row, Table, Input, Modal, Button } from 'antd'
import FormNode from '@/components/FormNode'
import { useHistory } from 'react-router'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'
import { useStores, observer } from '@/utils/mobx'

const FormItem = Form.Item
const { TextArea } = Input

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

const TabelTitle = props => {
  const { title, callback } = props
  const addClick = () => {
    callback && callback()
  }

  return (
    <div className={styles.tableTitle}>
      {title ? title : null}
      <Icon
        type={'jack-del'}
        onClick={addClick}
        className={styles.tableIcon}
      ></Icon>
    </div>
  )
}

const RequiredTitle = props => {
  const { title } = props

  return <div className={styles.requiredTitle}>{title}</div>
}

const productModalTexts = new Map()
productModalTexts.set('color', { title: '添加颜色', label: '颜色' })
productModalTexts.set('size', { title: '添加尺寸', label: '尺寸' })

const ProductPage = props => {
  const { title = '新增商品' } = props
  const [form] = Form.useForm()
  const history = useHistory()

  const { orderStore } = useStores()
  const { productInfo } = orderStore

  const [productData, setProductData] = useState([])
  const [productModal, setProductModal] = useState(false)
  const [productModalType, setProductModalType] = useState('color')
  const [productModalValue, setProductModalValue] = useState('')
  const [productDataError, setProductDataError] = useState(false)

  const productConfigs = [
    {
      label: '商品名称',
      required: true,
      message: '请输入商品名称',
      placeholder: '请输入商品名称',
      field: 'name',
      span: 12
    },
    {
      label: '商品品类',
      required: true,
      message: '请选择商品品类',
      placeholder: '请选择商品品类',
      type: 'select',
      options: [
        { label: '品类一', value: 1 },
        { label: '品类二', value: 2 }
      ],
      field: 'goodsCategoryId',
      span: 12
    },
    {
      label: 'SPU编码',
      placeholder: '请输入SPU编码',
      field: 'spuCode',
      span: 12
    },
    {
      label: '生产方式',
      required: true,
      message: '请选择生产方式',
      placeholder: '请选择生产方式',
      type: 'select',
      options: [
        { label: '方式一', value: 1 },
        { label: '方式二', value: 2 }
      ],
      field: 'procedureType',
      span: 12
    }
  ]

  const otherConfigs = [
    {
      label: '款图',
      field: 'imgs',
      maxImgs: 10,
      required: true,
      accept: '.jpg,.png,.jpeg',
      message: '请上传款图',
      maxSize: 500,
      span: 20,
      type: 'img',
      tips: '上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件'
    },
    {
      label: '附件',
      type: 'annex',
      field: 'annex',
      maxSize: 20,
      span: 20,
      accept: '.jpg,.png,.jpeg,.rar,.zip,.doc,.docx,.pdf',
      tips: '支持扩展名：.rar .zip .doc .docx .pdf .jpg...'
    },
    {
      label: '备注说明',
      type: 'textarea',
      field: 'remark',
      rows: 4,
      span: 20
    }
  ]

  const layout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 12
    }
  }

  const layout2 = {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 17
    }
  }

  const valuesChange = _values => {
    // const keys = Reflect.ownKeys(values)
  }

  const backToOrder = () => {
    history.goBack()
  }

  const productValuesChange = (event, field, index) => {
    const targetData = cloneDeep(productData)
    targetData[index][field] = event.target.value
    setProductData(targetData)
  }

  const productColumns: any = [
    {
      title: 'SKU编号',
      align: 'center',
      dataIndex: 'skuCode',
      width: 210,
      render: (val, row, idx) => (
        <Input
          placeholder={'请输入SKU编号'}
          value={val}
          onChange={event => productValuesChange(event, 'skuCode', idx)}
        ></Input>
      )
    },
    {
      title: (
        <TabelTitle
          title={'颜色'}
          callback={() => showProductModal('color')}
        ></TabelTitle>
      ),
      align: 'center',
      dataIndex: 'color',
      width: 210,
      render: (val, row, idx) => (
        <Input
          placeholder={'请输入颜色'}
          value={val}
          onChange={event => productValuesChange(event, 'color', idx)}
        ></Input>
      )
    },
    {
      title: (
        <TabelTitle
          title={'尺寸'}
          callback={() => showProductModal('size')}
        ></TabelTitle>
      ),
      align: 'center',
      dataIndex: 'size',
      width: 210,
      render: (val, row, idx) => (
        <Input
          placeholder={'请输入尺寸'}
          value={val}
          onChange={event => productValuesChange(event, 'size', idx)}
        ></Input>
      )
    },
    {
      title: <RequiredTitle title={'数量(件)'}></RequiredTitle>,
      align: 'center',
      dataIndex: 'count',
      width: 210,
      render: (val, row, idx) => (
        <Input
          placeholder={'请输入数量'}
          value={val}
          onChange={event => productValuesChange(event, 'count', idx)}
        ></Input>
      )
    },
    {
      title: <RequiredTitle title={'单价'}></RequiredTitle>,
      align: 'center',
      dataIndex: 'amount',
      width: 210,
      render: (val, row, idx) => (
        <Input
          placeholder={'请输入单价'}
          value={val}
          onChange={event => productValuesChange(event, 'amount', idx)}
        ></Input>
      )
    },
    {
      title: <TabelTitle callback={() => showProductModal('add')} />,
      align: 'center',
      dataIndex: 'edit',
      render: (val, row, idx) => (
        <Icon
          type={'jack-del-icon'}
          className={styles.delIcon}
          onClick={() => delProduct(idx)}
        ></Icon>
      )
    }
  ]

  const showProductModal = type => {
    if (type === 'add') {
      const dataList = cloneDeep(productData)
      const target =
        dataList.length > 0 ? cloneDeep(dataList[dataList.length - 1]) : {}
      target[productModalType] = productModalValue
      const res = [].concat(dataList, target)
      setProductData(res)
      return
    }

    setProductModal(f => !f)
    type && setProductModalType(type)
  }

  const delProduct = index => {
    const targetList = productData.filter((_item, idx) => idx !== index)
    setProductData(targetList)
  }

  const productModalValueChange = event => {
    const { value } = event.target
    setProductModalValue(value)
  }

  const productModalSubmit = () => {
    const dataList = cloneDeep(productData)
    const target =
      dataList.length > 0 ? cloneDeep(dataList[dataList.length - 1]) : {}
    target[productModalType] = productModalValue
    target['skuCode'] = ''
    target['count'] = ''
    target['amount'] = ''
    const res = [].concat(dataList, target)
    setProductData(res)
    setProductModal(f => !f)
  }

  const submitClick = async () => {
    try {
      const values = await form.validateFields()
      console.log(
        '🚀 ~ file: index.tsx ~ line 284 ~ saveProduct ~ values',
        values
      )
      const flag = productData.every(item => {
        return item.count > 0 && item.amount > 0
      })
      setProductDataError(flag)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.productPage}>
      {productModal ? (
        <Modal
          visible={productModal}
          centered
          maskClosable={false}
          onCancel={showProductModal}
          title={false}
          footer={false}
        >
          <Title
            title={productModalTexts.get(productModalType).title}
            size={18}
          ></Title>
          <div className={styles.productModalContent}>
            <span className={styles.label}>
              {productModalTexts.get(productModalType).label}
            </span>
            <TextArea rows={4} onChange={productModalValueChange}></TextArea>
          </div>
          <div className={styles.productModalBtns}>
            <Button
              type={'primary'}
              ghost
              className={styles.tableModalBtn}
              onClick={showProductModal}
            >
              取消
            </Button>
            <Button
              type={'primary'}
              className={styles.tableModalBtn}
              onClick={productModalSubmit}
            >
              确定
            </Button>
          </div>
        </Modal>
      ) : null}

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
            onClick={backToOrder}
            type={'jack-left-copy'}
            className={styles.headerIcon}
          ></Icon>
          {title}
        </div>

        <section className={styles.productSection}>
          <Title title={'商品信息'}></Title>
          <Row className={styles.row}>
            {productConfigs.map(item => {
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

        <section className={styles.productSection}>
          <Title title={'商品规格'}></Title>
          <Table
            pagination={false}
            columns={productColumns}
            dataSource={productData}
          ></Table>

          {productDataError ? (
            <div>请检查输入的商品规内容， 最少一条数据</div>
          ) : null}
        </section>

        <section className={styles.productSection}>
          <Title title={'物料信息'}></Title>
        </section>

        <section className={styles.productSection}>
          <Title title={'其它'}></Title>
          <Row className={styles.row}>
            {otherConfigs.map(item => {
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
                    {...layout2}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>

        <Button type={'primary'} className={styles.saveBtn} htmlType={'submit'}>
          保存商品
        </Button>
      </Form>
    </div>
  )
}

export default observer(ProductPage)
