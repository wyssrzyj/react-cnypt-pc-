import React, { useState, useEffect, memo } from 'react'
import { useStores } from '@/utils/mobx'
import { isEmpty, isArray } from 'lodash'

import { Icon } from '@/components'
import styles from './index.module.less'
import { Divider, Form, Input, Button, Table, Space, message } from 'antd'
import DeletePopup from './components/deletePopup'
import BindingSuperiorProduct from './components/bindingSuperiorProduct'
import AddDevicePopUpd from './components/addDevicePopUpd'
import Ceshi from './components/ceshi'
const rowKey = 'id'
// const { TreeNode } = TreeSelect

const dealTypeData = (data: any[]) => {
  data.forEach(item => {
    item.label = item.deptName
    item.value = item.id
    item.key = item.id
    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children)
    }
  })
  return data
}

const MonitorPage = memo(() => {
  const { monitorPageStore, commonStore } = useStores()
  const {
    newDataList,
    getDataList,
    equipmentDepartment,
    deleteEvent,
    connectingEquipment,
    bindSuperiorProductAccount,
    productAccount,
    singleSearch,
    obtainEquipmentBrand
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
  const [pageSize, setPageSize] = useState(10) //
  const [numberofequipment, setNumberofequipment] = useState(false) //
  const [equipmentDepartmentValue, setEquipmentDepartmentValue] = useState()
  const [errorStatus, setErrorstatus] = useState('')
  const [departmentPop, setDepartmentPop] = useState(false) //选择部门弹窗

  const [beforeModification, setBeforeModification] = useState({
    serialNumber: '0',
    verificationCode: '0'
  }) //存放修改前的input数据
  const getFactoryInfo = async () => {
    const response = await getDataList({
      name: equipmentName,
      pageSize,
      pageNum
    })
    setTotal(response.total) //数据长度
    setList(response.records)
  }
  const onSearch = value => {
    setEquipmentName(value)
    if (value.length == 0) {
      setNumberofequipment(false)
    } else {
      setNumberofequipment(true)
    }
  }
  // 当前页数
  const Paginationclick = (page, pageSize) => {
    setPageSize(pageSize)

    setPageNum(page)
  }
  useEffect(() => {
    getFactoryInfo()
  }, [equipmentName, pageNum, pageSize])
  // 用于显示成功还是失败
  useEffect(() => {
    if (!isModalVisible) {
      setModify(null)
    }
  }, [isModalVisible])
  // 编辑
  const modificationMethod = async rData => {
    const brand = await allDictionary([])
    if (brand) {
      setEquipmentbrand(brand.cameraBrand)
    }
    const { id } = rData
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
      width: 180,

      dataIndex: 'orgNameList',
      render: value => {
        return value.join('、')
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 210,
      key: 'action',

      render: record => (
        <Space size="middle">
          <span
            className={styles.edit}
            onClick={() => {
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
    const findTarget = (val, data) => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        console.log(item)
        if (item.id === val) {
          //当传过来的id和当前id一样返回
          return item
        }
        if (isArray(item.children) && item.children.length) {
          const res = findTarget(val, item.children) //
          if (!isEmpty(res)) {
            return res
          }
        }
      }
    }
    const getValues = data => {
      const target = [] //空数组
      if (!isEmpty(data)) {
        target.push(data.id) //数据的id传递给数组
        if (isArray(data.children)) {
          data.children.forEach(item => {
            target.push(...getValues(item))
          })
        }
      }
      return target
    }

    if (connection) {
      //  判断是测试还是提交
      const { serialNumber, verificationCode } = v
      const ConnectingEquipment = await connectingEquipment({
        serialNumber,
        verificationCode
      })
      console.log(ConnectingEquipment.data)

      if (+ConnectingEquipment.data === 20014) {
        setErrorstatus('您所提交的信息有误，请确认序列号或验证码!!!')
      } else {
        setErrorstatus(ConnectingEquipment.msg)
      }
      if (+ConnectingEquipment.data === 200) {
        // 测试弹窗
        setJudgment(true)
        setConnectionStatus(1)
      } else {
        setFailed(true)
        setConnectionStatus(0)
      }
      setConnection(false)
      setButtonIsAvailable(false)
      setBeforeModification(v)
    } else {
      // 判断是修改还是新增
      if (modify != null) {
        console.log('这是修改')
        if (+v.orgIdList.length === 1) {
          const a = findTarget(v.orgIdList.toString(), department)
          const val = getValues(a)
          v.orgIdList = val
        }
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
      } else {
        console.log('这是新增')
        if (+v.orgIdList.length === 1) {
          const a = findTarget(v.orgIdList.toString(), department)
          const val = getValues(a)
          v.orgIdList = val
        }
        setModify(null)
        const newlywed = await newDataList({ ...v, status: connectionStatus })
        if (newlywed.code == 200) {
          setIsModalVisible(false)
          getFactoryInfo()
          setButtonIsAvailable(true)
        } else {
          setButtonIsAvailable(false)
        }
      }

      setModify(null)
    }
  }
  // 序列号的内容
  const toeplateSerialNumber = e => {
    if (e.target.value !== beforeModification.serialNumber) {
      setButtonIsAvailable(true)
    }
  }
  // 验证码的内容
  const toeplateVerificationCode = e => {
    if (e.target.value !== beforeModification.verificationCode) {
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
      // message.success('已经绑定')
      setDepartmentPop(true)
      const productionDep = await obtainEquipmentBrand()
      console.log(productionDep)
    }
  }
  const DepartmentPopOk = () => {
    setDepartmentPop(false)
  }
  const DepartmentPopCancel = () => {
    setDepartmentPop(false)
  }
  //优产账号form
  const onFinishProduction = async (values: any) => {
    const bindYo = await productAccount(values)
    if (bindYo) {
      setaceousModalVisible(false)
    }
  }
  const onChange = value => {
    console.log('🚀 ~ file: index.tsx ~ line 347 ~ MonitorPage ~ value', value)
    setEquipmentDepartmentValue(value)
  }

  return (
    <div className={styles.monitor}>
      <div>{/* <TreeSelect {...tProps} /> */}</div>
      <div>
        <span className={styles.system}>监控系统</span>
      </div>
      <Divider />
      <div className={styles.header}>
        <div className={styles.equipment}>
          <span className={styles.keynote}>设备关键名字</span>
          <span className={styles.pmentkeynote}>
            <Search
              className={styles.inputsearch}
              maxLength={5}
              placeholder="请输入设备名字"
              allowClear
              enterButton="查询"
              size="middle"
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
      <div className={styles.tableParent}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={list}
          rowKey={rowKey}
          pagination={{
            showQuickJumper: false, //是否快速查找
            pageSize, //每页条数
            showSizeChanger: true, //展示切换器
            current: pageNum, //	当前页数
            total, //数据总数
            position: ['bottomCenter'], //居中
            onChange: Paginationclick //获取当前页码是一个function
          }}
        ></Table>
        {numberofequipment ? (
          <h3 className={styles.totalEquipment}>查询的设备共: {total} 件</h3>
        ) : (
          <h3 className={styles.totalEquipment}>设备数量共: {total} 件</h3>
        )}
      </div>
      <Ceshi />

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
        onChange={onChange}
        numberofequivalue={equipmentDepartmentValue}
        errorStatus={errorStatus}
      />
      {/* 绑定优产账号弹窗 */}
      <BindingSuperiorProduct
        departmentPop={departmentPop}
        visible={accountModalVisible}
        DepartmentPopCancel={DepartmentPopCancel}
        DepartmentPopOk={DepartmentPopOk}
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
})
export default MonitorPage
