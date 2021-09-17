import React, { useState, useEffect } from 'react'
import { useStores } from '@/utils/mobx'

import { Icon } from '@/components'
import styles from './index.module.less'
import { Divider, Form, Input, Button, Table, Space, message } from 'antd'
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
  const pageSize = 10

  const { monitorPageStore, commonStore } = useStores()
  const {
    newDataList,
    getDataList,
    equipmentDepartment,
    deleteEvent,
    connectingEquipment,
    bindSuperiorProductAccount,
    productAccount,
    singleSearch
  } = monitorPageStore
  const { allDictionary } = commonStore

  const [list, setList] = useState([]) //数据

  const [isModalVisible, setIsModalVisible] = useState(false) //设备弹窗
  const [connection, setConnection] = useState(false) //判断是连接测试还是提交
  const [judgment, setJudgment] = useState(false) //连接成功
  const [failed, setFailed] = useState(false) //连接失败
  const [buttonIsAvailable, setButtonIsAvailable] = useState(true) //判断按钮是否可用
  const [department, setDepartment] = useState<any>([]) // 设备部门
  const [equipmentbrand, setEquipmentbrand] = useState<any>([]) // 设备品牌
  const [deletionFailed, setDeletionFailed] = useState(false) //删除设备
  const [moved, setMoved] = useState<any>(0) // 删除id
  const [equipmentName, setEquipmentName] = useState<any>(null) //查询name
  const [accountModalVisible, setaceousModalVisible] = useState(false) //优产账号弹窗
  const [total, setTotal] = useState<any>(null) //数据长度
  const [pageNum, setPageNum] = useState<number>(1) //当前页数
  const [connectionStatus, setConnectionStatus] = useState<number>(null) //连接状态
  const [modify, setModify] = useState<number>(null) //修改
  const [beforeModification, setBeforeModification] = useState({
    serialNumber: '0',
    verificationCode: '0'
  }) //存放修改前的input数据
  console.log(beforeModification)

  const getFactoryInfo = async () => {
    const response = await getDataList({
      name: equipmentName,
      pageSize,
      pageNum
    })
    setTotal(response.total) //数据长度
    setList(response.records)
    console.log(response.records)
  }
  const onSearch = value => {
    setEquipmentName(value)
  }
  // 当前页数
  const Paginationclick = page => {
    setPageNum(page)
  }
  useEffect(() => {
    getFactoryInfo()
  }, [equipmentName, pageNum])
  // 用于显示成功还是失败
  useEffect(() => {
    if (!isModalVisible) {
      console.log('清除')
      setModify(null)
    }
  }, [isModalVisible])
  // 修改
  const modificationMethod = async rData => {
    const { id } = rData
    console.log(id)
    setModify(id)
    const singly = await singleSearch({ id })

    if (singly.code == 200) {
      form.setFieldsValue(singly.data)
    }

    const equipment = await equipmentDepartment()
    if (equipment.code == 200) {
      setDepartment(dealTypeData(equipment.data))
      setIsModalVisible(true)
    }
  }
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
      key: 'brand',
      render() {
        return <span>萤石</span>
      }
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
      sorter: (a, b) => a.status - b.status,

      render(value) {
        return value ? (
          <span className={styles.success}>成功</span>
        ) : (
          <span className={styles.fail}>失败</span>
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

      render: (text, record) => (
        <Space size="middle">
          <span
            className={styles.edit}
            onClick={() => {
              console.log(text)
              console.log(record)
              modificationMethod(record)
            }}
          >
            编辑
          </span>

          <span className={styles.vertical}>|</span>
          <span
            className={styles.edit}
            onClick={() => {
              DeleteDeviceDisplay(record.id)
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

    form.submit()
  }
  // 新增取消按钮事件
  const equipmentHandleCancel = () => {
    setButtonIsAvailable(true)
    setIsModalVisible(false)
  }

  // 设备form
  const onFinish = async (v: any) => {
    console.log(v)

    //  判断是测试还是提交
    if (connection) {
      const { serialNumber, verificationCode } = v
      const ConnectingEquipment = await connectingEquipment({
        serialNumber,
        verificationCode
      })

      // 测试弹窗
      if (ConnectingEquipment == '200') {
        console.log('正确')
        setJudgment(true)
        setConnectionStatus(1)
      } else {
        console.log('错误')
        setFailed(true)
        setConnectionStatus(0)
      }
      setConnection(false)
      setButtonIsAvailable(false)
      setBeforeModification(v)
    } else {
      // 判断是修改还是新增
      if (modify != null) {
        console.log(modify)

        const newlywed = await newDataList({
          ...v,
          status: connectionStatus,
          id: modify
        })

        if (newlywed.code == 200) {
          setIsModalVisible(false)
          getFactoryInfo()
          setButtonIsAvailable(true)
        } else {
          setButtonIsAvailable(false)
        }
        console.log('修改')
        console.log(newlywed)
      } else {
        setModify(null)
        const newlywed = await newDataList({ ...v, status: connectionStatus })
        if (newlywed.code == 200) {
          setIsModalVisible(false)
          getFactoryInfo()
          setButtonIsAvailable(true)
        } else {
          setButtonIsAvailable(false)
        }
        console.log('新增')
      }

      setModify(null)
    }
  }
  // 序列号的内容
  const toeplateSerialNumber = e => {
    if (e.target.value !== beforeModification.serialNumber) {
      console.log('更改了序列号，按钮失效')
      setButtonIsAvailable(true)
    }
    let value = e.target.value
    if (/\S{1,14}$/.test(value)) {
      console.log('正确')
    } else {
      console.log('错误')
    }
  }
  // 验证码的内容
  const toeplateVerificationCode = e => {
    console.log(beforeModification.verificationCode)
    if (e.target.value !== beforeModification.verificationCode) {
      console.log('更改了验证码，按钮失效')
      setButtonIsAvailable(true)
    }
  }

  //   连接成功的取消
  const cancellation = () => {
    setJudgment(false)
  }
  //连接失败的取消
  const ConnectionFailedCancel = () => {
    setFailed(false)
  }

  // 新增显示
  const showModal = async () => {
    setIsModalVisible(true)
    const brand = await allDictionary([])
    if (brand) {
      setEquipmentbrand(brand.cameraBrand)
    }
    const equipment = await equipmentDepartment()
    if (equipment.code == 200) {
      setDepartment(dealTypeData(equipment.data))
    }
    form.resetFields()
  }
  const accountShowModal = async () => {
    form.resetFields()
    const account = await bindSuperiorProductAccount()
    // 优产绑定 因为当前账号已经绑定了  用于测试
    if (account.data !== true) {
      setaceousModalVisible(true)
    } else {
      message.success('已经绑定')
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

  // 返回上一级
  const previous = () => {
    console.log('返回上一级')
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
        pagination={{
          showQuickJumper: false, //是否快速查找
          pageSize, //每页条数
          current: pageNum, //	当前页数
          total, //数据总数
          position: ['bottomCenter'], //居中
          onChange: Paginationclick //获取当前页码是一个function
        }}
      ></Table>

      {/* 新增设备弹窗 */}
      <AddDevicePopUpd
        toeplateSerialNumber={toeplateSerialNumber}
        toeplateVerificationCode={toeplateVerificationCode}
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
