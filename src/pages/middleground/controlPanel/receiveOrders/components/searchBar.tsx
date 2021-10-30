import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef
} from 'react'
import styles from './searchBar.module.less'
import { Button, Input, DatePicker, Row, Col } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { filterNull } from '@/utils/axios/filterNull'

const initParams = {
  name: null,
  releaseTimeStart: null,
  releaseTimeEnd: null
}

interface Props {
  callback?: (event: any) => void
}

const SearchBar = forwardRef(({ callback }: Props, ref) => {
  const paramsRef = useRef<any>()

  const [params, setParams] = useState<any>(initParams)
  const [searchOptions, setSearchOptions] = useState<any[]>([])

  const valuesChange = useCallback(
    async (value, field) => {
      const newParams = cloneDeep(params)

      newParams[field] = value
      paramsRef.current = newParams
      await setParams(filterNull(paramsRef.current))
    },
    [params]
  )

  const onSubmit = () => {
    callback && callback(filterNull(paramsRef.current))
  }

  const reset = () => {
    const init = cloneDeep(initParams)
    paramsRef.current = init
    setParams(paramsRef.current)
    callback && callback(init)
  }

  const changeOptions = useCallback(
    async target => {
      const newOptions = cloneDeep(searchOptions) || []
      const flag = newOptions.some(item => item.value === target.value)
      !flag && newOptions.push(target)
      await setSearchOptions(newOptions)
    },
    [searchOptions]
  )

  useImperativeHandle(ref, () => {
    return {
      changeOptions,
      valuesChange,
      onSubmit
    }
  })

  return (
    <Row className={styles.search}>
      <Col span={10} className={styles.searchBarItem}>
        <span className={styles.label}>订单标题</span>
        <Input
          onChange={event => valuesChange(event.target.value, 'name')}
          value={params.orderName}
          placeholder={'请输入订单标题'}
          className={styles.input}
        ></Input>
      </Col>
      <Col span={10} className={styles.searchBarItem}>
        <span className={styles.labels}>发布时间</span>
        <div className={styles.inputBox}>
          <DatePicker
            onChange={value =>
              valuesChange(
                value ? moment(value).valueOf() : null,
                'releaseTimeStart'
              )
            }
            value={
              params.releaseTimeStart ? moment(params.releaseTimeStart) : null
            }
            placeholder={'起始时间'}
          ></DatePicker>
          <span className={styles.line}></span>
          <DatePicker
            onChange={value =>
              valuesChange(
                value ? moment(value).valueOf() : null,
                'releaseTimeEnd'
              )
            }
            value={params.releaseTimeEnd ? moment(params.releaseTimeEnd) : null}
            placeholder={'结束时间'}
          ></DatePicker>
        </div>
      </Col>
      <Col span={4} className={styles.btnBox}>
        <Button type={'primary'} ghost className={styles.btns} onClick={reset}>
          重置
        </Button>
        <Button type={'primary'} className={styles.btn} onClick={onSubmit}>
          查询
        </Button>
      </Col>
    </Row>
  )
})

export default SearchBar
