import React from 'react'
import styles from './index.module.less'
import { Form, Col, Button } from 'antd'
import FormNode from '@/components/FormNode'

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
  const { validateFields } = form

  const basicConfigs = [
    {
      label: '企业LOGO',
      field: 'logo',
      type: 'img',
      maxImgs: 1,
      maxSize: 500,
      tips: '只能上传jpg/png格式文件，限传一个文件不能超过500kb'
    },
    {
      label: '企业名称',
      field: 'enterpriseName',
      type: 'text',
      required: true,
      placeholder: '请输入企业名称',
      message: '请填写企业名称'
    },
    {
      label: '企业角色',
      field: 'enterpriseRole',
      type: 'select',
      required: true,
      message: '请选择企业角色',
      placeholder: '请选择企业角色',
      options: [
        {
          label: '品牌商',
          value: 1
        },
        {
          label: '贸易商',
          value: 2
        },
        {
          label: '国内电商',
          value: 3
        },
        {
          label: '网红直播',
          value: 4
        },
        {
          label: '跨境电商',
          value: 5
        },
        {
          label: '其他',
          value: 6
        }
      ]
    },
    {
      label: '成立时间',
      field: 'createTime',
      type: 'datePicker',
      placeholder: '请选择成立时间',
      format: 'YYYY'
    },
    {
      label: '年产值',
      field: 'outputValue',
      type: 'select',
      placeholder: '请选择年产值范围',
      options: [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
        { label: 'c', value: 3 }
      ]
    }
  ]

  const issueConfigs = [
    {
      label: '订单品牌',
      field: 'a',
      placeholder: '请输入订单品牌',
      type: 'text'
    },
    {
      label: '订单品类',
      field: 'b',
      placeholder: '请输入订单品类',
      type: 'text'
    },
    {
      label: '首次单量（件）',
      field: 'c',
      placeholder: '请输入首次单量',
      type: 'text'
    },
    {
      label: '单次单量（件）',
      field: 'd',
      placeholder: '请输入单次单量',
      type: 'text'
    },
    {
      label: '是否反单',
      field: 'e',
      type: 'radio',
      options: [
        { label: '是', value: true },
        { label: '否', value: false }
      ]
    },
    {
      label: '反单率（%）',
      field: 'f',
      type: 'number'
    },
    {
      label: '年发单量（万件）',
      field: 'h',
      placeholder: '请输入年发单量',
      type: 'text'
    },
    {
      label: '结算方式',
      field: 'i',
      placeholder: '请输入结算方式',
      type: 'text'
    },
    {
      label: '其它说明',
      field: 'j',
      placeholder: '请输入其他说明',
      type: 'textarea'
    }
  ]

  const factoryConfigs = [
    {
      label: '主要需求',
      field: 'l',
      placeholder: '请输入主要需求',
      type: 'textarea'
    },
    {
      label: '地域需求',
      field: 'm',
      placeholder: '请输入地域需求',
      type: 'text'
    },
    {
      label: '车位数量',
      field: 'n',
      placeholder: '请输入车位数量',
      type: 'text'
    },
    {
      label: '品质要求',
      field: 'o',
      placeholder: '请输入品质要求',
      type: 'text'
    },
    {
      label: '交期期望',
      field: 'p',
      placeholder: '请输入交期期望',
      type: 'text'
    },
    {
      label: '信息化需求',
      field: 'q',
      placeholder: '请输入信息化需求',
      type: 'text'
    },
    {
      label: '设计需求',
      field: 'r',
      placeholder: '请输入设计需求',
      type: 'text'
    },
    {
      label: '打版需求',
      field: 's',
      placeholder: '请输入打版需求',
      type: 'text'
    },
    {
      label: '其它需求',
      field: 't',
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

  const submit = async () => {
    const values = await validateFields()
    console.log(values)
  }

  return (
    <div className={styles.container}>
      <Form form={form} labelAlign={'left'} colon={false}>
        {[basicConfigs, issueConfigs, factoryConfigs].map((configs, idx) => {
          return (
            <div className={styles.chunk} key={idx}>
              <Title title={'发单情况'}></Title>
              {configs.map((item: any) => {
                item.required = item.required ? item.required : false
                const keys = [
                  'type',
                  'options',
                  'keys',
                  'maxImgs',
                  'maxSize',
                  'tips',
                  'placeholder'
                ]
                const data: any = {}
                keys.forEach(i => {
                  if (item[i]) {
                    data[i] = item[i]
                  }
                })

                return (
                  <Col key={item.field}>
                    <FormItem
                      name={item.field}
                      label={item.label}
                      rules={[
                        { required: item.required, message: item.message }
                      ]}
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
          <Button size={'large'} type={'primary'} onClick={submit}>
            确认提交
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default IssuerEnterpriseInfo
