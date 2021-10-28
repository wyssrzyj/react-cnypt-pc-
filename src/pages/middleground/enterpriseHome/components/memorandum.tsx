import React, { useState } from 'react'
import styles from './memorandum.module.less'
import { Calendar, Badge, Button, Modal, Input } from 'antd'
import { Icon } from '@/components'
import { Title } from '../../controlPanel/accountSafe'

const { TextArea } = Input

const BtnIcon = <Icon type={'jack-jian1'} className={styles.btnIcon}></Icon>

const Memorandum = () => {
  const [visible, setVisible] = useState(false)

  const getlistData = value => {
    let listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' }
        ]
        break
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' }
        ]
        break
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' }
        ]
        break
      default:
    }
    return listData || []
  }

  const dateCellRender = value => {
    const listData = getlistData(value)
    // const listData = []
    if (listData.length) {
      const target = listData[0]
      return (
        <div className={styles.badgeBox}>
          <Badge status={target.type} />
        </div>
      )
    }
  }

  const onChange = event => {
    console.log(event)
  }

  const showModal = () => {
    setVisible(f => !f)
  }

  return (
    <div className={styles.memorandum}>
      <Title title={'备忘录'}></Title>
      <div className={styles.content}>
        <Calendar
          onChange={onChange}
          dateCellRender={dateCellRender}
          fullscreen={false}
        ></Calendar>
        {false ? (
          <div className={styles.empty}>您还没有添加任何事件哦 ~</div>
        ) : (
          <div className={styles.todoList}>
            <Badge status={'success'} />
            <div>要做什么事</div>
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
            <TextArea rows={4}></TextArea>
          </div>
          <div className={styles.btnBox}>
            <Button className={styles.modalBtn} onClick={showModal}>
              取消
            </Button>
            <Button
              className={styles.modalBtn}
              type={'primary'}
              onClick={showModal}
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
