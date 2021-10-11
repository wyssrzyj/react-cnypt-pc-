import React from 'react'
import Tab from './Tab'
import Query from './query'
import styles from './index.module.less'
import Sort from './sort'
import MultipleChoice from './multipleChoice'

function DemandList() {
  const sortCallback = value => {
    console.log(value)
  }
  const queryMethod = value => {
    console.log(value)
  }
  return (
    <div className={styles.demand}>
      <h1>需求单列表</h1>
      <section>
        <Tab />
        <Query query={queryMethod} />
        <Sort callback={sortCallback} />
        <MultipleChoice />
      </section>
    </div>
  )
}

export default DemandList
