// 加工厂首页
import React from 'react'
import BasciInfo from './components/basicInfo'
import Header from './components/header'
import Memorandum from './components/memorandum'
import Todo from './components/todo'
import styles from './index.module.less'

const FactoryHome = () => {
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

  const basicConfigs = [
    {
      label: '待确认订单数',
      icon: 'jack-dqrdd',
      field: '',
      count: 0,
      color: '#FFE9ED'
    },
    {
      label: '待绑定订单数',
      icon: 'jack-dbddd',
      field: '',
      count: 0,
      color: '#E4EEFF'
    },
    {
      label: '进行中订单数',
      icon: 'jack-jxzdd',
      field: '',
      count: 0,
      color: '#EEE5FF'
    },

    {
      label: '已完成订单数',
      icon: 'jack-ywcdd',
      field: '',
      count: 0,
      color: '#D7F0E2'
    }
  ]

  return (
    <div className={styles.container}>
      <Header rightConfigs={rightConfigs}></Header>
      <BasciInfo configs={basicConfigs} title={'订单数据'}></BasciInfo>
      <div className={styles.main}>
        <Todo></Todo>
        <Memorandum></Memorandum>
      </div>
    </div>
  )
}

export default FactoryHome
