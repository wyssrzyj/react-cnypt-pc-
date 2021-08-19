import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useStores } from '@/utils/mobx'
import './style.less'

const { Dragger } = Upload
const { NODE_ENV } = process.env

const hosts = new Map()
hosts.set('development', 'http://8.136.225.110:8888/')
hosts.set('test', 'http://8.136.225.110:8888/')
hosts.set('production', 'http://47.97.217.13:8888/')

const ImportModal = props => {
  const { visible, handleCancel, field } = props
  const { erpModuleStore } = useStores()
  const { importOther } = erpModuleStore
  const [errResult, setErrResult] = useState<string>('')
  const [codeNumber, setCodeNumber] = useState<number>(0)

  const customRequest = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'basic-service')
    const res = await importOther(field, formData)
    const { success, msg, code } = res
    setCodeNumber(code)

    if (success) {
    } else {
      setErrResult(msg)
    }
  }

  const handleSelfOk = () => {}

  const downLoad = () => {
    window.open(`${hosts.get(NODE_ENV)}api/basic/${field}/export-template`)
  }

  return (
    <Modal
      title="导入"
      visible={visible}
      onOk={handleSelfOk}
      onCancel={handleCancel}
      wrapClassName="importModal"
    >
      {codeNumber === 0 && (
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
