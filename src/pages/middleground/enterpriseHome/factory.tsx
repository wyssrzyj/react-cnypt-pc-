// 加工厂首页
import React, { useEffect, useState } from 'react'

import BasciInfo from './components/basicInfo'
import Header from './components/header'
import Memorandum from './components/memorandum'
import Todo from './components/todo'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'

const FactoryHome = () => {
  const userInfo = getUserInfo() || {}
  const { enterpriseId } = userInfo

  const { demandListStore } = useStores()
  const { processingPlantOrderReceivingManagementOrderQuantity } =
    demandListStore
  const [basicConfigs, setbasicConfigs] = useState([])

  useEffect(() => {
    api()
  }, [])

  const api = async () => {
    if (enterpriseId !== null) {
      let arr = await processingPlantOrderReceivingManagementOrderQuantity()
      const data = [
        {
          label: '新订单',
          icon: 'jack-dqrdd',
          field: '',
          count: arr.enterpriseNewOrderNum,
          color: '#FFE9ED'
        },
        {
          label: '待反馈订单',
          icon: 'jack-dbddd',
          field: '',
          count: arr.enterprisePendingFeedbackTotalNum,
          color: '#E4EEFF'
        },
        {
          label: '已确认订单数',
          icon: 'jack-jxzdd',
          field: '',
          count: arr.enterpriseConfirmeTotalNum,
          color: '#EEE5FF'
        },

        {
          label: '被谢绝订单数',
          icon: 'jack-ywcdd',
          field: '',
          count: arr.enterpriseDeclineTotalNum,
          color: '#D7F0E2'
        }
      ]

      setbasicConfigs(data)
    }
  }
  const rightConfigs = [
    {
      icon: 'jack-shoucang',
      label: '收藏数',
      count: 0,
      field: ''
    },
    {
      icon: 'jack-fangke',
      label: '访客数',
      count: 0,
      field: ''
    },
    {
      icon: 'jack-liulan',
      label: '浏览量',
      count: 0,
      field: ''
    }
  ]

  return (
    <div className={styles.container}>
      <Header rightConfigs={rightConfigs}></Header>
      <div> 　</div>
      {enterpriseId !== null ? (
        <BasciInfo configs={basicConfigs} title={'订单数据'}></BasciInfo>
      ) : null}
      <div className={styles.main}>
        <Todo></Todo>
        <Memorandum></Memorandum>
      </div>
    </div>
  )
}

export default FactoryHome
