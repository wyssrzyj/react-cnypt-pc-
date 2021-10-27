import React, { useState } from 'react'
import { Title } from '@/components'
import styles from './index.module.less'
import CusUpload from './upload'
import { cloneDeep, isArray } from 'lodash'
import { Button } from 'antd'
import classNames from 'classnames'

const FactoryPhotos = () => {
  const [params, setParams] = useState<any>({})
  const [errors, setErrors] = useState<any>({
    aa: false,
    equipment: false
  })

  const valuesChange = (key, value) => {
    const newParams = cloneDeep(params)
    const nErrors = cloneDeep(errors)
    newParams[key] = value
    setParams(newParams)
    if (key === 'aa') {
      nErrors.aa = isArray(value) && value.length > 0 ? false : true
    }
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    if (arr.includes(key) && isArray(value) && value.length > 0) {
      nErrors.equipment = false
    } else {
      nErrors.equipment = true
    }

    setErrors(nErrors)
  }

  const submit = () => {
    const nErrors = cloneDeep(errors)
    nErrors.aa = !params.aa || params.aa?.length < 1 ? true : false

    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    const flag = arr.some(item => params[item]?.length > 0)
    nErrors.equipment = flag ? false : true

    setErrors(nErrors)

    console.log(params)
  }

  return (
    <div className={styles.container}>
      <Title title={'企业照片'}></Title>
      <div className={styles.item}>
        <span className={styles.label}>企业宣传照：</span>
        <CusUpload
          tips={'只能上传jpg/png格式文件，最多上传3张'}
          maxCount={3}
          valuesChange={value => valuesChange('aa', value)}
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
            valuesChange={value => valuesChange('aa', value)}
          ></CusUpload>
          {errors.aa && (
            <div className={styles.errorText}>至少上传一张产品照</div>
          )}
        </div>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>企业外景照：</span>
        <CusUpload
          tips={'只能上传jpg/png格式文件，最多上传3张'}
          maxCount={3}
          valuesChange={value => valuesChange('a', value)}
        ></CusUpload>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>企业车间照：</span>
        <CusUpload
          tips={'只能上传jpg/png格式文件，最多上传3张'}
          maxCount={3}
          valuesChange={value => valuesChange('b', value)}
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
              valuesChange={value => valuesChange('c', value)}
              btnText={'平缝机'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('d', value)}
              btnText={'包缝机'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('e', value)}
              btnText={'绷缝机'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('f', value)}
              btnText={'裁床'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('g', value)}
              btnText={'铺布机'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('h', value)}
              btnText={'吊挂'}
            ></CusUpload>
            <CusUpload
              maxCount={1}
              valuesChange={value => valuesChange('i', value)}
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

      <div className={styles.btnBox}>
        <Button type={'primary'} onClick={submit}>
          保存
        </Button>
      </div>
    </div>
  )
}

export default FactoryPhotos
