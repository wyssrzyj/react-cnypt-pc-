import React, { useEffect, useState, useMemo } from 'react'
import styles from './equipmentModal.module.less'
import { Icon } from '@/components'
import { Col, Row, Form, Button, Modal } from 'antd'
import Title from '../../controlPanel/components/title'
import FormNode from '@/components/FormNode'
import { observer, useStores } from '@/utils/mobx'
import { dealTypeData, findTreeTarget, getTreeChildValues } from '@/utils/tool'

const FormItem = Form.Item

const titleMap = new Map()
titleMap.set('add', '新增设备')
titleMap.set('edit', '编辑设备')

const EquipmentModal = props => {
  const { visible, onCancel, type, id } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form

  const { commonStore, monitorPageStore } = useStores()
  const {
    equipmentDepartment,
    connectingEquipment,
    saveVideoEquipment,
    singleSearch
  } = monitorPageStore
  const { dictionary } = commonStore
  const { cameraBrand } = dictionary

  const [department, setDepartment] = useState([])
  const [connectErrorText, setConnectErrorText] = useState('')
  const [step, setStep] = useState(0)
  const [connectStatus, setConnectStatus] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    ;(async () => {
      const equipmentRes = await equipmentDepartment()
      const targetData = equipmentRes.data || []
      const target = dealTypeData(targetData, ['deptName', 'id']) || []
      setDepartment(target)
    })()
  }, [])

  useEffect(() => {
    if (id) {
      ;(async () => {
        const res = await singleSearch({ id })
        if (res.code === 200) {
          setInitialValues(res.data)
          setConnectStatus(res.data.status)
          setDisabled(!res.data.status)
          resetFields()
        }
      })()
    }
  }, [id])

  const onFinish = () => {}

  const configs = [
    {
      label: '设备名称',
      required: true,
      type: 'text',
      message: '请输入设备名称',
      placeholder: '请输入设备名称',
      field: 'name'
    },
    {
      label: '设备品牌',
      required: true,
      type: 'select',
      message: '请选择设备品牌',
      placeholder: '请选择设备品牌',
      field: 'brand',
      options: cameraBrand
    },
    {
      label: '所属部门',
      required: true,
      type: 'tree',
      message: '请选择所属部门',
      placeholder: '请选择所属部门',
      field: 'orgIdList',
      treeData: department,
      treeCheckable: true
    },
    {
      label: '设备序列号',
      required: true,
      type: 'text',
      message: '请输入设备序列号',
      placeholder: '请输入设备序列号',
      field: 'serialNumber'
    },
    {
      label: '验证码',
      required: true,
      type: 'text',
      message: '请输入验证码',
      placeholder: '请输入验证码',
      field: 'verificationCode'
    }
  ]

  const testClick = async () => {
    try {
      const values = await validateFields(['serialNumber', 'verificationCode'])
      const res = await connectingEquipment(values)
      setStep(1)
      setConnectErrorText(+res.data !== 200 ? res.msg : '')
      setConnectStatus(+res.data === 200 ? 1 : 0)
      if (res.code !== 200) {
        setConnectErrorText(
          '您所提交的信息有误，请确认序列号或验证码填写无误！！！'
        )
      }
      setDisabled(false)
    } catch (err) {
      setStep(1)
      setConnectErrorText(
        '您所提交的信息有误，请确认序列号或验证码填写无误！！！'
      )
      console.log(err)
    }
  }

  const back = () => {
    setStep(0)
    setConnectErrorText('')
  }

  const cancel = () => {
    back()
    onCancel && onCancel()
  }

  const flag = useMemo(() => {
    if (step === 1 && !connectErrorText) {
      return true
    }
    return false
  }, [step, connectErrorText])

  const submit = async () => {
    try {
      const values = await validateFields()

      if (+values.orgIdList.length) {
        const arr = []
        values.orgIdList.forEach(item => {
          const t = findTreeTarget(item, department)
          const val = getTreeChildValues(t)
          arr.push(...val)
        })

        values.orgIdList = arr
      }
      if (id) {
        values.id = id
      }
      values.status = connectStatus
      const res = await saveVideoEquipment(values)
      if (res.code === 200) {
        cancel()
      }
    } catch (err) {}
  }

  return (
    <Modal
      width={step ? 360 : 520}
      centered
      visible={visible}
      onCancel={flag ? back : cancel}
      footer={false}
      maskClosable={false}
    >
      {step === 0 ? (
        <>
          <Title title={titleMap.get(type)}></Title>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Row>
              {configs.map(item => {
                const keys = [
                  'type',
                  'placeholder',
                  'disabled',
                  'options',
                  'treeData',
                  'treeCheckable',
                  'keys'
                ]
                const data: any = {}
                keys.forEach(i => {
                  if (item[i]) {
                    data[i] = item[i]
                  }
                })
                return (
                  <Col span={24} key={item.field}>
                    <FormItem
                      name={item.field}
                      label={item.label}
                      // initialValue={item.initValue}
                      rules={[
                        { required: item.required, message: item.message }
                      ]}
                      labelCol={{ span: 5 }}
                    >
                      <FormNode {...data}></FormNode>
                    </FormItem>
                  </Col>
                )
              })}
            </Row>

            <div className={styles.btnBox}>
              <Button
                type={'primary'}
                className={styles.btn}
                onClick={testClick}
              >
                测试连接
              </Button>

              <div className={styles.btnBoxRight}>
                <Button
                  type={'primary'}
                  className={styles.btn}
                  ghost
                  onClick={cancel}
                >
                  取消
                </Button>
                <Button
                  type={'primary'}
                  className={styles.btn}
                  onClick={submit}
                  disabled={disabled}
                >
                  提交
                </Button>
              </div>
            </div>
          </Form>
        </>
      ) : null}

      {connectErrorText && step === 1 ? (
        <div className={styles.errorBox}>
          <Icon type="jack-sptg1" className={styles.menuIcon} />
          <p className={styles.title}>连接失败</p>
          <p className={styles.text}>{connectErrorText}</p>
          <div className={styles.errorBtns}>
            <Button className={styles.statusBtn} onClick={cancel}>
              取消
            </Button>
            <Button className={styles.statusBtn} type="primary" onClick={back}>
              重新编辑
            </Button>
          </div>
        </div>
      ) : null}

      {!connectErrorText && step === 1 ? (
        <div className={styles.errorBox}>
          <Icon type="jack-chenggong" className={styles.menuIcon} />
          <p className={styles.text}>连接成功</p>
          <div className={styles.statusBtnBox}>
            <Button className={styles.statusBtn} type="primary" onClick={back}>
              立即返回
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default observer(EquipmentModal)
