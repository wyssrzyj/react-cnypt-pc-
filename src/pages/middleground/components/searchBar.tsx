import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef
} from 'react'
import styles from './searchBar.module.less'
import { Button, Input, DatePicker, Row, Col, Select } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import type { Params } from '../putManage'
import { useStores } from '@/utils/mobx'
import { debounce } from 'lodash'
import { filterNull } from '@/utils/axios/filterNull'

const { Option } = Select

const initParams: Params = {
  orderName: null,
  commitStartTime: null,
  commitEndTime: null,
  minimunAmount: null,
  highestAmount: null,
  supplierTenantId: null,
  purchaserTenantId: null
}

interface Props {
  callback?: (event: any) => void
  type?: string
}

const SearchBar = forwardRef(({ callback, type = 'put' }: Props, ref) => {
  const { orderStore } = useStores()
  const { getPurchasers, getSuppliers } = orderStore
  const paramsRef = useRef<any>()

  const [params, setParams] = useState<Params>(initParams)
  const [searchOptions, setSearchOptions] = useState<any[]>([])

  const getSearchOptions = async (name = '') => {
    let options
    if (type === 'put') {
      options = (await getSuppliers(name)) || []
    }
    if (type === 'receive') {
      options = (await getPurchasers(name)) || []
    }
    setSearchOptions(options)
  }

  const valuesChange = useCallback(
    async (value, field) => {
      const newParams = cloneDeep(params)
      if (['minimunAmount', 'highestAmount'].includes(field)) {
        value = isNaN(value) ? null : value.trim()
      }
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

  const onSearch = debounce(async value => {
    await getSearchOptions(value)
  }, 200)

  const changeOptions = useCallback(
    async target => {
      const newOptions = cloneDeep(searchOptions) || []
      const flag = newOptions.some(item => item.value === target.value)
      !flag && newOptions.push(target)
      await setSearchOptions(newOptions)
    },
    [searchOptions]
  )

  useEffect(() => {
    ;(async () => {
      await getSearchOptions()
    })()
  }, [type])

  useImperativeHandle(ref, () => {
    return {
      changeOptions,
      valuesChange,
      onSubmit
    }
  })

  return (
    <div className={styles.searchBar}>
      <Row className={styles.searchBarRow}>
        <Col span={8} className={styles.searchBarItem}>
          <span className={styles.label}>
            {type === 'put' ? '工厂名称' : '发单商名称'}
          </span>
          <Select
            showSearch
            allowClear
            filterOption={false}
            style={{ width: '100%' }}
            onSearch={onSearch}
            value={
              params[type === 'put' ? 'supplierTenantId' : 'purchaserTenantId']
            }
            placeholder={type === 'put' ? '请输入工厂名称' : '请输入发单商名称'}
            onChange={value =>
              valuesChange(
                value,
                type === 'put' ? 'supplierTenantId' : 'purchaserTenantId'
              )
            }
          >
            {Array.isArray(searchOptions) &&
              searchOptions.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
          </Select>
        </Col>
        <Col span={11} className={styles.searchBarItem}>
          <span className={styles.label2}>订单关键字</span>
          <Input
            onChange={event => valuesChange(event.target.value, 'orderName')}
            value={params.orderName}
            placeholder={'请输入订单号、订单名称'}
            className={styles.input}
          ></Input>
        </Col>
      </Row>
      <Row className={styles.searchBarRow}>
        <Col span={8} className={styles.searchBarItem}>
          <span className={styles.label}>订单总金额</span>
          <div className={styles.inputBox}>
            <Input
              onChange={event =>
                valuesChange(event.target.value, 'minimunAmount')
              }
              value={params.minimunAmount}
              placeholder={'最低金额'}
              className={styles.input}
            ></Input>
            <span className={styles.line}></span>
            <Input
              onChange={event =>
                valuesChange(event.target.value, 'highestAmount')
              }
              value={params.highestAmount}
              placeholder={'最高金额'}
              className={styles.input}
            ></Input>
          </div>
        </Col>
        <Col span={11} className={styles.searchBarItem}>
          <span className={styles.label2}>订单确认时间</span>
          <div className={styles.inputBox}>
            <DatePicker
              onChange={value =>
                valuesChange(
                  value ? moment(value).valueOf() : null,
                  'commitStartTime'
                )
              }
              value={
                params.commitStartTime ? moment(params.commitStartTime) : null
              }
              placeholder={'起始时间'}
            ></DatePicker>
            <span className={styles.line}></span>
            <DatePicker
              onChange={value =>
                valuesChange(
                  value ? moment(value).valueOf() : null,
                  'commitEndTime'
                )
              }
              value={params.commitEndTime ? moment(params.commitEndTime) : null}
              placeholder={'结束时间'}
            ></DatePicker>
          </div>
        </Col>

        <Col span={5} className={styles.btnBox}>
          <Button onClick={reset} type={'primary'} ghost>
            重置
          </Button>
          <Button type={'primary'} onClick={onSubmit}>
            查询
          </Button>
        </Col>
      </Row>
    </div>
  )
})

export default SearchBar
