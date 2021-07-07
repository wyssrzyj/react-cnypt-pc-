import React, { useState } from 'react'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'
// import BG_LOGO from './bgLogo.png'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
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
    // <div className={styles.searchContainer}>
    //   {/* <img src={BG_LOGO} alt="" className={styles.bgLogo} /> */}
    //   <div className={styles.searchBox}>
    //     <div className={styles.search}>
    //       <Input
    //         defaultValue={factoryName}
    //         value={searchWord}
    //         onChange={e => setSearchWord(e.target.value)}
    //         className={styles.input}
    //         placeholder={'请输入订单编号/工厂名称'}
    //       />
    //       <Button className={styles.btn} type={'primary'} onClick={searchFunction}>
    //         搜索
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <div className={styles.search}>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>要找好厂家 锁定产能云平台</h3>
        <h1 className={styles.title}>开始寻找适合的加工厂</h1>
        <div className={styles.searchBox}>
          <Input
            defaultValue={factoryName}
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            className={styles.input}
            placeholder={'请输入订单编号/工厂名称'}
          />
          <Button className={styles.btn} type={'primary'} icon={<SearchOutlined />} onClick={searchFunction}>
            搜索
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(Search)
