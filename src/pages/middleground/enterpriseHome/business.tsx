// 发单商首页
import React, { useEffect, useState } from 'react'
import BasciInfo from './components/basicInfo'
import Header from './components/header'
import Memorandum from './components/memorandum'
import Todo from './components/todo'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'

// import { useHistory } from 'react-router'
// import { message } from 'antd'

const BusinessHome = () => {
  const { demandListStore } = useStores()
  const { issuerMyOrderQuantity } = demandListStore
  const [basicConfigs, setbasicConfigs] = useState([])

  useEffect(() => {
    api()
  }, [])

  const api = async () => {
    let arr = await issuerMyOrderQuantity()
    const data = [
      {
        label: '生效中',
        icon: 'jack-ywcdd',
        field: '',
        count: arr.data.inEffectNum,
        color: '#D7F0E2'
      },
      {
        label: '已结束',
        icon: 'jack-dqrdd',
        field: '',
        count: arr.data.alreadyEndNum,
        color: '#FFE9ED'
      },
      {
        label: '审核失败',
        icon: 'jack-jxzdd',
        field: '',
        count: arr.data.auditFailureNum,
        color: '#EEE5FF'
      }
    ]

    setbasicConfigs(data)
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
    }
  ]

  return (
    <div className={styles.container}>
      <Header rightConfigs={rightConfigs}></Header>
      <BasciInfo configs={basicConfigs} title={'基本信息'}></BasciInfo>
      <div className={styles.main}>
        <Todo></Todo>
        <Memorandum></Memorandum>
      </div>
    </div>
  )
}

export default BusinessHome
