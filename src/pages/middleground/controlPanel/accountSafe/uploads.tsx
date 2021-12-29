import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.less'
import CusUpload from './upload'
import { cloneDeep, isArray } from 'lodash'

const UploadFile = ({ onChange, imgUrl }) => {
  const uploadRef: any = useRef()
  const [params, setParams] = useState<any>({})
  useEffect(() => {
    if (imgUrl !== null) {
      setParams({ imageUrl: [{ thumbUrl: imgUrl }] })
    }
  }, [imgUrl])
  const uploadFile = () => {
    uploadRef.current.click()
  }
  const valuesChange = (key, value) => {
    const newParams = cloneDeep(params)
    newParams[key] = value
    setParams(newParams)
    console.log('传递的值', newParams)

    onChange && onChange(newParams.imageUrl[0].thumbUrl)
    const arr = [
      'sewingMachineImage',
      'overlockMachineImage',
      'cuttingBedImage',
      'spreaderImage',
      'hangImage',
      'clothInspectingMachineImage',
      'flatSeamingMachineImage'
    ]
    if (arr.includes(key)) {
      if (isArray(value) && value.length > 0) {
        // nErrors.equipment = false
      } else {
        // nErrors.equipment = true
      }
    }
    // setErrors(null)
  }
  return (
    <div>
      <CusUpload
        maxCount={1}
        fileList={params['imageUrl'] || []}
        valuesChange={value => valuesChange('imageUrl', value)}
      ></CusUpload>
      <div className={styles.avatarText} onClick={uploadFile}>
        修改头像
      </div>
    </div>
  )
}

export default UploadFile
