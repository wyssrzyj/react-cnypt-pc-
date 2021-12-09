import React from 'react'
import { Alert, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const { Dragger } = Upload

const messageText =
  '小提示：您可以将工厂大门图或者其他能代表企业形象的图片，设置为主图。请上传反映企业实力的现场图片，比如企业园区，各部门办公室，样品展示厅，生产车间，仓库，重要设备等图片。最多可上传 50 张，已上传 0 张，建议每张图片小于800KB，最大可上传5M，支持jpg/gif/bmp/png格式。'

const PlantSitePhoto = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(_e) {}
  }

  return (
    <div className={styles.plantSitePhoto}>
      <Alert message={messageText} type="info" />
      <div className={styles.uploadPhoto}>
        <div className={styles.uploadPhotoOperate}>
          <span>
            <i className={styles.asterisk}>*</i>上传厂房现场照：
          </span>
          <div className={styles.photoDragger}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
              <p className="ant-upload-hint">
                只能上传 jpg/gif/bmp/png 文件，且不超过 5M
              </p>
            </Dragger>
          </div>
        </div>
        <div className={styles.imageList}>
          <div className={styles.imageItem}>
            <img
              src={require('@/static/images/u914.png')}
              className={styles.uploadImg}
            />
            <span className={styles.imageItemOperate}>
              <span>设为主图</span>
              <i className={styles.separator}>|</i>
              <span>删除照片</span>
            </span>
            <span className={styles.imageItemBottom}>
              <span className={styles.box}>(等待审批)</span>
              <span className={styles.box}>2021-05-27</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantSitePhoto
