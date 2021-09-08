// 发单商首页
import React from 'react'
import BasciInfo from './components/basicInfo'
import Header from './components/header'
import Memorandum from './components/memorandum'
import Todo from './components/todo'
import styles from './index.module.less'

const BusinessHome = () => {
  const rightConfigs = [
    {
      icon: 'jack-shoucang',
      label: '收藏数',
      count: 6,
      field: ''
    },
    {
      icon: 'jack-fangke',
      label: '访客数',
      count: 56,
      field: ''
    }
  ]

  const basicConfigs = [
    {
      label: '待确认订单数',
      icon: 'jack-dqrdd',
      field: '',
      count: 10000,
      color: '#FFE9ED'
    },
    {
      label: '进行中订单数',
      icon: 'jack-jxzdd',
      field: '',
      count: 10000,
      color: '#EEE5FF'
    },
    {
      label: '已完成订单数',
      icon: 'jack-ywcdd',
      field: '',
      count: 10000,
      color: '#D7F0E2'
    },
    {
      label: '新增需求',
      type: 'add',
      callback: () => {}
    },
    {
      label: '新增订单',
      type: 'add',
      callback: () => {}
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