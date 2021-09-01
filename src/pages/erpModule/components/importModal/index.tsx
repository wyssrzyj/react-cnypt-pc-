import React, { useState } from 'react'
import { Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useStores } from '@/utils/mobx'
import './style.less'

const { Dragger } = Upload

const ImportModal = props => {
  const { visible, handleCancel, field, handleOk } = props
  const { erpModuleStore } = useStores()
  const { importOther, exportOther } = erpModuleStore
  const [errResult, setErrResult] = useState<string>('')
  const [codeNumber, setCodeNumber] = useState<number>(0)

  const customRequest = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'basic-service')
    const res = await importOther(field, formData)
    const { success, msg, code } = res
    setCodeNumber(code)
    message[success ? 'success' : 'error'](msg)
    if (success) {
      setTimeout(() => {
        handleCancel()
        handleOk()
      }, 1000)
    } else {
      setErrResult(msg)
    }
  }

  const downLoad = () => {
    exportOther().then(res => {
      let blob = new Blob([res], { type: 'application/octet-stream' })
      let download = document.createElement('a')
      download.href = window.URL.createObjectURL(blob)
      download.download = `${field}Template.xls`
      download.click()
      window.URL.revokeObjectURL(download.href)
    })
  }

  return (
    <Modal
      title="导入"
      visible={visible}
      onOk={handleCancel}
      onCancel={handleCancel}
      wrapClassName="importModal"
    >
      {codeNumber !== 400 && (
        <Dragger name="file" customRequest={customRequest}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
          <p className="ant-upload-hint">
            支持单个xlsx文件，且单个文件不超过 10M。
          </p>
        </Dragger>
      )}
      {codeNumber === 400 && (
        <div className="errResult">导入失败，错误原因：{errResult}</div>
      )}
      <div style={{ marginTop: 12 }}>
        <span onClick={downLoad} className={'download'}>
          下载模板
        </span>
      </div>
    </Modal>
  )
}

export default ImportModal
