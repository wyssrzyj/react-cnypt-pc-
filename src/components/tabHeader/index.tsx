import React from 'react'
import classNames from 'classnames'
import styles from './index.module.less'

const TabHeader = props => {
  const { options = [], activeTab, onTabChange } = props
  // const [currentTab, setCurrentTab] = useState(
  //   activeTab ? activeTab : options[0].value
  // )
  const handleItem = key => {
    onTabChange(key)
  }

  return (
    <div className={styles.tabHeader}>
      {options.map(item => (
        <div
          key={item.value}
          className={classNames(
            styles.tabItem,
            activeTab === item.value && styles.active
          )}
          onClick={() => handleItem(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

export default TabHeader
