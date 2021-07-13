import React from 'react'
import styles from './software.module.less'

const SOFT1 =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/2556b9ac220e4969a533392523057706.png'
const SOFT2 =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/0be72f74fb10486681b054a9034f507b.png'
const SOFT3 =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/1ae9185a1cdc4273983482ae5a9fb9c2.png'
const SOFT4 =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/a0f98f6802ac4b328a89a5601e4a8576.png'

// 工票软件
const Software = () => {
  const imgs = [SOFT1, SOFT2, SOFT3, SOFT4]

  return (
    <div className={styles.software}>
      <div className={styles.softwareInner}>
        <div className={styles.softIntro}>
          <div className={styles.softTitle}>工票软件</div>
          <div className={styles.softText}>WORK ORDER SOFTWARE</div>
          <div className={styles.softIntroText}>
            浙江嘉兴创展软件科技有限公司，是一家专注于智能化系统集成，企业信息化管理系统的研发、应用及信息技术管理咨询解决方案提供商，致力于将RFID（射频识别）等先进技术应用于服装生产管理领域结合信息化软件系统，引领二十一世纪服装产业革新潮流，给力服装生产企业获得领先的智能化、自动化管理技术，提升工厂效率。
          </div>
        </div>
        <div className={styles.softImgs}>
          {imgs.map((item, idx) => (
            <img src={item} key={idx} alt="" className={styles.softImg} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Software
