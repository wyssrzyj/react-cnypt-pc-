import React, { useState } from 'react'
import { Radio, Button } from 'antd'
import styles from './bindSoftWare.module.less'
import { useHistory } from 'react-router'

const YOUCHAN =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/youchan.png'
const OTHER =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/otherUtils.png'

const Card = ({ label, img }) => {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className={styles.card}>
      {label}
    </div>
  )
}

interface Props {
  callback?: (step: number) => void
}

const BindSoftWare = (props: Props) => {
  const history = useHistory()
  const { callback } = props
  const [value, setValue] = useState(0)

  const onChange = event => {
    const val = event.target.value
    setValue(val)
  }

  const cancelClick = () => {
    history.goBack()
  }

  const nextClick = () => {
    callback && callback(1)
  }

  return (
    <div className={styles.container}>
      <div>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={0}>
            <Card label={'优产工票软件'} img={YOUCHAN} />
          </Radio>
          <Radio value={1}>
            <Card label={'其它工具'} img={OTHER} />
          </Radio>
        </Radio.Group>
      </div>

      <div className={styles.btnsBox}>
        <Button
          onClick={cancelClick}
          type={'primary'}
          ghost
          className={styles.cancelBtn}
        >
          取消
        </Button>
        <Button type={'primary'} onClick={nextClick}>
          下一步
        </Button>
      </div>
    </div>
  )
}

export default BindSoftWare
