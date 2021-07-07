import React, { useRef } from 'react'
import { Icon } from '@/components'
import styles from './slideBar.module.less'
import classNames from 'classnames'

const SlideBars = props => {
  const btnRef = useRef<HTMLDivElement>()
  const { domMap, activeKey, barList } = props
  const slideBars = [
    { label: '智能搜索工厂' },
    { label: '地区工厂' },
    { label: '产业聚集区' },
    { label: '加盟工厂' },
    { label: '运营团队' },
    { label: '合作软件' },
    { label: '最新物联设备' },
    { label: '合作品牌' }
  ]
  const newList = barList ? barList : slideBars

  const moveTo = index => {
    const t = window || document.body
    if (index == 0) {
      t.scrollTo(0, 0)
      return
    }
    const target = domMap.get(index).current
    const toTop = index === 3 ? target.offsetTop - 150 : target.offsetTop
    t.scrollTo(0, toTop)
  }

  return (
    <div className={styles.slideBar}>
      <div className={styles.slideHerder}>
        <Icon type={'jack-logo1'} className={styles.slideLogo} />
        <span>产能云平台</span>
      </div>
      {newList.map((item, idx) => {
        return (
          <div
            key={item.label}
            className={classNames(styles.slideItem, activeKey === idx + 1 ? styles.slideActive : null)}
            onClick={() => moveTo(idx + 1)}
          >
            <span className={styles.slideIcon}></span>
            <div className={styles.slideText}>{item.label}</div>
          </div>
        )
      })}
      <div className={styles.slideBack} ref={btnRef} onClick={() => moveTo(0)}>
        <Icon type={'jack-Icon_up'} className={styles.slideBackLogo} />
        <span className={styles.slideBackText}>top</span>
      </div>
    </div>
  )
}

export default SlideBars
