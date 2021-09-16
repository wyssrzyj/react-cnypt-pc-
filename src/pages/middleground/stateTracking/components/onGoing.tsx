import React, { useEffect, useState } from 'react'
import { Title } from '../../controlPanel/accountSafe'
import styles from './onGoing.module.less'
import { Table, Col } from 'antd'
import { getUId } from '@/utils/tool'
import { Icon } from '@/components'
import classNames from 'classnames'
import { useStores, observer } from '@/utils/mobx'

// const data = [
//   {
//     color: '白色',
//     size: 'M',
//     num: 100
//   },
//   {
//     color: '花色',
//     size: 'L',
//     num: 100
//   },
//   {
//     color: '黄色',
//     size: 'XL',
//     num: 100
//   },
//   {
//     color: '白色',
//     size: 'XXL',
//     num: 100
//   },
//   {
//     color: '米色',
//     size: 'M',
//     num: 20
//   },
//   {
//     color: '米色',
//     size: 'XXXL',
//     num: 50
//   },
//   {
//     color: '黑色色',
//     size: 'XXXL',
//     num: 100
//   }
// ]

const formatData = data => {
  return data.reduce((prev, item) => {
    let index
    const target = prev.find((i, idx) => {
      if (item.color === i.color) {
        index = idx
        return true
      }
      return false
    })
    const size = item.size

    if (target) {
      if (!target[size]) {
        target[size] = item.num
      }
      target[size] = Number(item.num) + target[size] ? Number(target[size]) : 0

      const keys = Reflect.ownKeys(target)

      const total = keys.reduce((p, i) => {
        if (!['color', 'total', 'uid'].includes(i as string)) {
          return p + target[i]
        }
        return p
      }, 0)

      target.total = total
      prev[index] = target
      return prev
    }

    prev.push({
      [item.size]: Number(item.num),
      color: item.color,
      total: Number(item.num),
      uid: getUId()
    })
    return prev
  }, [])
}

const dealColumns = (data, length) => {
  const initColumns = [
    {
      title: '颜色/尺码',
      align: 'center',
      width: 100,
      dataIndex: 'color'
    }
  ]

  const cloumnsFields = data.reduce((prev, item) => {
    prev.push(item.size)
    return prev
  }, [])

  const cloumnsBody: any[] = Array.from(new Set(cloumnsFields)).map(item => ({
    title: item,
    align: 'center',
    dataIndex: item
  }))
  if (Array.isArray(cloumnsBody) && cloumnsBody.length) {
    cloumnsBody.forEach((column, index) => {
      column.render = (val, row, idx) => {
        const obj = {
          children:
            idx === length - 1 ? (
              <Col span={4} className={styles.tableTotal}>
                {row.total}
              </Col>
            ) : (
              val
            ),
          props: { colSpan: 1 }
        }
        if (idx === length - 1) {
          obj.props.colSpan = !index ? cloumnsBody.length + 1 : 0
        }
        return obj
      }
    })
  }

  const columnsTotal = [
    {
      title: '小计',
      align: length ? 'center' : 'left',
      dataIndex: 'total',
      render: (val, _row, idx) => {
        const obj = {
          children: val,
          props: { colSpan: 1 }
        }
        if (idx === length - 1) {
          obj.props.colSpan = 0
        }
        return obj
      }
    }
  ]
  const targetColumns = [].concat(initColumns, cloumnsBody, columnsTotal)
  return targetColumns || []
}

const OnGoing = () => {
  const { orderStore } = useStores()
  const { stateTrackData } = orderStore

  const [columns, setColumns] = useState([])
  const [progressKey, setProgressKey] = useState('productionDetail')
  const [dataSource, setDataSource] = useState([])

  const logisticsConfigs = [
    { label: '物流公司', field: 'express' },
    { label: '订单号', field: 'postid' },
    { label: '发货日期', field: 'c' },
    { label: '收货地址', field: 'd' }
  ]

  const logisticsData = {
    a: '百世汇通',
    b: 'FHD00019',
    c: '2021-05-25',
    d: '北京市东城区和平里东街11号航星科技园航星3号楼5层'
  }

  const progressConfigs = [
    {
      label: '生产单',
      field: 'productionDetail',
      icon: 'jack-textile-products',
      totalField: 'totalProductionNum'
    },
    {
      label: '裁剪',
      field: 'cutDetail',
      icon: 'jack-cut',
      totalField: 'totalCutNum'
    },
    {
      label: '车缝',
      field: 'ticketDetail',
      icon: 'jack-component',
      totalField: 'totalTicketNum'
    },
    {
      label: '质检',
      field: 'qualifiedDetail',
      icon: 'jack-banzhengfuwu',
      totalField: 'totalQualifiedNum'
    },
    {
      label: '成衣入库',
      field: 'clothesDetail',
      icon: 'jack-apparel',
      totalField: 'totalClothesNum'
    },
    {
      label: '生产单完成',
      field: 'f',
      icon: 'jack-shouhuoicon',
      totalField: 'fNum'
    }
  ]

  const changeProgressKey = field => {
    setProgressKey(field)
  }

  useEffect(() => {
    const { totalOrderSchedule = {} } = stateTrackData
    const targetData = totalOrderSchedule[progressKey] || []

    const basicData = formatData(targetData)
    basicData.length &&
      basicData.push({
        total: basicData.reduce((prev, item) => {
          return prev + item.total
        }, 0),
        color: '总计',
        uid: getUId()
      })
    setDataSource(basicData)
    setColumns(dealColumns(targetData, basicData.length))
  }, [progressKey])

  return (
    <div className={styles.goingContent}>
      <Title title={'生产进度'}></Title>
      <div className={styles.progressBox}>
        {progressConfigs.map((item, idx) => {
          const count = stateTrackData.totalOrderSchedule[item.totalField]
          let activeStatus1 = false
          let activeStatus2 = false
          if (idx < progressConfigs.length - 1) {
            activeStatus1 = progressKey === item.field
            activeStatus2 = count > 0 || progressKey === item.field
          }
          // TODO 订单是否完成
          if (idx === progressConfigs.length - 1) {
            activeStatus1 = progressKey === item.field
            activeStatus2 =
              stateTrackData.totalOrderSchedule['state'] === 1 ||
              progressKey === item.field
          }
          return (
            <div
              className={classNames(
                styles.progressItem,
                activeStatus1 ? styles.activeProgress : ''
              )}
              key={idx}
              onClick={() => changeProgressKey(item.field)}
            >
              <Icon
                type={item.icon}
                className={classNames(
                  styles.progressIcon,
                  activeStatus2 ? styles.activeIcon : ''
                )}
              ></Icon>
              <div className={styles.progressContent}>
                <div className={styles.progressLabel}>{item.label}</div>
                {progressConfigs.length - 1 === idx ? null : (
                  <div>
                    <span className={styles.progressCount}>{count}</span>
                    &nbsp;件
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.tableBox}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={'uid'}
          pagination={false}
        ></Table>
      </div>

      <Title title={'物流信息'}></Title>
      <div className={styles.logistics}>
        {logisticsConfigs.map((item, idx) => {
          return (
            <div className={styles.logisticsItem} key={idx}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.value}>{logisticsData[item.field]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default observer(OnGoing)
