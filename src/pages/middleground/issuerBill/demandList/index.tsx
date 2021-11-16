import React, { useEffect, useState } from 'react'
import Tab from './components/Tab'
import Query from './components/query'
import styles from './index.module.less'
import Sort from './components/sort'
import MultipleChoice from './components/multipleChoice'
import { Pagination } from 'antd'
import { cloneDeep } from 'lodash'
import { useStores, toJS, observer } from '@/utils/mobx'
import { timestampToTime, remainingTime, ToTime } from './components/time'
import { getTrees } from './method'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

const DemandList = () => {
  const { push } = useHistory()
  const location = useLocation()
  const { search } = location
  const searchURL = new URLSearchParams(search)
  const initialKey = searchURL.get('key')

  const defaultCurrent = 1
  const defaultPageSize = 10

  const { demandListStore, factoryStore, commonStore } = useStores()
  const { productCategoryList } = factoryStore
  const { dictionary } = commonStore
  const {
    // processType = [],
    inquiryProcessType = []
  } = toJS(dictionary)
  const treeData = productCategoryList //商品品类

  const { listData, deleteDemandDoc, toppingFunction, endInterfaceInAdvance } =
    demandListStore

  const [reallylists, setReallyLists] = useState([]) //数据
  // const [allChecked, setAllChecked] = useState(false) //全选的状态
  const [numberLength, setNumberLength] = useState(1) //页码长度
  const [noOrders, setNoOrders] = useState(0) //没有订单
  const [pageNumber, setPageNumber] = useState(1) //分页

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    status: initialKey
  })

  useEffect(() => {
    listsAPI()
  }, [params])
  // const filterData = value => {
  //   //  过滤出需要的数据 并返回
  //   const res = processType.filter(item => item.value === value)
  //   return res
  // }
  // const handle = v => {
  //   let sum = [] //定义一个空数组
  //   v.forEach(item => {
  //     const res = item.processTypeList.reduce((total, current) => {
  //       total.push(filterData(current)[0])
  //       return total // 将过滤后的数据放到一起 并return出去
  //     }, [])
  //     res.forEach(element => {
  //       sum.push(element.label) //获取主要的数据
  //     })
  //   })
  //   return sum
  // }
  const handle = v => {
    return getTrees(v, inquiryProcessType, 'value', 'label')
  }

  const listsAPI = async () => {
    const res = await listData(params) //待会设置页码之类的
    setNumberLength(res.total)

    if (Array.isArray(res.records)) {
      res.records.forEach(item => {
        item.checked = false
        item.processing = handle(item.processTypeList)
        item.time = ToTime(item.inquiryEffectiveDate)

        item.releaseTime = timestampToTime(item.releaseTime)
        item.categoryIdList = getTrees(
          item.categoryIdList,
          toJS(treeData),
          'id',
          'name'
        )
        item.surplus = remainingTime(item.inquiryEffectiveDate)
      })
      setNoOrders(res.records.length)
      setReallyLists(res.records)
    }
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
  //  排序
  const sortCallback = value => {
    const newParams = cloneDeep(params)
    const keys = Reflect.ownKeys(value)
    keys.forEach(item => {
      newParams[item] = value[item]
    })
    setParams(newParams)
  }
  // 查询
  const queryMethod = value => {
    if (value.DemandSheet || value.password.length > 0) {
      const res = {
        name: value.DemandSheet,
        releaseTimeStart: new Date(value.password[0]).getTime(),
        releaseTimeEnd: new Date(value.password[1]).getTime()
      }
      const newParams = cloneDeep(params)
      const keys = Reflect.ownKeys(res)
      keys.forEach(item => {
        newParams[item] = res[item]
      })
      setParams(newParams)
    } else {
      setParams({ pageNum: 1, pageSize: defaultPageSize })
    }
  }
  // // 全选
  // const onChange = e => {
  //   setAllChecked(!allChecked)
  //   reallylists.forEach(item => {
  //     item.checked = e.target.checked
  //   })
  // }
  // // 单选
  // const dataChoose = (checked, index) => {
  //   const newDataSource = cloneDeep(reallylists)
  //   newDataSource[index].checked = checked //
  //   setReallyLists(newDataSource)
  //   const flag = newDataSource.every(item => item.checked === true) //
  //   setAllChecked(flag)
  // }
  // 分页
  const paging = pageNumber => {
    setPageNumber(pageNumber)
    setParams({
      pageNum: pageNumber,
      pageSize: defaultPageSize,
      status: initialKey
    })
  }
  //置顶
  const topping = async value => {
    // console.log('置顶', value)

    await toppingFunction(value)
    listsAPI()
  }
  //再来一单
  const oneMoreOrder = async e => {
    push({
      pathname: '/control-panel/issuerBill/demand-sheet',
      state: { id: e }
    })
  }
  // 查看订单信息
  const DemandOrderDetail = e => {
    console.log('查看订单信息')
    push({ pathname: '/control-panel/orderDetails', state: { id: e } })
  }
  //提前结束
  const earlyEnd = async e => {
    const res = await endInterfaceInAdvance({ id: e, status: -3 })
    if (res.code === 200) {
      listsAPI()
    }
  }
  // 结束订单
  const deleteRecord = async value => {
    const res = await deleteDemandDoc({ id: value })
    if (res.code === 200) {
      listsAPI()
    }
  }
  // //批量结束
  // const BatchEnd = async () => {
  //   //  点记得时候获取勾选的数据，获取id掉接口进行操作
  //   const reduceIds = reallylists.filter(item => item.checked) //用选中的数据来过滤出
  //   const ids = reduceIds.reduce((prev, item) => {
  //     prev.push(item.id)
  //     return prev
  //   }, [])

  //   if (ids.length > 0) {
  //     console.log(ids)

  //     const res = await deleteDemandDoc({ id: ids })
  //     if (res.code === 200) {
  //       listsAPI()
  //     }
  //   } else {
  //     message.error('请至少选择一个')
  //   }
  // }
  return (
    <div className={styles.demand}>
      <section>
        <Tab routing={routingData} />
        <Query query={queryMethod} />
        <Sort callback={sortCallback} />
        {noOrders > 0 ? (
          <>
            {reallylists.map((item, index) => {
              return (
                <MultipleChoice
                  earlyEnd={earlyEnd}
                  DemandOrderDetail={DemandOrderDetail}
                  oneMoreOrder={oneMoreOrder}
                  toppingMethod={topping}
                  // callback={event => dataChoose(event.target.checked, index)}
                  key={index}
                  data={item}
                  deleteRecord={deleteRecord}
                />
              )
            })}
            {/* <div className={styles.selectric}>
              <Checkbox onChange={onChange} checked={allChecked} />
              <div className={styles.eatchEnd}>
                <Popconfirm
                  onConfirm={() => {
                    BatchEnd()
                  }}
                  title="是否确认删除？"
                  okText="是"
                  cancelText="否"
                >
                  <Button type="primary">批量结束</Button>
                </Popconfirm>
              </div>
            </div> */}
            <div className={styles.paginationBox}>
              <Pagination
                style={{
                  height: '32px',
                  lineHeight: '32px',
                  textAlign: 'center'
                }}
                current={pageNumber}
                defaultCurrent={defaultCurrent}
                total={numberLength}
                onChange={paging}
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
