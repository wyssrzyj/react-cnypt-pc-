import React, { useEffect, useState } from 'react'
import Tab from './components/Tab'
import Query from './components/query'
import styles from './index.module.less'
import Sort from './components/sort'
import MultipleChoice from './components/multipleChoice'
import { Pagination } from 'antd'
import { useStores, observer } from '@/utils/mobx'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

function DemandList() {
  const { push } = useHistory()

  const defaultPageSize = 10
  const defaultCurrent = 1

  const { demandListStore } = useStores()
  const {
    applicationList,
    topOfapplicationList,
    deleteIssuer,
    declineRequisition,
    confirmCooperation,
    cancelCooperation
  } = demandListStore
  const location = useLocation()
  const { search } = location

  const [lists, setLists] = useState([]) //数据
  const [dataLength, setDataLength] = useState(0) //数据总数量
  const [pageNumber, setPageNumber] = useState(1) //路由数

  const searchURL = new URLSearchParams(search)
  const initialKey = searchURL.get('key')
  const [params, setParams] = useState({
    pageNum: pageNumber,
    pageSize: defaultPageSize,
    status: initialKey
  })
  useEffect(() => {
    InterfaceData()
  }, [params])

  const InterfaceData = async () => {
    const res = await applicationList(params)
    if (res.code === 200) {
      setDataLength(res.data.total)
      setLists(res.data.records)
    }
  }
  // 排序
  const sortCallback = value => {
    console.log(value)
  }
  // 查询
  const queryMethod = value => {
    console.log(value)
    value.releaseTimeStart = new Date(value.issuingTime[0]).getTime()
    value.releaseTimeEnd = new Date(value.issuingTime[1]).getTime()
    setParams({ ...params, ...value })
  }
  //分页
  const pageChange = page => {
    setPageNumber(page)
    setParams({
      pageNum: page,
      pageSize: defaultPageSize,
      status: initialKey
    })
  }
  // 路由数据
  const routingData = value => {
    setParams({
      pageNum: 1,
      pageSize: defaultPageSize,
      status: value
    })
    setPageNumber(1)
  }
  //置
  const toppingMethod = async value => {
    const res = await topOfapplicationList(value)
    console.log(res)
    if (res.code === 200) {
      InterfaceData()
    }
  }
  // 谢绝
  const earlyEnd = async e => {
    console.log(e)
    const res = await declineRequisition({ id: e, status: -2 })
    console.log(res)
    if (res.code === 200) {
      InterfaceData()
    }
  }
  //确认合作
  const InitiateOrder = async e => {
    const res = await confirmCooperation({ id: e, status: 3 })
    if (res.code === 200) {
      InterfaceData()
    }
  }
  // 取消合作
  const reOrder = async e => {
    const res = await cancelCooperation({ id: e, status: 2 })
    if (res.code === 200) {
      InterfaceData()
    }
  }
  // 删除
  const deleteMethod = async id => {
    console.log('删除', id)

    const res = await deleteIssuer({ supplierInquiryId: id })
    if (res.code === 200) {
      InterfaceData()
    }
  }
  // 详情
  const demandSheetDetails = e => {
    console.log('查看订单信息')
    push({ pathname: '/control-panel/panel/orderDetails', search: 'id=' + e })
  }

  return (
    <div className={styles.demand}>
      <div className={styles.top}>申请列表</div>
      <section>
        <Tab routing={routingData} />
        <Query query={queryMethod} />
        <Sort callback={sortCallback} />
        {dataLength > 0 ? (
          <>
            {lists.map((item, index) => {
              return (
                <MultipleChoice
                  deleteMethod={deleteMethod}
                  InitiateOrder={InitiateOrder}
                  earlyEnd={earlyEnd}
                  demandSheetDetails={demandSheetDetails}
                  reOrder={reOrder}
                  toppingMethod={toppingMethod}
                  // callback={event => dataChoose(event.target.checked, index)}
                  key={index}
                  data={item}
                />
              )
            })}

            <div className={styles.paginationBox}>
              <Pagination
                style={{
                  height: '32px',
                  lineHeight: '32px',
                  textAlign: 'center'
                }}
                defaultCurrent={defaultCurrent}
                total={dataLength}
                current={pageNumber}
                onChange={pageChange}
              />
            </div>
          </>
        ) : (
          <div className={styles.emptyBox}>
            <img src={ORDER_EMPTY} alt="" className={styles.orderEmpty} />
            <div className={styles.emptyText}>您还没有订单哦~</div>
          </div>
        )}
      </section>
    </div>
  )
}

export default observer(DemandList)
