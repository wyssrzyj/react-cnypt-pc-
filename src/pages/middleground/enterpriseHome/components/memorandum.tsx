import React, { useState, useEffect } from 'react'
import styles from './memorandum.module.less'
import { Calendar, Badge, Button, Modal, Input } from 'antd'
import { Icon } from '@/components'
import { Title } from '../../controlPanel/accountSafe'
import moment from 'moment'
import { useStores } from '@/utils/mobx'
// import { isEmpty } from 'lodash'
import { getCurrentUser } from '@/utils/tool'

const { TextArea } = Input

const BtnIcon = <Icon type={'jack-jian1'} className={styles.btnIcon}></Icon>

const Memorandum = () => {
  const { demandListStore } = useStores()
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const { memorandumAdded, memorandumContent, allMemos } = demandListStore

  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('') //输入内容||选中的内容
  const [timeStamp, seTtimeStamp] = useState<any>() //时间戳
  const [interfaceReturnContent, setInterfaceReturnContent] = useState<any>('') //接口返回内容
  const [currentMonthData, setCurrentMonthData] = useState<any>([]) //当月数据
  const [selectData, setSelectData] = useState<any>() //选中的数据

  useEffect(() => {
    var date = Date.now()
    onSelect(date)
    getCurrentMonthData(date)
  }, [])

  const getCurrentMonthData = async e => {
    let allContent = await allMemos({ eventCreateTime: e, userId: userId })
    if (allContent || []) {
      const data = allContent.map(item => {
        item.state = moment(item.eventCreateTime).format('DD')
        return item
      })
      setCurrentMonthData(data)
    }
  }

  const getlistData = value => {
    console.log(
      '🚀 ~ file: memorandum.tsx ~ line 46 ~ Memorandum ~ value',
      value
    )
    // console.log(value.date()) //1-31
    let listData = []
    console.log(currentMonthData)

    currentMonthData.map(item => {
      if (Number(item.state) === value.date()) {
        listData = [{ type: 'success' }]
      }
    })
    return listData || []
  }

  const dateCellRender = value => {
    const listData = getlistData(value)
    if (listData.length) {
      const target = listData[0]

      return (
        <div className={styles.badgeBox}>
          <Badge status={target.type} />
        </div>
      )
    }
  }
  // 新增
  const showModal = async type => {
    if (type === 'ok' && timeStamp && text) {
      await memorandumAdded({
        eventCreateTime: timeStamp,
        eventContent: text,
        id: selectData ? selectData.id : ''
      })
      setInterfaceReturnContent(text) //文字显示

      getCurrentMonthData(moment(moment(timeStamp).format('YYYY-MM')).valueOf()) //图标显示
      // setText(null) //清空文字
      setVisible(f => !f)
    } else {
      setVisible(f => !f)
    }
  }

  const monthCellRender = value => {
    const num = getMonthData(value)
    return num ? <div className="notes-month"></div> : null
  }
  const getMonthData = value => {
    if (value.month() === 8) {
      return 1394
    }
  }
  // 日期点击事件
  const onSelect = async e => {
    seTtimeStamp(moment(e).valueOf())
    let arr = await memorandumContent({
      eventCreateTime: moment(e).valueOf(),
      userId: userId
    })
    setText(arr ? arr.eventContent : null)
    setSelectData(arr)

    setInterfaceReturnContent(arr !== null ? arr.eventContent : '暂无')
    getCurrentMonthData(moment(moment(e).format('YYYY-MM')).valueOf()) //点击获取当月的数据
  }

  const btn = e => {
    setText(e.target.value)
  }

  return (
    <div className={styles.memorandum}>
      <Title title={'备忘录'}></Title>
      <div className={styles.content}>
        <Calendar
          onSelect={onSelect}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          fullscreen={false}
        ></Calendar>
        {false ? (
          <div className={styles.empty}>您还没有添加任何事件哦 ~</div>
        ) : (
          <div className={styles.todoList}>
            <Badge status={'success'} />
            <div>{interfaceReturnContent}</div>
          </div>
        )}
        <div>
          <Button
            type={'primary'}
            icon={BtnIcon}
            className={styles.btn}
            onClick={showModal}
          >
            添加事件
          </Button>
        </div>
      </div>

      {visible ? (
        <Modal
          centered
          footer={null}
          visible={visible}
          title={<Title title={'添加事件'}></Title>}
          onCancel={showModal}
          wrapClassName={'addEventModal'}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalLabel}>事件内容</div>
            <TextArea
              rows={4}
              onChange={btn}
              defaultValue={text ? text : ''}
            ></TextArea>
          </div>
          <div className={styles.btnBox}>
            <Button className={styles.modalBtn} onClick={showModal}>
              取消
            </Button>
            <Button
              className={styles.modalBtn}
              type={'primary'}
              onClick={() => {
                showModal('ok')
              }}
            >
              确认
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default Memorandum
