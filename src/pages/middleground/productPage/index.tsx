import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import { Form, Col, Row, Table, Input, Button, Select } from 'antd'
import FormNode from '@/components/FormNode'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'
import { useStores, observer, toJS } from '@/utils/mobx'
import ProductModal from './productModal'
import { getUId, urlGet } from '@/utils/tool'
import {
  keys,
  layout,
  layout2,
  Material,
  otherConfigs,
  Product,
  productConfigs,
  RequiredTitle,
  TabelTitle
} from './configs'

const FormItem = Form.Item
const { Option } = Select

const pageTitleMap = new Map()
pageTitleMap.set('add', '新增商品')
pageTitleMap.set('edit', '编辑商品')
pageTitleMap.set('detail', '商品详情')
pageTitleMap.set('confirm', '商品详情')

const ProductPage = () => {
  const [form] = Form.useForm()
  const { resetFields } = form
  const history = useHistory()
  const routerParams: { type?: string } = useParams()

  const { orderStore, commonStore, factoryStore } = useStores()
  const { setProductInfo, productInfo, setFromProduct, getOrder, fromOrder } =
    orderStore
  const { dictionary } = commonStore
  const { productCategory, productCategoryList } = factoryStore

  const {
    supplyType = [],
    procedureType = [],
    materialType = []
  } = toJS(dictionary)

  const [pageType, setPageType] = useState<string>('add')
  const [productData, setProductData] = useState<Array<Partial<Product>>>([])
  const [productModal, setProductModal] = useState(false)
  const [productModalType, setProductModalType] = useState('color')
  const [productDataError, setProductDataError] = useState(false)
  const [productErrorMsg] = useState('请检查输入的商品规格内容， 最少一条数据')
  const [materialData, setMaterialData] = useState<Array<Partial<Material>>>([])
  const [count, setCount] = useState<number>(0) // 产品总数
  const [amount, setAmount] = useState<number>(0) // 产品总价

  useEffect(() => {
    setFromProduct(false)
    // 编辑 查看时 需要初始化 showInvoiceCount
    const urlParams: { id?: string } = urlGet()
    const { id = '' } = urlParams
    if (id && pageType !== 'add' && !fromOrder) {
      ;(async () => {
        await getOrder(id)
        await resetFields()
      })()
    }
    return () => {
      setFromProduct(true)
    }
  }, [pageType])

  useEffect(() => {
    const { type } = routerParams
    setPageType(type)
    if (type !== 'add') {
      setProductData(productInfo.skuVOList)
      setMaterialData(productInfo.goodsMaterialInfoList)
    }
  }, [productInfo])

  useEffect(() => {
    ;(async () => {
      await productCategory()
    })()
  }, [])

  useEffect(() => {
    if (Array.isArray(productData)) {
      const totalCount = productData.reduce((prev, item) => {
        return prev + (item.quantity ? +item.quantity : 0)
      }, 0)
      const totalAmount = productData.reduce((prev, item) => {
        return (
          prev +
          (item.price ? +item.price : 0) * (item.quantity ? +item.quantity : 0)
        )
      }, 0)

      setCount(totalCount)
      setAmount(totalAmount)
    }
  }, [productData])

  const valuesChange = _values => {}

  const back = () => {
    history.goBack()
  }

  const productValuesChange = (event, field, index) => {
    const targetData = cloneDeep(productData)
    targetData[index][field] = event.target.value
    if (['price', 'quantity'].includes(field) && isNaN(event.target.value)) {
      targetData[index][field] = null
    }
    setProductData(targetData)
  }

  const productColumns: any = [
    {
      title: 'SKU编号',
      align: 'center',
      dataIndex: 'skuCode',
      width: 210,
      render: (val, _row, idx) => (
        <Input
          placeholder={pageType === 'confirm' ? '' : '请输入SKU编号'}
          value={val}
          onChange={event => productValuesChange(event, 'skuCode', idx)}
          disabled={pageType === 'confirm'}
        ></Input>
      )
    },
    {
      title: (
        <TabelTitle
          title={'颜色'}
          callback={() => showProductModal('color')}
          disabled={pageType === 'confirm'}
        ></TabelTitle>
      ),
      align: 'center',
      dataIndex: 'color',
      width: 210,
      render: (val, _row, idx) => (
        <Input
          placeholder={pageType === 'confirm' ? '' : '请输入颜色'}
          value={val}
          onChange={event => productValuesChange(event, 'color', idx)}
          disabled={pageType === 'confirm'}
        ></Input>
      )
    },
    {
      title: (
        <TabelTitle
          title={'尺寸'}
          callback={() => showProductModal('size')}
          disabled={pageType === 'confirm'}
        ></TabelTitle>
      ),
      align: 'center',
      dataIndex: 'size',
      width: 210,
      render: (val, _row, idx) => (
        <Input
          placeholder={pageType === 'confirm' ? '' : '请输入尺寸'}
          value={val}
          onChange={event => productValuesChange(event, 'size', idx)}
          disabled={pageType === 'confirm'}
        ></Input>
      )
    },
    {
      title: <RequiredTitle title={'数量(件)'}></RequiredTitle>,
      align: 'center',
      dataIndex: 'quantity',
      width: 210,
      render: (val, _row, idx) => (
        <Input
          placeholder={pageType === 'confirm' ? '' : '请输入数量'}
          value={val}
          onChange={event => productValuesChange(event, 'quantity', idx)}
          disabled={pageType === 'confirm'}
        ></Input>
      )
    },
    {
      title: <RequiredTitle title={'单价'}></RequiredTitle>,
      align: 'center',
      dataIndex: 'price',
      width: 210,
      render: (val, _row, idx) => (
        <Input
          placeholder={pageType === 'confirm' ? '' : '请输入单价'}
          value={val}
          onChange={event => productValuesChange(event, 'price', idx)}
          disabled={pageType === 'confirm'}
        ></Input>
      )
    },
    {
      title: <TabelTitle callback={() => showProductModal('add')} />,
      align: 'center',
      dataIndex: 'edit',
      render: (_val, _row, idx) => (
        <Icon
          type={'jack-del-icon'}
          className={styles.delIcon}
          onClick={() => delProduct(idx)}
        ></Icon>
      )
    }
  ]

  const materialValuesChange = (event, field, index) => {
    let value = ['supplyType', 'materialType'].includes(field)
      ? event
      : event.target.value
    const targetData = cloneDeep(materialData)
    targetData[index][field] = value
    setMaterialData(targetData)
  }

  const addMaterial = () => {
    const targetData = cloneDeep(materialData) || []
    targetData.push({ uid: getUId() })
    setMaterialData(targetData)
  }

  const delMaterial = index => {
    const targetData = materialData.filter((_item, idx) => idx !== index)
    setMaterialData(targetData)
  }

  const materialOptions = materialType

  const materialColumns: any = [
    {
      title: '物料类型',
      dataIndex: 'materialType',
      width: 265,
      align: 'center',
      render: (value, _row, idx) => {
        return (
          <Select
            value={value}
            style={{ width: '100%', textAlign: 'initial' }}
            placeholder={'请选择物料类型'}
            onChange={val => materialValuesChange(val, 'materialType', idx)}
          >
            {materialOptions.map(option => (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 265,
      align: 'center',
      render: (value, _row, idx) => {
        return (
          <Input
            placeholder={'请输入名称'}
            value={value}
            onChange={event => materialValuesChange(event, 'name', idx)}
          ></Input>
        )
      }
    },
    {
      title: '其他说明',
      dataIndex: 'remark',
      width: 265,
      align: 'center',
      render: (value, _row, idx) => {
        return (
          <Input
            placeholder={'请输入其他说明'}
            value={value}
            onChange={event => materialValuesChange(event, 'remark', idx)}
          ></Input>
        )
      }
    },
    {
      title: '供应类型',
      dataIndex: 'supplyType',
      width: 265,
      align: 'center',
      render: (value, _row, idx) => {
        return (
          <Select
            value={value}
            placeholder={'请选择供应类型'}
            style={{ width: '100%', textAlign: 'initial' }}
            onChange={val => materialValuesChange(val, 'supplyType', idx)}
          >
            {supplyType.map(option => (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: <TabelTitle callback={addMaterial} />,
      align: 'center',
      dataIndex: 'edit',
      width: 75,
      render: (_val, _row, idx) => (
        <Icon
          type={'jack-del-icon'}
          className={styles.delIcon}
          onClick={() => delMaterial(idx)}
        ></Icon>
      )
    }
  ]

  const showProductModal = type => {
    if (type === 'add') {
      const dataList = cloneDeep(productData)
      const target: Partial<Product> = {}
      target.uid = getUId()
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

  const productModalSubmit = value => {
    const dataList = cloneDeep(productData) || []
    const target =
      dataList.length > 0 ? cloneDeep(dataList[dataList.length - 1]) : {}
    target[productModalType] = value
    target['skuCode'] = ''
    target['quantity'] = ''
    target['price'] = ''
    target.uid = getUId()
    const res = [].concat(dataList, target)
    setProductData(res)
    setProductModal(f => !f)
  }

  const submitClick = async () => {
    if (pageType === 'confrim') {
      back()
      return
    }
    let flag
    if (productData.length) {
      flag = !productData.every(item => {
        return item.price > 0 && item.quantity > 0
      })
    } else {
      flag = true
    }
    setProductDataError(flag)

    try {
      const values = await form.validateFields()

      const info = {
        skuVOList: productData,
        goodsMaterialInfoList: materialData,
        totalAmount: count, // 接口 产品总数
        totalPrice: amount, // 接口 产品总价
        uid: getUId(),
        ...values
      }
      if (productInfo.id) {
        info.id = productInfo.id
      }
      setProductInfo(!flag ? info : {})
      back()
    } catch (err) {
      console.log(err)
    }
  }

  const dealTypeData = data => {
    data.forEach(item => {
      item.label = item.name
      item.value = item.id
      if (Array.isArray(item.children) && item.children.length) {
        dealTypeData(item.children)
      }
    })
    return data
  }

  return (
    <div className={styles.productPage}>
      {productModal ? (
        <ProductModal
          callback={showProductModal}
          visible={productModal}
          type={productModalType}
          onOk={productModalSubmit}
        ></ProductModal>
      ) : null}

      <Form
        form={form}
        labelAlign={'left'}
        colon={false}
        onValuesChange={valuesChange}
        scrollToFirstError={true}
        onFinish={submitClick}
        initialValues={productInfo}
      >
        <div className={styles.header}>
          <Icon
            onClick={back}
            type={'jack-left-copy'}
            className={styles.headerIcon}
          ></Icon>
          {pageTitleMap.get(pageType)}
        </div>

        <section className={styles.productSection}>
          <Title title={'商品信息'}></Title>
          <Row className={styles.row}>
            {productConfigs.map(item => {
              if (item.field === 'goodsCategoryId') {
                item.treeData = dealTypeData(productCategoryList)
              }
              if (item.field === 'procedureType') {
                item.options = procedureType
              }
              const data: any = {}
              keys.forEach(i => {
                if (![null, undefined].includes(item[i])) {
                  data[i] = item[i]
                }
              })
              data.disabled = pageType === 'confirm'
              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    // initialValue={productInfo[item.field]}
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
            columns={
              pageType === 'confirm'
                ? productColumns.slice(0, productColumns.length - 1)
                : productColumns
            }
            dataSource={productData}
            rowKey={'uid'}
          ></Table>
          {productDataError ? (
            <div className={styles.productErrorMsg}>{productErrorMsg}</div>
          ) : null}

          <div className={styles.productFooter}>
            <div className={styles.footerItem}>
              合计数量 <span className={styles.footerNumber}>{count}</span>件
            </div>
            <div className={styles.footerItem}>
              合计总价 <span className={styles.footerNumber}>{amount}</span>元
            </div>
          </div>
        </section>

        <section className={styles.productSection}>
          <Title title={'物料信息'}></Title>
          <Table
            pagination={false}
            columns={
              pageType === 'confirm'
                ? materialColumns.slice(0, materialColumns.length - 1)
                : materialColumns
            }
            dataSource={materialData}
            rowKey={'uid'}
          ></Table>
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
              data.disabled = pageType === 'confirm'
              return (
                <Col key={item.field} span={item.span}>
                  <FormItem
                    name={item.field}
                    label={item.label}
                    rules={[{ required: item.required, message: item.message }]}
                    // initialValue={productInfo[item.field]}
                    {...layout2}
                  >
                    <FormNode {...data}></FormNode>
                  </FormItem>
                </Col>
              )
            })}
          </Row>
        </section>
        {pageType === 'confirm' ? (
          <Button
            type={'primary'}
            className={styles.saveBtn}
            htmlType={'submit'}
          >
            返回
          </Button>
        ) : (
          <Button
            type={'primary'}
            className={styles.saveBtn}
            htmlType={'submit'}
          >
            保存商品
          </Button>
        )}
      </Form>
    </div>
  )
}
export default observer(ProductPage)
