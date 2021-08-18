import React from 'react'
import { Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useStores } from '@/utils/mobx'

const { Dragger } = Upload

const ImportModal = props => {
  const { visible, handleCancel, field } = props
  const { erpModuleStore } = useStores()
  const { importOther } = erpModuleStore
  // const DraggerProps = {
  //   name: 'file',
  //   // multiple: true,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList)
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`)
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`)
  //     }
  //   },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files)
  //   }
  // }

  const customRequestCard = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'basic-service')
    const res = await importOther(field, formData)
    console.log('🚀 ~ file: index.tsx ~ line 37 ~ customRequestCard ~ res', res)
    // const { url } = res
  }

  const handleSelfOk = () => {}

  return (
    <Modal
      title="导入"
      visible={visible}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Dragger name="file" customRequest={customRequestCard}>
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
