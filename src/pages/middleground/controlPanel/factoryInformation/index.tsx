import React, { useState } from 'react'
import styles from './index.module.less'
import { Form, Col, Upload, Button } from 'antd'
import FormNode from '@/components/FormNode'
import CustomTable from './customTable'
import { cloneDeep } from 'lodash'
import OSS from '@/utils/oss'

type FileList = Array<any>

const FormTitle = ({ title }) => {
  return <div className={styles.title}>{title}</div>
}

const FormItem = Form.Item

const FactoryInformation = () => {
  const [form] = Form.useForm()
  const { validateFields } = form

  const [fileList, setFileList] = useState<FileList>([])

  const basis = [
    {
      label: '厂房面积',
      required: true,
      name: 'plantArea',
      type: 'text',
      initValue: '',
      message: '请输入厂房面积~',
      span: 12,
      suffix: '平米',
      width: 300
    },
    {
      label: '年交易额',
      required: true,
      placeholder: '请选择',
      name: 'annual',
      type: 'select',
      initValue: true,
      message: '请选择年交易额~',
      options: [
        { label: '200万以内', value: 1 },
        { label: '200万~500万', value: 2 },
        { label: '500万~1000万', value: 3 },
        { label: '1000万~2000万', value: 4 },
        { label: '2000万~5000万', value: 5 },
        { label: '5000万~1亿', value: 6 },
        { label: '1亿以上', value: 7 }
      ],
      span: 12
    },
    {
      label: '代工品牌',
      required: false,
      name: 'oem',
      type: 'text',
      initValue: '',
      message: '请输入代工品牌~',
      span: 12
    },
    {
      label: '商标/品牌',
      required: false,
      name: 'trademark',
      type: 'text',
      initValue: '',
      message: '请输入商标/品牌~',
      span: 12
    },
    {
      label: '生产流水线(条)',
      required: true,
      name: 'productionLine',
      type: 'number',
      initValue: 0,
      message: '请输入生产流水线数~',
      min: 0,
      span: 12
    },
    {
      label: '加工设备(台)',
      required: true,
      name: 'equipment',
      type: 'number',
      initValue: 0,
      message: '请输入加工设备数~',
      min: 0,
      span: 12
    },
    {
      label: '支持打样',
      required: true,
      name: 'proofing',
      type: 'radio',
      initValue: true,
      message: '请选择是否支持打样~',
      options: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      span: 12
    }
  ]

  const product = [
    {
      label: '员工人数',
      required: true,
      name: 'employees',
      placeholder: '请选择',
      type: 'select',
      initValue: true,
      message: '请选择员工人数~',
      options: [
        { label: '20人内', value: 1 },
        { label: '20~50人', value: 2 },
        { label: '50~100人', value: 3 },
        { label: '101~500人', value: 4 },
        { label: '501~1000人', value: 5 },
        { label: '1001~10000人', value: 6 },
        { label: '10000以上', value: 7 }
      ],
      span: 12
    },
    {
      label: '年产值',
      required: true,
      name: 'output',
      placeholder: '请选择',
      type: 'select',
      initValue: true,
      message: '请选择年产值~',
      options: [
        { label: '20万~50万', value: 1 },
        { label: '50万~100万', value: 2 },
        { label: '100万~200万', value: 3 },
        { label: '200万~500万', value: 4 },
        { label: '500万~1000亿', value: 5 },
        { label: '1000以上', value: 6 }
      ],
      span: 12
    },
    {
      label: '打样裁剪人数(人)',
      required: false,
      name: 'tailor',
      type: 'number',
      initValue: 0,
      message: '请输入打样裁剪人数~',
      min: 0,
      span: 12
    },
    {
      label: '检验后道人数(人)',
      required: false,
      name: 'backEnd',
      type: 'number',
      initValue: 0,
      message: '请输入检验后道人数~',
      min: 0,
      span: 12
    },
    {
      label: '缝制车工人数(人)',
      required: true,
      name: 'sew',
      type: 'number',
      initValue: 0,
      message: '请输入缝制车工人数~',
      min: 0,
      span: 12
    },
    {
      label: '检验小组',
      required: true,
      name: 'test',
      placeholder: '请选择',
      type: 'select',
      initValue: '',
      message: '请选择检验小组~',
      options: [
        { label: '小检', value: 1 },
        { label: '中检', value: 2 },
        { label: '大检', value: 3 }
      ],
      span: 12
    },
    {
      label: '特殊工艺',
      required: true,
      name: 'special ',
      placeholder: '请选择',
      type: 'textarea',
      initValue: '',
      message: '请描述特殊工艺~',
      span: 12
    },
    {
      label: '原材料供应时间',
      required: true,
      name: 'supplyTimeData',
      placeholder: '请选择',
      type: 'inputAndSelect',
      initValue: { supplyTime: '', supplyTimeType: 'day' },
      keys: ['supplyTime', 'supplyTimeType'],
      message: '请选择年产值~',
      options: [
        { label: '天', value: 'day' },
        { label: '周', value: 'week' },
        { label: '月', value: 'month' }
      ],
      span: 12
    }
  ]

  const cooperation = [
    {
      label: '定制起订量(件)',
      required: false,
      name: 'customMoq',
      type: 'number',
      initValue: 0,
      message: '请输入定制起订量~',
      min: 0,
      span: 12
    },
    {
      label: '贴牌起订量(件)',
      required: false,
      name: 'oemMoq',
      type: 'number',
      initValue: 0,
      message: '请输入贴牌起订量~',
      min: 0,
      span: 12
    },
    {
      label: '清加工起订量(件)',
      required: false,
      name: 'processMoq',
      type: 'number',
      initValue: 0,
      message: '请输入清加工起订量~',
      min: 0,
      span: 12
    },
    {
      label: '增值税发票',
      required: true,
      name: 'invoice',
      type: 'radio',
      initValue: true,
      message: '请选择增值税发票~',
      options: [
        { label: '有', value: true },
        { label: '无', value: false }
      ],
      span: 12
    },
    {
      label: '发票点数(%)',
      required: false,
      name: 'invoicePercent',
      type: 'number',
      initValue: 0,
      message: '请输入发票点数~',
      min: 0,
      span: 12
    },
    {
      label: '交货方式',
      required: true,
      placeholder: '请选择',
      name: 'turnover',
      type: 'select',
      initValue: true,
      message: '请选择交货方式~',
      options: [
        { label: '可面议', value: 1 },
        { label: '自取', value: 2 },
        { label: '工厂交货', value: 3 },
        { label: '货运承运人', value: 4 },
        { label: '船边交货', value: 5 }
      ],
      span: 12
    },
    {
      label: '付款方式',
      required: true,
      placeholder: '请选择',
      name: 'payover',
      type: 'select',
      initValue: true,
      message: '请选择付款方式~',
      options: [
        { label: '可面议', value: 1 },
        { label: '分期付款', value: 2 },
        { label: '货到付款', value: 3 },
        { label: '次月结', value: 4 }
      ],
      span: 12
    },
    {
      label: '验厂方式',
      required: true,
      placeholder: '请选择',
      name: 'check',
      type: 'select',
      initValue: true,
      message: '请选择验厂方式~',
      options: [
        { label: '可面议', value: 1 },
        { label: '分期付款', value: 2 },
        { label: '货到付款', value: 3 },
        { label: '次月结', value: 4 }
      ],
      span: 12
    },
    {
      label: '最短交货期',
      required: true,
      name: 'shortestTimeData',
      placeholder: '请选择',
      type: 'inputAndSelect',
      initValue: { shortestTime: '', shortestTimeType: 'day' },
      keys: ['shortestTime', 'shortestTimeType'],
      message: '请选择年产值~',
      options: [
        { label: '天', value: 'day' },
        { label: '周', value: 'week' },
        { label: '月', value: 'month' }
      ],
      span: 12
    }
  ]

  const list = [basis, product, cooperation]
  const titleList = ['基本资料', '生产能力', '合作方式']

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  const submit = async _flag => {
    try {
      await validateFields()
    } catch (e) {}
  }

  const customRequest = async ({ file }) => {
    const list = cloneDeep(fileList)

    // 图片资源转换成base64
    // const reader = new FileReader()
    // reader.onload = function (res) {
    //   console.log(res.target.result)
    // }
    // reader.readAsDataURL(file)

    // /capacity-platform/platform 目标文件夹路径
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}${file.name}`,
      file
    )
    if (res) {
      const { url } = res
      list.push({ thumbUrl: url })
      setFileList(list)
    }
  }

  const fileRemove = file => {
    const arrList = cloneDeep(fileList)
    const target = arrList.filter(item => item.thumbUrl !== file.thumbUrl)
    setFileList(target)
  }

  return (
    <div>
      <Form form={form} className={styles.form}>
        {list.map((target, idx) => {
          return (
            <div key={idx}>
              <FormTitle title={titleList[idx]} />
              <div className={styles.chunk}>
                {target.map((item, idx) => {
                  const keys = [
                    'type',
                    'placeholder',
                    'disabled',
                    'options',
                    'treeData',
                    'suffix',
                    'keys'
                  ]
                  const data: any = {}
                  keys.forEach(i => {
                    if (item[i]) {
                      data[i] = item[i]
                    }
                  })
                  return (
                    <Col span={item.span} key={idx}>
                      <FormItem
                        name={item.name}
                        label={item.label}
                        initialValue={item.initValue}
                        rules={[
                          { required: item.required, message: item.message }
                        ]}
                      >
                        <FormNode {...data}></FormNode>
                      </FormItem>
                    </Col>
                  )
                })}
              </div>
            </div>
          )
        })}
        <FormTitle title={'车间设备'} />
        <CustomTable></CustomTable>
        <div className={styles.photos}>
          <FormItem label={'车间照片'}>
            <Upload
              fileList={fileList}
              listType="picture-card"
              accept={'.jpg,.png,.jpeg'}
              name="file"
              onRemove={fileRemove}
              data={{ module: 'factory' }}
              maxCount={10}
              customRequest={customRequest}
            >
              {fileList.length <= 10 && uploadButton}
            </Upload>
            <div>
              上传车间照片，只能上传jpg/png格式文件，文件不能超过2M，最多上传10个文件
            </div>
          </FormItem>
        </div>

        <div className={styles.btnBox}>
          <Button
            onClick={() => {
              submit(true)
            }}
            type={'primary'}
            className={styles.submitBtn}
          >
            确认提交
          </Button>
          <Button
            onClick={() => {
              submit(false)
            }}
          >
            保存
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FactoryInformation
