import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Tree } from 'antd'
import { Icon } from '@/components'
import styles from './bindModal.module.less'
import Title from '../../controlPanel/components/title'
import { useStores } from '@/utils/mobx'
import { dealTypeData, findTreeTarget, getTreeValues } from '@/utils/tool'

const FormItem = Form.Item

const BindModal = props => {
  const { visible, onCancel, id, status } = props
  const { monitorPageStore } = useStores()
  const {
    obtainEquipmentBrand,
    echoBoundData,
    otherSystemDepartments,
    productAccount
  } = monitorPageStore

  const [bindStatus, setBindStatus] = useState(status)
  const [checkedKeys, setCheckedKeys] = useState([])
  const [department, setDepartment] = useState<any[]>([])

  const [form] = Form.useForm()
  const { validateFields } = form

  useEffect(() => {
    ;(async () => {
      const DOM = document.documentElement || document.body
      DOM.style.overflow = 'hidden'

      const uChatDepartment = await obtainEquipmentBrand()
      const target =
        dealTypeData(
          uChatDepartment,
          ['deptName', 'deptId'],
          ['title', 'key']
        ) || []
      setDepartment(target)

      const cameraRes = await echoBoundData({ cameraId: id })
      setCheckedKeys(cameraRes.data)

      return () => {
        DOM.style.overflow = 'auto'
      }
    })()
  }, [bindStatus])

  const cancel = () => {
    onCancel && onCancel()
  }

  const onFinish = async res => {
    try {
      const values = await validateFields()
      const bindRes = await productAccount(values)
      setBindStatus(bindRes)
    } catch (err) {
      console.log(err)
    }
  }

  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys)
  }

  const move = data => {
    const { children, parentId } = data
    if (Array.isArray(children) && children.length > 0) {
      const values = getTreeValues(data, 'deptId')
      setCheckedKeys(checkedKeys.filter(item => !values.includes(item)))
    } else {
      setCheckedKeys(
        checkedKeys.filter(item => ![data.deptId, parentId].includes(item))
      )
    }
  }

  const bindSubmit = async () => {
    const res = await otherSystemDepartments({
      cameraId: id,
      orgIdList: checkedKeys,
      orgType: 1
    })
    if (res) {
      onCancel && onCancel()
    }
  }

  return (
    <Modal
      width={bindStatus ? 800 : 520}
      maskClosable={false}
      visible={visible}
      onCancel={cancel}
      footer={false}
      centered
      getContainer={false}
    >
      {!bindStatus ? (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Title title={'绑定优产账号'}></Title>
          <FormItem
            name="mobile"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              prefix={
                <Icon type="jack-gerenzhongxin1" className={styles.icon} />
              }
              placeholder="请输入账号"
            />
          </FormItem>
          <FormItem
            name="password"
            required
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<Icon type="jack-mima" className={styles.icon} />}
              type={'password'}
              placeholder="请输入密码"
            />
          </FormItem>
          <div className={styles.btns}>
            <Button
              className={styles.btn}
              type="primary"
              ghost
              onClick={onCancel}
            >
              取消
            </Button>
            <Button className={styles.btn} type="primary" htmlType={'submit'}>
              立即绑定
            </Button>
          </div>
        </Form>
      ) : null}

      {bindStatus ? (
        <div className={styles.content}>
          <Tree
            className={styles.tree}
            checkable
            onCheck={onCheck} //点击复选框触发
            checkedKeys={checkedKeys} //选中复选框的树节点
            treeData={department} //数据
            style={{ height: 400, overflow: 'auto' }}
          />

          <div className={styles.rightContent}>
            <div className={styles.selectTrees}>
              {Array.isArray(checkedKeys)
                ? checkedKeys.map(item => {
                    console.log(checkedKeys, 'checkedKeys')
                    console.log(item, department, 'checkedKeys')

                    const target = findTreeTarget(item, department, 'deptId')

                    return (
                      <div
                        className={styles.selectTreeNode}
                        onClick={() => move(target)}
                        key={target.deptId}
                      >
                        <span>{target.deptName}</span>
                        <Icon type="jack-guanbi1" className={styles.delIcon} />
                      </div>
                    )
                  })
                : null}
            </div>
            <div className={styles.btns2}>
              <Button
                className={styles.btn2}
                type="primary"
                ghost
                onClick={onCancel}
              >
                取消
              </Button>
              <Button
                className={styles.btn}
                type="primary"
                onClick={bindSubmit}
              >
                确认
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default BindModal
