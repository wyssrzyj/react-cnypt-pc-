import React, { useState, useEffect, memo, useRef } from 'react'
import { useStores } from '@/utils/mobx'
import { findTarget, convenience } from './method'
import { Icon } from '@/components'
import styles from './index.module.less'
import { Divider, Form, Input, Button, Table, Space } from 'antd'
import DeletePopup from './components/deletePopup'
import BindingSuperiorProduct from './components/bindingSuperiorProduct'
import AddDevicePopUpd from './components/addDevicePopUpd'
const rowKey = 'id'
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
    obtainEquipmentBrand,
    otherSystemDepartments,
    echoBoundData
  } = monitorPageStore
  const { allDictionary } = commonStore
  const intervalRef = useRef<any>(null)

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
  const [modifyAndAdd, setModifyAndAdd] = useState(true) //用于判断是修改还是新增
  const [count, changeCount] = useState(5) //定时器
  const [pageSize, setPageSize] = useState(10) //
  const [numberofequipment, setNumberofequipment] = useState(false) //
  const [equipmentDepartmentValue, setEquipmentDepartmentValue] = useState()
  const [errorStatus, setErrorstatus] = useState('')
  const [departmentPop, setDepartmentPop] = useState(false) //选择部门弹窗
  const [agreementPop, setAgreementPop] = useState(null)
  const [codeAvailable, setCodeAvailable] = useState(false) //验证码
  const [production, setProduction] = useState(null)
  const [deselected, setDeselected] = useState([]) //有产使用的数据
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]) //优产绑定key值
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
  const onSearchInput = e => {
    setAgreementPop(e.target.value)
  }
  const queryClick = () => {
    setEquipmentName(agreementPop)
    if (agreementPop == 0) {
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
  // 关闭清除倒计时
  useEffect(() => {
    if (judgment === false) {
      clearInterval(intervalRef.current)
    }
  }, [judgment])
  // 数值清零 清除倒计时
  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current)
      cancellation()
    }
  }, [count])
  useEffect(() => {
    getFactoryInfo()
  }, [equipmentName, pageNum, pageSize])
  useEffect(() => {
    setIsModalVisible(false)
  }, [])
  // 编辑
  const modificationMethod = async rData => {
    setModifyAndAdd(true)
    console.log('这是编辑设备')
    const brand = await allDictionary([])
    if (brand) {
      setEquipmentbrand(brand.cameraBrand)
    }
    const { id, status } = rData
    console.log(status) //用于判断是成功还是失败
    if (status) {
      setButtonIsAvailable(false)
    } else {
      setButtonIsAvailable(true)
    }
    setModify(id)
    const singly = await singleSearch({ id })
    if (singly.code == 200) {
      form.setFieldsValue(singly.data)
    }
    const equipment = await equipmentDepartment()
    if (equipment.code == 200) {
      setDepartment(dealTypeData(equipment.data))
      let sum = dealTypeData(equipment.data)
      sum.forEach(item => {
        if (item.children.length == 0) {
        }
      })
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
      render: (value, record) => {
        if (record.orgNameList.length > 2) {
          console.log('修改')
          let sum =
            record.orgNameList[0] + '、' + record.orgNameList[1] + ' ' + '.....'
          return sum
        } else {
          return value
        }
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

          <span
            className={styles.edit}
            onClick={() => {
              accountShowModal(record.id)
            }}
          >
            绑定工票部门
          </span>
        </Space>
      )
    }
  ]
  const [form] = Form.useForm()
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
    setCodeAvailable(false)
    form.submit()
  }
  // 新增取消按钮事件
  const equipmentHandleCancel = () => {
    setButtonIsAvailable(true)
    setIsModalVisible(false)
    setCodeAvailable(false)
  }
  // 设备form
  const onFinish = async (v: any) => {
    // 因为可能传递的是多个参数利用累加器
    const arr = v.orgIdList.reduce((prev, item) => {
      prev.push(findTarget(item, department))
      return prev
    }, [])
    console.log(convenience(arr).join(',').split(','))
    v.orgIdList = convenience(arr).join(',').split(',')
    if (connection) {
      //  判断是测试还是提交
      const { serialNumber, verificationCode } = v
      const ConnectingEquipment = await connectingEquipment({
        serialNumber,
        verificationCode
      })
      if (+ConnectingEquipment.data === 20014) {
        setErrorstatus('您所提交的信息有误，请确认序列号或验证码!!!')
      } else {
        setErrorstatus(ConnectingEquipment.msg)
      }
      // 200 代表连接成功
      if (+ConnectingEquipment.data === 200) {
        // 测试弹窗
        setJudgment(true)
        setIsModalVisible(false)
        setCodeAvailable(true)
        setConnectionStatus(1)
        // 启动定时器
        clearInterval(intervalRef.current)
        changeCount(5)
        intervalRef.current = setInterval(() => {
          changeCount(count => count - 1)
        }, 1000)
      } else {
        setIsModalVisible(false)
        setFailed(true)
        setConnectionStatus(0)
      }
      setConnection(false)
      setButtonIsAvailable(false)
      setBeforeModification(v)
    } else {
      // 判断是修改还是新增
      if (modifyAndAdd) {
        console.log('这是修改')
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
    setIsModalVisible(true)
  }
  //连接失败的取消
  const ConnectionFailedCancel = () => {
    setFailed(false)
    setIsModalVisible(true)
  }
  // 新增显示
  const showModal = async () => {
    setModifyAndAdd(false)
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
  const accountShowModal = async id => {
    setMoved(id)
    form.resetFields()
    const account = await bindSuperiorProductAccount()
    // 优产绑定 因为当前账号已经绑定了  用于测试
    if (account.data !== true) {
      setaceousModalVisible(true)
    } else {
      setCheckedKeys(null) //清空
      setDepartmentPop(true)
      const productionDep = await obtainEquipmentBrand() //部门数据
      const boundData = await echoBoundData({ cameraId: id }) //回显绑定的部门
      console.log(boundData.data) //接口犯返回来的数据

      if (boundData.code === 200) {
        // 修改接口的数据名称
        const ModifyDataName = data => {
          data.forEach(item => {
            if (item != null) {
              item.key = item.deptId
              item.title = item.deptName
              if (Array.isArray(item.children) && item.children.length) {
                ModifyDataName(item.children)
              }
            }
          })
          return data
        }

        setProduction(ModifyDataName(productionDep))

        setCheckedKeys(boundData.data)
        // 获取所有的数据，包括子项
        const cesta = data => {
          let sum = []
          if (Array.isArray(data)) {
            data.forEach(item => {
              sum.push({ deptId: item.deptId, deptName: item.deptName })
              if (Array.isArray(item.children)) {
                item.children.forEach(v => {
                  sum.push(v)
                })
              }
            })
            return sum
          }
        }
        console.log(cesta(productionDep))

        // 根据接口传过来的id进行过滤，获取对应的对象
        const echoBoundName = boundData.data.map(item => {
          return cesta(productionDep).filter(v => v.deptId == item)[0]
        })
        setDeselected(echoBoundName) //因为我要获取的是id对应的名字
      }
    }
  }

  const DepartmentPopOk = async () => {
    const res = await otherSystemDepartments({
      cameraId: moved,
      orgIdList: checkedKeys,
      orgType: 1
    })
    if (res === true) {
      setDepartmentPop(false)
    }
  }
  const DepartmentPopCancel = () => {
    setDepartmentPop(false)
    setDeselected(null)
    setCheckedKeys(null)
  }
  //优产账号form
  const onFinishProduction = async (values: any) => {
    const bindYo = await productAccount(values)
    if (bindYo) {
      setaceousModalVisible(false)
    }
  }
  const onChange = value => {
    setEquipmentDepartmentValue(value)
  }

  return (
    <div className={styles.monitor}>
      <div>{/* <TreeSelect {...tProps} /> */}</div>
      <div>
        <span className={styles.system}>监控列表</span>
      </div>
      <Divider />
      <div className={styles.header}>
        <div className={styles.equipment}>
          <div>
            <span className={styles.keynote}>
              设备关键名字
              <div className={styles.keynoteInput}>
                <Input maxLength={400} type="text" onChange={onSearchInput} />
              </div>
              <Button
                type="primary"
                className={styles.chauxn}
                onClick={queryClick}
              >
                查询
              </Button>
            </span>
          </div>

          <span className={styles.pmentkeynote}></span>

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
      {/* 新增设备弹窗 */}
      <AddDevicePopUpd
        changeCount={changeCount}
        count={count}
        toeplateSerialNumber={toeplateSerialNumber}
        toeplateVerificationCode={toeplateVerificationCode}
        buttonIsAvailable={buttonIsAvailable}
        equipmentHandleCancel={equipmentHandleCancel}
        equipmentHandleOk={equipmentHandleOk}
        onFinish={onFinish}
        isModalVisible={isModalVisible}
        form={form}
        setFailed={setFailed}
        modify={modify}
        equipmentbrand={equipmentbrand}
        department={department}
        setConnection={() => setConnection(true)}
        judgment={judgment}
        setJudgment={() => cancellation()}
        cancellation={cancellation}
        failed={failed}
        codeAvailable={codeAvailable}
        ConnectionFailedCancel={ConnectionFailedCancel}
        onChange={onChange}
        modifyAndAdd={modifyAndAdd}
        numberofequivalue={equipmentDepartmentValue}
        errorStatus={errorStatus}
      />
      {/* 绑定优产账号弹窗 */}
      {departmentPop && (
        <BindingSuperiorProduct
          deselected={deselected}
          setDeselected={setDeselected}
          departmentPop={departmentPop}
          visible={accountModalVisible}
          production={production}
          setCheckedKeys={setCheckedKeys}
          checkedKeys={checkedKeys}
          DepartmentPopCancel={DepartmentPopCancel}
          DepartmentPopOk={DepartmentPopOk}
          onFinish={onFinishProduction}
          onCancel={() => {
            setaceousModalVisible(false)
          }}
        />
        // git merge
      )}
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
