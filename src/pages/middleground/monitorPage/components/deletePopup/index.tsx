import React from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'
import { Button, Modal } from 'antd'

const DeletePopup = props => {
  const { deleteDeviceCancel, visible, onClick } = props
  return (
    <div>
      {/* 删除设备 */}
      <Modal
        className={styles.ok}
        onCancel={onClick}
        centered={true}
        footer={null}
        visible={visible}
      >
        <p>
          <Icon type="jack-ts" className={styles.menuIcon} />
        </p>
        <p style={{ fontSize: 18 }}>删除设备</p>
        <p className={styles.current}>确认将当前设备删除</p>
        <p>
          <Button className={styles.cancels} onClick={onClick}>
            取消
          </Button>

          <Button
            className={styles.deleteDeviceCancels}
            type="primary"
            onClick={deleteDeviceCancel}
          >
            确认
          </Button>
        </p>
      </Modal>
    </div>
  )
}
export default DeletePopup
