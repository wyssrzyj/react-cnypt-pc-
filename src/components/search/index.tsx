import React, { useState } from 'react'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'
import BG_LOGO from './bgLogo.png'
import { Input, Button } from 'antd'
import { useHistory } from 'react-router'

const Search = () => {
  const history = useHistory()
  const { commonStore } = useStores()
  const { factoryName, updateName } = commonStore

  const [searchWord, setSearchWord] = useState<string>(factoryName)

  const searchFunction = () => {
    updateName(searchWord)
    history.push('/factory-search')
  }

  return (
    <div className={styles.searchContainer}>
      <img src={BG_LOGO} alt="" className={styles.bgLogo} />
      <div className={styles.searchBox}>
        <div className={styles.search}>
          <Input
            defaultValue={factoryName}
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            className={styles.input}
            placeholder={'请输入订单编号/工厂名称'}
          />
          <Button
            className={styles.btn}
            type={'primary'}
            onClick={searchFunction}
          >
            搜索
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(Search)
