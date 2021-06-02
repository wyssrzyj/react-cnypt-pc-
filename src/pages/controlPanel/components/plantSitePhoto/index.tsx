import React from 'react'
import { Alert } from 'antd'
import styles from './index.module.less'

const messageText =
  '小提示：您可以将工厂大门图或者其他能代表企业形象的图片，设置为主图。请上传反映企业实力的现场图片，比如企业园区，各部门办公室，样品展示厅，生产车间，仓库，重要设备等图片。最多可上传 50 张，已上传 0 张，建议每张图片小于800KB，最大可上传5M，支持jpg/gif/bmp/png格式。'

const PlantSitePhoto = () => {
  return (
    <div className={styles.plantSitePhoto}>
      <Alert message={messageText} type="info" />
    </div>
  )
}

export default PlantSitePhoto
