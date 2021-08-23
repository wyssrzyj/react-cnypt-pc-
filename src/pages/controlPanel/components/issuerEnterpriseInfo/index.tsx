import React from 'react'
import styles from './index.module.less'
import { Form, Col } from 'antd'
import FormNode from '@/components/FormNode'

const FormItem = Form.Item

const Title = ({ title }) => <div className={styles.title}>{title}</div>

const IssuerEnterpriseInfo = () => {
  const [form] = Form.useForm()

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
      require: true,
      message: '请填写企业名称'
    },
    {
      label: '企业角色',
      field: 'enterpriseRole',
      type: 'select',
      require: true,
      message: '请选择企业角色',
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
      format: 'YYYY'
    },
    {
      label: '年产值',
      field: 'outputValue',
      type: 'select',
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
      type: 'text'
    },
    {
      label: '订单品类',
      field: 'b',
      type: 'text'
    },
    {
      label: '首次单量（件）',
      field: 'c',
      type: 'text'
    },
    {
      label: '单次单量（件）',
      field: 'd',
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
      type: 'text'
    },
    {
      label: '结算方式',
      field: 'i',
      type: 'text'
    },
    {
      label: '其它说明',
      field: 'j',
      type: 'textarea'
    }
  ]

  const factoryConfigs = [
    {
      label: '主要需求',
      field: 'l',
      type: 'textarea'
    },
    {
      label: '地域需求',
      field: 'm',
      type: 'text'
    },
    {
      label: '车位数量',
      field: 'n',
      type: 'text'
    },
    {
      label: '品质要求',
      field: 'o',
      type: 'text'
    },
    {
      label: '交期期望',
      field: 'p',
      type: 'text'
    },
    {
      label: '信息化需求',
      field: 'q',
      type: 'text'
    },
    {
      label: '设计需求',
      field: 'r',
      type: 'text'
    },
    {
      label: '打版需求',
      field: 's',
      type: 'text'
    },
    {
      label: '其它需求',
      field: 't',
      type: 'textarea'
    }
  ]

  return (
    <div>
      <Form form={form}>
        <Title title={'基本信息'}></Title>
        {basicConfigs.map((item: any) => {
          item.required = item.required ? item.required : false
          const keys = ['type', 'options', 'keys', 'maxImgs', 'maxSize', 'tips']
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
                rules={[{ required: item.required, message: item.message }]}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
        <Title title={'发单情况'}></Title>
        {issueConfigs.map((item: any) => {
          item.required = item.required ? item.required : false
          const keys = ['type', 'options', 'keys', 'maxImgs', 'maxSize', 'tips']
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
                rules={[{ required: item.required, message: item.message }]}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
        <Title title={'加工厂需求'}></Title>
        {factoryConfigs.map((item: any) => {
          item.required = item.required ? item.required : false
          const keys = ['type', 'options', 'keys', 'maxImgs', 'maxSize', 'tips']
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
                rules={[{ required: item.required, message: item.message }]}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
      </Form>
    </div>
  )
}

export default IssuerEnterpriseInfo
