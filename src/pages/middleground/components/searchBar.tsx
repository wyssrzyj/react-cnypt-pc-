import React, { useState } from 'react'
import styles from './searchBar.module.less'
import { Button, Input, DatePicker, Row, Col } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import type { Params } from '../putManage'

const initParams = {
  name: null,
  keyword: null,
  startTime: null,
  endTime: null,
  minAmount: '',
  maxAmount: null
}
// TODO: 字段修改
const SearchBar = ({ callback }) => {
  const [params, setParams] = useState<Params>(initParams)

  const valuesChange = (value, field) => {
    const newParams = cloneDeep(params)
    if (['minAmount', 'maxAmount'].includes(field)) {
      value = isNaN(value) ? null : value.trim()
    }
    newParams[field] = value
    setParams(newParams)
  }

  const onSubmit = () => {
    callback(params)
  }

  const reset = () => {
    const init = cloneDeep(initParams)
    setParams(init)
    callback && callback(init)
  }

  return (
    <div className={styles.searchBar}>
      <Row className={styles.searchBarRow}>
        <Col span={8} className={styles.searchBarItem}>
          <span className={styles.label}>发单商名称</span>
          <Input
            onChange={event => valuesChange(event.target.value, 'name')}
            value={params.name}
            placeholder={'请输入发单商名称'}
          ></Input>
        </Col>
        <Col span={11} className={styles.searchBarItem}>
          <span className={styles.label2}>订单关键字</span>
          <Input
            onChange={event => valuesChange(event.target.value, 'keyword')}
            value={params.keyword}
            placeholder={'请输入订单号、订单名称'}
          ></Input>
        </Col>
      </Row>
      <Row className={styles.searchBarRow}>
        <Col span={8} className={styles.searchBarItem}>
          <span className={styles.label}>订单总金额</span>
          <div className={styles.inputBox}>
            <Input
              onChange={event => valuesChange(event.target.value, 'minAmount')}
              value={params.minAmount}
              placeholder={'最低金额'}
            ></Input>
            <span className={styles.line}></span>
            <Input
              onChange={event => valuesChange(event.target.value, 'maxAmount')}
              value={params.maxAmount}
              placeholder={'最高金额'}
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
                  'startTime'
                )
              }
              value={params.startTime ? moment(params.startTime) : null}
              placeholder={'起始时间'}
            ></DatePicker>
            <span className={styles.line}></span>
            <DatePicker
              onChange={value =>
                valuesChange(value ? moment(value).valueOf() : null, 'endTime')
              }
              value={params.endTime ? moment(params.endTime) : null}
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
}

export default SearchBar
