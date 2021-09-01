import React from 'react'
import { Modal } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames'
import UNBIND_SVG from './imgs/unbind.svg'

const textMap = new Map()
textMap.set(1, '解绑后，该邮箱将无法收到消息')
textMap.set(2, '解绑后，将无法通过微信/支付宝快捷登录')
textMap.set(3, '解绑后，优产对应订单将无法获取最新数据')

const titleMap = new Map()
titleMap.set(1, '解绑邮箱')
titleMap.set(2, '解绑微信/支付宝')
titleMap.set(3, '解绑优产')

const UnbindModal = ({ cancel, index }) => {
  const onCancel = () => {
    cancel && cancel()
  }

  const onOk = () => {
    onCancel()
  }

  return (
    <Modal
      centered
      visible={true}
      title={titleMap.get(index)}
      wrapClassName={classNames(styles.pwdModal)}
      okText={'确定'}
      cancelText={'取消'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className={styles.unbindBox}>
        <img className={styles.unbindImg} src={UNBIND_SVG} alt="" />
        <div className={styles.unbindText}>{textMap.get(index)}</div>
        <div className={styles.unbindText}>请您确认是否解除绑定</div>
      </div>
    </Modal>
  )
}

export default UnbindModal
