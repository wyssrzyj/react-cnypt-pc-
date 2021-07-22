import React, { useState } from 'react'
import classNames from 'classnames'
import { useStores, observer } from '@/utils/mobx'
import styles from './index.module.less'
import { Input, Button, Affix } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'

const Search = () => {
  const history = useHistory()
  const { commonStore } = useStores()
  const { factoryName, updateName } = commonStore
  console.log(
    '🚀 ~ file: index.tsx ~ line 14 ~ Search ~ factoryName',
    factoryName
  )

  const [searchWord, setSearchWord] = useState<string>(factoryName)
  const [affixed, setAffixed] = useState<boolean>(false)

  const searchFunction = () => {
    updateName(searchWord)
    history.push('/factory-search')
  }

  const enterFn = e => {
    setSearchWord(e.target.value)
    updateName(e.target.value)
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
        <Affix offsetTop={0} onChange={affixed => setAffixed(affixed)}>
          <div
            style={{ width: affixed ? document.body.clientWidth : 900 }}
            className={classNames(styles.searchBox, affixed && styles.active)}
          >
            <Input
              defaultValue={factoryName}
              value={searchWord}
              onChange={e => setSearchWord(e.target.value)}
              onPressEnter={enterFn}
              className={styles.input}
              placeholder={'请输入工厂名称'}
            />
            <Button
              className={styles.btn}
              type={'primary'}
              icon={<SearchOutlined />}
              onClick={searchFunction}
            >
              搜索
            </Button>
          </div>
        </Affix>
      </div>
    </div>
  )
}

export default observer(Search)
