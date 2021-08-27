import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Form, Col, Button } from 'antd'
import FormNode from '@/components/FormNode'
import { useStores } from '@/utils/mobx'
import moment from 'moment'

const FormItem = Form.Item

const Title = ({ title }) => (
  <div className={styles.title}>
    <div className={styles.titleLine}></div>
    {title}
  </div>
)

const titleMap = new Map()
titleMap.set(0, '基本信息')
titleMap.set(1, '发单情况')
titleMap.set(2, '加工厂需求')

const IssuerEnterpriseInfo = () => {
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form

  const { controlPanelStore, commonStore } = useStores()
  const { getPurchaserInfo, savePurchaserInfo } = controlPanelStore
  const { dictionary } = commonStore
  const { purchaserRole, factoryYearOutputValue } = dictionary

  const [repeatShow, setRepeatShow] = useState(false)

  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      const res = (await getPurchaserInfo()) || {}
      res.establishedTime = res.establishedTime
        ? moment(res.establishedTime)
        : null
      setInfo(res)
      setRepeatShow(!!res.repeatOrder)
      await resetFields()
    })()
  }, [])

  const basicConfigs = [
    // {
    //   label: '企业LOGO',
    //   field: 'logo',
    //   type: 'img',
    //   maxImgs: 1,
    //   maxSize: 500,
    //   tips: '只能上传jpg/png格式文件，限传一个文件不能超过500kb'
    // },
    {
      label: '企业名称',
      field: 'enterpriseName',
      type: 'text',
      disabled: true,
      required: true,
      placeholder: '请输入企业名称',
      message: '请填写企业名称'
    },
    {
      label: '企业角色',
      field: 'roleCode',
      type: 'select',
      required: true,
      message: '请选择企业角色',
      placeholder: '请选择企业角色',
      options: purchaserRole || []
    },
    {
      label: '成立时间',
      field: 'establishedTime',
      type: 'datePicker',
      placeholder: '请选择成立时间',
      format: 'YYYY'
    },
    {
      label: '年产值',
      field: 'yearOutputValue',
      type: 'select',
      placeholder: '请选择年产值范围',
      options: factoryYearOutputValue || []
    }
  ]

  const issueConfigs = [
    {
      label: '订单品牌',
      field: 'orderBrand',
      placeholder: '请输入订单品牌',
      type: 'text'
    },
    {
      label: '订单品类',
      field: 'orderCategory',
      placeholder: '请输入订单品类',
      type: 'text'
    },
    {
      label: '首次单量（件）',
      field: 'firstOrderNumber',
      placeholder: '请输入首次单量',
      type: 'text'
    },
    {
      label: '单次单量（件）',
      field: 'onceOrderNumber',
      placeholder: '请输入单次单量',
      type: 'text'
    },
    {
      label: '是否返单',
      field: 'repeatOrder',
      type: 'radio',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    },
    {
      label: '反单率（%）',
      field: 'repeatOrderRate',
      type: 'number'
    },
    {
      label: '年发单量（万件）',
      field: 'yearOrderTransaction',
      placeholder: '请输入年发单量',
      type: 'text'
    },
    {
      label: '结算方式',
      field: 'paymentWay',
      placeholder: '请输入结算方式',
      type: 'text'
    },
    {
      label: '其他说明',
      field: 'otherDescription',
      placeholder: '请输入其他说明',
      type: 'textarea'
    }
  ]

  const factoryConfigs = [
    {
      label: '主要需求',
      field: 'mainRequirement',
      placeholder: '请输入主要需求',
      type: 'textarea'
    },
    {
      label: '地域需求',
      field: 'territoryRequirement',
      placeholder: '请输入地域需求',
      type: 'text'
    },
    {
      label: '车位数量',
      field: 'workPositionNumber',
      placeholder: '请输入车位数量',
      type: 'text'
    },
    {
      label: '品质要求',
      field: 'qualityRequirement',
      placeholder: '请输入品质要求',
      type: 'text'
    },
    {
      label: '交期期望',
      field: 'expectDeliveryTime',
      placeholder: '请输入交期期望',
      type: 'text'
    },
    {
      label: '信息化需求',
      field: 'informatizationRequirement',
      placeholder: '请输入信息化需求',
      type: 'text'
    },
    {
      label: '设计需求',
      field: 'designRequirement',
      placeholder: '请输入设计需求',
      type: 'text'
    },
    {
      label: '打版需求',
      field: 'modelRequirement',
      placeholder: '请输入打版需求',
      type: 'text'
    },
    {
      label: '其它需求',
      field: 'otherRequirement',
      placeholder: '请输入其它需求',
      type: 'textarea'
    }
  ]

  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 12
    }
  }

  const submitClick = async () => {
    const values = await validateFields()
    values.establishedTime = values.establishedTime
      ? moment(values.establishedTime).valueOf()
      : null
    values.purchaserId = info.purchaserId
    await savePurchaserInfo(values)
  }

  const valuesChange = (values, _allValues) => {
    const keys = Reflect.ownKeys(values)
    if (keys.includes('repeatOrder')) {
      setRepeatShow(values['repeatOrder'])
    }
  }

  return (
    <div className={styles.container}>
      <Form
        form={form}
        labelAlign={'left'}
        colon={false}
        onValuesChange={valuesChange}
        scrollToFirstError={true}
        onFinish={submitClick}
      >
        {[basicConfigs, issueConfigs, factoryConfigs].map((configs, idx) => {
          return (
            <div className={styles.chunk} key={idx}>
              <Title title={titleMap.get(idx)}></Title>
              {configs.map((item: any) => {
                item.required = item.required ? item.required : false
                const keys = [
                  'type',
                  'options',
                  'keys',
                  'maxImgs',
                  'maxSize',
                  'tips',
                  'placeholder',
                  'disabled'
                ]
                const data: any = {}
                keys.forEach(i => {
                  if (item[i]) {
                    data[i] = item[i]
                  }
                })

                if (item.field === 'repeatOrderRate' && !repeatShow) {
                  return null
                }
                return (
                  <Col key={item.field}>
                    <FormItem
                      name={item.field}
                      label={item.label}
                      rules={[
                        { required: item.required, message: item.message }
                      ]}
                      initialValue={info[item.field]}
                      {...layout}
                    >
                      <FormNode {...data}></FormNode>
                    </FormItem>
                  </Col>
                )
              })}
            </div>
          )
        })}

        <div className={styles.btnBox}>
          <Button
            size={'large'}
            type={'primary'}
            // onClick={submitClick}
            htmlType="submit"
          >
            确认提交
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default IssuerEnterpriseInfo
