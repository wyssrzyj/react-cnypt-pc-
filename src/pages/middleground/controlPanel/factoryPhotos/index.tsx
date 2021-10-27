import React, { useEffect, useState } from 'react'
import { Title } from '@/components'
import styles from './index.module.less'
import CusUpload from './upload'
import { cloneDeep, isArray } from 'lodash'
import { Button } from 'antd'
import classNames from 'classnames'
import { useStores } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'

const FactoryPhotos = () => {
  const currentUserInfo = getUserInfo()
  const { searchOrderStore } = useStores()
  const {
    saveFactoryPhotos,
    savePurchaserPhotos,
    getFactoryPhotos,
    getPurchaserPhotos
  } = searchOrderStore

  const [params, setParams] = useState<any>({})
  const [errors, setErrors] = useState<any>({
    equipment: false,
    productImagesList: false
  })

  useEffect(() => {
    ;(async () => {
      if (+currentUserInfo.enterpriseType === 0) {
        // 加工厂
        const data = await getFactoryPhotos({
          factoryId: currentUserInfo.factoryId
        })
        delete data.factoryId
        setParams(data)
      }
      if (+currentUserInfo.enterpriseType === 1) {
        // 加工厂
        const data = await getPurchaserPhotos({
          purchaserId: currentUserInfo.purchaserId
        })
        delete data.purchaserId
        setParams(data)
      }
    })()
  }, [])

  const valuesChange = (key, value) => {
    const newParams = cloneDeep(params)
    const nErrors = cloneDeep(errors)
    newParams[key] = value
    setParams(newParams)
    if (key === 'productImagesList') {
      nErrors.productImagesList =
        isArray(value) && value.length > 0 ? false : true
    }
    const arr = [
      'sewingMachineImage',
      'overlockMachineImage',
      'cuttingBedImage',
      'spreaderImage',
      'hangImage',
      'clothInspectingMachineImage',
      'flatSeamingMachineImage'
    ]
    if (arr.includes(key) && isArray(value) && value.length > 0) {
      nErrors.equipment = false
    } else {
      nErrors.equipment = true
    }

    setErrors(nErrors)
  }

  const submit = async () => {
    const nErrors = cloneDeep(errors)
    nErrors.productImagesList =
      !params.productImagesList || params.productImagesList?.length < 1
        ? true
        : false

    const arr = [
      'clothInspectingMachineImage',
      'flatSeamingMachineImage',
      'sewingMachineImage',
      'overlockMachineImage',
      'cuttingBedImage',
      'spreaderImage',
      'hangImage'
    ]
    const flag = arr.some(item => params[item]?.length > 0)
    nErrors.equipment = flag ? false : true

    setErrors(nErrors)

    console.log(params)

    if (+currentUserInfo.enterpriseType === 0 && !nErrors.equipment) {
      // 加工厂 factoryId
      params.factoryId = currentUserInfo.factoryId
      await saveFactoryPhotos(params)
    }
    if (+currentUserInfo.enterpriseType === 1 && !nErrors.productImagesList) {
      // 加工厂
      params.purchaserId = currentUserInfo.purchaserId
      await savePurchaserPhotos(params)
    }
  }

  return (
    <div className={styles.container}>
      <Title title={'企业照片'}></Title>

      {+currentUserInfo.enterpriseType === 1 && (
        <>
          <div className={styles.item}>
            <span className={styles.label}>企业宣传照：</span>
            <CusUpload
              tips={'只能上传jpg/png格式文件，最多上传3张'}
              maxCount={3}
              fileList={params['publicityImagesList']}
              valuesChange={value => valuesChange('publicityImagesList', value)}
            ></CusUpload>
          </div>
          <div className={styles.item}>
            <span className={classNames(styles.label, styles.required)}>
              产品照：
            </span>
            <div>
              <CusUpload
                tips={'只能上传jpg/png格式文件，至少上传1张，最多10张'}
                maxCount={10}
                minCount={1}
                fileList={params['productImagesList']}
                valuesChange={value => valuesChange('productImagesList', value)}
              ></CusUpload>
              {errors.productImagesList && (
                <div className={styles.errorText}>至少上传一张产品照</div>
              )}
            </div>
          </div>
        </>
      )}
      {+currentUserInfo.enterpriseType === 0 && (
        <>
          <div className={styles.item}>
            <span className={styles.label}>企业外景照：</span>
            <CusUpload
              tips={'只能上传jpg/png格式文件，最多上传3张'}
              maxCount={3}
              fileList={params['outsizeImageList']}
              valuesChange={value => valuesChange('outsizeImageList', value)}
            ></CusUpload>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>企业车间照：</span>
            <CusUpload
              tips={'只能上传jpg/png格式文件，最多上传3张'}
              maxCount={3}
              fileList={params['workshopImageList']}
              valuesChange={value => valuesChange('workshopImageList', value)}
            ></CusUpload>
          </div>

          <div className={styles.item}>
            <span className={classNames(styles.label, styles.required)}>
              设备照：
            </span>
            <div>
              <div className={styles.photos}>
                <CusUpload
                  maxCount={1}
                  fileList={params['sewingMachineImage']}
                  valuesChange={value =>
                    valuesChange('sewingMachineImage', value)
                  }
                  btnText={'平缝机'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['overlockMachineImage']}
                  valuesChange={value =>
                    valuesChange('overlockMachineImage', value)
                  }
                  btnText={'包缝机'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['flatSeamingMachineImage']}
                  valuesChange={value =>
                    valuesChange('flatSeamingMachineImage', value)
                  }
                  btnText={'绷缝机'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['cuttingBedImage']}
                  valuesChange={value => valuesChange('cuttingBedImage', value)}
                  btnText={'裁床'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['spreaderImage']}
                  valuesChange={value => valuesChange('spreaderImage', value)}
                  btnText={'铺布机'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['hangImage']}
                  valuesChange={value => valuesChange('hangImage', value)}
                  btnText={'吊挂'}
                ></CusUpload>
                <CusUpload
                  maxCount={1}
                  fileList={params['clothInspectingMachineImage']}
                  valuesChange={value =>
                    valuesChange('clothInspectingMachineImage', value)
                  }
                  btnText={'验布机'}
                ></CusUpload>
              </div>
              <div className={styles.uploadTips}>
                只能上传jpg/png格式文件，至少上传1张
              </div>
              {errors.equipment && (
                <div className={styles.errorText}>至少上传一张设备照</div>
              )}
            </div>
          </div>
        </>
      )}

      <div className={styles.btnBox}>
        <Button type={'primary'} onClick={submit}>
          保存
        </Button>
      </div>
    </div>
  )
}

export default FactoryPhotos
