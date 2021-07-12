import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.less'
import { useStores } from '@/utils/mobx'
import moment from 'moment'
import useTableChange from '@/utils/hooks/useTableChange'

type Params = {
  id: string
  [key: string]: any
}

const loginTypesMap = new Map()
loginTypesMap.set(0, '网页版')
loginTypesMap.set(1, '小程序')
loginTypesMap.set(2, 'APP')

const LoginLogs = () => {
  const history = useHistory()
  const routeParams: Params = useParams()

  const { controlPanelStore } = useStores()
  const { getLoginLogs } = controlPanelStore
  const [params, _setParams] = useState({ userId: routeParams.id })

  const { tableChange, dataSource, total, pageNum, pageSize } = useTableChange(
    params,
    getLoginLogs
  )

  const columns = [
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
      render: value => moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '登录IP',
      dataIndex: 'loginIp',
      key: 'loginIp'
    },
    {
      title: '登录地点',
      dataIndex: 'loginAddress',
      key: 'loginAddress'
    },
    {
      title: '登录方式',
      dataIndex: 'loginType',
      key: 'loginType',
      render: value => loginTypesMap.get(+value)
    }
  ]

  const back = () => {
    history.push('/control-panel/account')
  }

  return (
    <div>
      <Table
        onChange={tableChange}
        pagination={{
          total: total,
          pageSize: pageSize,
          current: pageNum
        }}
        rowKey={'id'}
        columns={columns}
        dataSource={dataSource}
      />
      <div className={styles.boxBtn}>
        <Button type={'primary'} onClick={back} className={styles.btn}>
          返回
        </Button>
      </div>
    </div>
  )
}

export default LoginLogs
