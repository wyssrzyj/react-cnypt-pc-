import React, { useState, useEffect } from 'react'
import { useStores } from '@/utils/mobx'

import { Icon } from '@/components'
import styles from './index.module.less'
import {
  Divider,
  Form,
  Input,
  Button,
  Table,
  Space
  // message
} from 'antd'
// import AddDevicePopUp from './components/addDevicePopUp'
import DeletePopup from './components/deletePopup'
import BindingSuperiorProduct from './components/bindingSuperiorProduct'
import AddDevicePopUpd from './components/addDevicePopUpd'

const rowKey = 'id'
// const { TreeNode } = TreeSelect
const dealTypeData = (data: any[]) => {
  data.forEach(item => {
    item.label = item.deptName
    item.value = item.id

    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children)
    }
  })
  return data
}

const MonitorPage = () => {
  const { monitorPageStore, commonStore } = useStores()
  const {
    // queryData,
    newDataList,
    getDataList,
    equipmentDepartment,
    deleteEvent,
    connectingEquipment,
    bindSuperiorProductAccount,
    productAccount
  } = monitorPageStore
  const { allDictionary } = commonStore
  //优产账号弹窗
  const [accountModalVisible, setaceousModalVisible] = useState(false)
  const [buttonIsAvailable, setButtonIsAvailable] = useState(true) //判断按钮是否可用
  const [isModalVisible, setIsModalVisible] = useState(false) //设备弹窗
  const [judgment, setJudgment] = useState(false) //连接成功
  const [failed, setFailed] = useState(false) //连接失败
  const [deletionFailed, setDeletionFailed] = useState(false) //删除设备
  const [successFailure, setSuccessFailure] = useState(false) //判断是成功还是失败
  const [connection, setConnection] = useState(false) //判断是连接测试还是提交
  const [list, setList] = useState([]) //数据
  const [department, setDepartment] = useState<any>([]) // 设备部门
  const [equipmentbrand, setEquipmentbrand] = useState<any>([]) // 设备品牌
  const [moved, setMoved] = useState<any>(0) // 删除id
  const [equipmentName, setEquipmentName] = useState<any>(null) //查询name

  const getFactoryInfo = async () => {
    const response = await getDataList({
      name: equipmentName
    })
    console.log(response)
    setList(response.records)
  }
  const onSearch = value => {
    console.log(value)
    setEquipmentName(value)
  }

  useEffect(() => {
    getFactoryInfo()
  }, [equipmentName])

  const columns: any = [
    {
      title: '设备名称',
      dataIndex: 'name',
      align: 'center',
      key: 'name'
    },
    {
      title: '设备品牌',
      dataIndex: 'brand',
      align: 'center',
      key: 'brand'
    },
    {
      title: '设备序列号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      align: 'center'
    },
    {
      title: '连接状态',
      key: 'status',
      align: 'center',

      dataIndex: 'status',
      render(value) {
        console.log(value)

        return value ? (
          <span className={styles.success}>成功</span>
        ) : (
          <span className={styles.success}>失败</span>
        )
      }
    },
    {
      title: '所属部门',
      align: 'center',

      key: 'orgNameList',
      dataIndex: 'orgNameList',
      render: value => {
        return value.join('、')
      }
    },
    {
      title: '操作',
      align: 'center',

      key: 'action',

      render: (c, rData) => (
        <Space size="middle">
          <span
            className={styles.edit}
            onClick={() => {
              setIsModalVisible(true)
              console.log(c)
              console.log(rData)
              form.setFieldsValue({
                ...rData,
                id: rData.key
              })
            }}
          >
            编辑
          </span>
          <span className={styles.vertical}>|</span>
          <span
            className={styles.edit}
            onClick={() => {
              DeleteDeviceDisplay(rData.id)
            }}
          >
            {' '}
            删除
          </span>
          <span className={styles.vertical}>|</span>

          <span className={styles.edit} onClick={accountShowModal}>
            绑定优产部门
          </span>
        </Space>
      )
    }
  ]

  const [form] = Form.useForm()
  const { Search } = Input

  //   连接成功
  const showModals = () => {
    setJudgment(true)
  }
  const cancellation = () => {
    setJudgment(false)
  }
  //连接失败
  const connectionFailed = () => {
    setFailed(true)
  }
  const ConnectionFailedCancel = () => {
    setFailed(false)
  }
  //删除设备
  const DeleteDeviceDisplay = id => {
    setMoved(id)
    setDeletionFailed(true)
  }
  const deleteDeviceCancel = async () => {
    const deletion = await deleteEvent(moved)

    if (deletion.code == 200) {
      getFactoryInfo()
      setDeletionFailed(false)
    }
  }
  // 新增提交按钮事件
  const equipmentHandleOk = () => {
    setJudgment(false)
    setFailed(false)
    // setIsModalVisible(false)//关闭弹窗
    setButtonIsAvailable(true)
    form.submit()

    // setIsModalVisible(false)
  }
  // 新增取消按钮事件
  const equipmentHandleCancel = () => {
    setButtonIsAvailable(true)
    setIsModalVisible(false)
  }
  // 设备form
  const onFinish = async (v: any) => {
    //  判断是测试还是提交
    if (connection) {
      const { serialNumber, verificationCode } = v
      console.log(serialNumber)
      console.log(verificationCode)
      const ConnectingEquipment = await connectingEquipment({
        serialNumber,
        verificationCode
      })
      if (ConnectingEquipment === 200) {
        setSuccessFailure(true)
      } else {
        setSuccessFailure(false)
      }
    } else {
      const newlywed = await newDataList(v)
      if (newlywed.code == 200) {
        setIsModalVisible(false)
        getFactoryInfo()
      }
    }

    connections()
  }
  // 新增显示
  const showModal = async () => {
    setIsModalVisible(true)
    const brand = await allDictionary([])
    setEquipmentbrand(brand.cameraBrand)
    const equipment = await equipmentDepartment()
    setDepartment(dealTypeData(equipment.data))
    form.resetFields()
  }

  const accountShowModal = async () => {
    form.resetFields()
    const account = await bindSuperiorProductAccount()
    console.log(account)
    // 因为当前账号已经绑定了  用于测试
    if (account.data == true) {
      setaceousModalVisible(true)
    }
  }
  //优产账号form
  const onFinishProduction = async (values: any) => {
    console.log('优产账号form:', values)
    const bindYo = await productAccount(values)
    console.log(bindYo)
    if (bindYo) {
      setaceousModalVisible(false)
    }
  }

  //   连接测试
  const connections = () => {
    if (connection) {
      if (successFailure) {
        showModals()
      } else {
        connectionFailed()
      }
    }
    setConnection(false)
    setButtonIsAvailable(false)
  }

  // 返回上一级
  const previous = () => {
    console.log('返回上一级')
  }

  const tableChange = (pagination, filters, sorter, extra) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~')
    console.log(pagination) //页码改变
    console.log(filters)
    console.log(sorter)
    console.log(extra) //获取table中所有的数据
    console.log('~~~~~~~~~~~~~~~~~~~~~~')
  }

  return (
    <div className={styles.monitor}>
      <div>
        <span onClick={previous}>
          <Icon type="jack-left-copy" className={styles.previous} />
        </span>
        <span className={styles.system}>监控系统</span>
      </div>
      <Divider />
      <div className={styles.header}>
        <div className={styles.equipment}>
          <span className={styles.keynote}>设备关键名字</span>
          <span>
            <Search
              className={styles.inputsearch}
              maxLength={5}
              placeholder="请输入设备名字"
              allowClear
              enterButton="查询"
              size="large"
              onSearch={onSearch}
            />
          </span>

          <Button
            icon={<Icon type="jack-del" className={styles.del} />}
            className={styles.added}
            onClick={showModal}
          >
            新增设备
          </Button>
        </div>
      </div>

      <Table
        className={styles.table}
        columns={columns}
        dataSource={list}
        rowKey={rowKey}
        onChange={tableChange}
        pagination={{
          showQuickJumper: false,
          pageSize: 10,
          total: 50,
          position: ['bottomCenter'],
          onShowSizeChange(current, size) {
            console.log(123)
            console.log(current, size)
          },
          onChange(page, pageSize) {
            console.log(page)
            console.log(pageSize)
          }
        }}
      ></Table>

      {/* 新增设备弹窗 */}
      <AddDevicePopUpd
        buttonIsAvailable={buttonIsAvailable}
        equipmentHandleCancel={equipmentHandleCancel}
        equipmentHandleOk={equipmentHandleOk}
        onFinish={onFinish}
        isModalVisible={isModalVisible}
        form={form}
        equipmentbrand={equipmentbrand}
        department={department}
        setConnection={() => setConnection(true)}
        judgment={judgment}
        setJudgment={() => setJudgment(false)}
        cancellation={cancellation}
        failed={failed}
        ConnectionFailedCancel={ConnectionFailedCancel}
      />
      {/* 绑定优产账号弹窗 */}
      <BindingSuperiorProduct
        visible={accountModalVisible}
        onFinish={onFinishProduction}
        onCancel={() => {
          setaceousModalVisible(false)
        }}
      />
      {/* 删除设备 */}
      <DeletePopup
        deleteDeviceCancel={deleteDeviceCancel}
        visible={deletionFailed}
        onClick={() => {
          setDeletionFailed(false)
        }}
      />
    </div>
  )
}
export default MonitorPage
