import React, { useState } from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'

import { Form, Input, Button, Modal, Tree } from 'antd'
const BindingSuperiorProduct = props => {
  const {
    onFinish,
    visible,
    onCancel,
    DepartmentPopCancel,
    departmentPop,
    DepartmentPopOk,
    production,
    setDeselected,
    deselected,
    checkedKeys,
    setCheckedKeys
  } = props
  console.log(props)
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }
  const onCheck = (checkedKeysValue, event) => {
    let sum = event.checkedNodes
    setDeselected(sum)
    console.log(event.checkedNodes)
    setCheckedKeys(checkedKeysValue)
  }

  const move = item => {
    console.log(checkedKeys)
    {
      if (item.parentId != 0) {
        console.log('有父节点')
        setCheckedKeys(
          checkedKeys.filter(l => l !== item.deptId && l !== item.parentId)
        )
        // setDeselected(
        //   deselected.filter(
        //     s => s.deptName !== item.deptName && s.deptId !== item.deptId
        //   )
        // )
      } else {
        console.log('没有父节点')
        setCheckedKeys(checkedKeys.filter(l => l !== item.deptId))
      }
      //删除名字

      setDeselected(deselected.filter(s => s.deptName !== item.deptName))

      {
        console.log(checkedKeys) //key
      }
      {
        console.log(deselected) //所有的数据
      }
    }
  }

  return (
    <div>
      <Modal
        title="绑定优产账号"
        visible={visible}
        footer={null}
        centered={true}
        onCancel={onCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="password">
            <Input
              prefix={<Icon type="jack-gerenzhongxin1" />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item name="mobile">
            <Input
              prefix={<Icon type="jack-mima" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            className={styles.binds}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button className={styles.bind} type="primary" htmlType="submit">
              立即绑定
            </Button>
          </Form.Item>
          <Form.Item
            className={styles.cancel}
            wrapperCol={{ offset: 8, span: 18 }}
          >
            <Button className={styles.cancels} onClick={onCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title="请选择部门"
        visible={departmentPop}
        onOk={DepartmentPopOk}
        centered={true}
        onCancel={DepartmentPopCancel}
      >
        <Tree
          className={styles.tree}
          checkable
          // onExpand={onExpand} //	展开/收起节点时触发
          // expandedKeys={expandedKeys} //	（受控）展开指定的树节点
          // autoExpandParent={autoExpandParent} //	是否自动展开父节点
          onCheck={onCheck} //点击复选框触发
          checkedKeys={checkedKeys} //选中复选框的树节点
          onSelect={onSelect} //点击树节点触发
          selectedKeys={selectedKeys} //（受控）设置选中的树节点
          treeData={production} //数据
          height={200}
          blockNode={false} //是否节点占据一行
          // fieldNames={{title:deptName}}
        />
        <div className={styles.cax}></div>
        <div className={styles.treeName}>
          {Array.isArray(deselected)
            ? deselected.map(item => {
                return (
                  <div
                    className={styles.guanbi}
                    onClick={() => move(item)}
                    key={item.key}
                  >
                    <span>{item.deptName}</span>
                    <span>
                      <Icon type="jack-guanbi" className={styles.del} />
                    </span>
                  </div>
                )
              })
            : null}
        </div>
        {console.log(checkedKeys)}
        {console.log(deselected)}
      </Modal>
    </div>
  )
}
export default BindingSuperiorProduct
