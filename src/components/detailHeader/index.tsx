import React from 'react'
import { Input,  } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import styles from './index.module.less'

const { Search } = Input;

const DetailHeader = () => {
  const onSearch = () => {}
  return (<div className={styles.detailHeader}>
      <img src={require('../../static/images/jack-logo.png')}/>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
  </div>)
}

export default DetailHeader
