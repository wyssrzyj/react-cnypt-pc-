import React from 'react'
import { Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const ImportModal = props => {
  const { visible, handleCancel } = props
  const DraggerProps = {
    name: 'file',
    // multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  const handleSelfOk = () => {}

  return (
    <Modal
      title="导入"
      visible={visible}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Dragger {...DraggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
        <p className="ant-upload-hint">
          支持单个xlsx文件，且单个文件不超过 10M。
        </p>
      </Dragger>
    </Modal>
  )
}

export default ImportModal
