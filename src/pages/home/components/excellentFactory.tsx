import React from 'react'
import styles from '../index.module.less'
import WOMEN from '../img/women.png'

const ExcellentFactory = () => {
  const list = [
    {
      img: WOMEN,
      url: '',
      title: '金华市恒鑫玩具有限公司',
      address: '浙江省 金华市 义乌市',
      product: '服饰,箱包/皮具,其它服饰',
    },
    {
      img: WOMEN,
      url: '',
      title: '金华市恒鑫玩具有限公司',
      address: '浙江省 金华市 义乌市',
      product: '服饰,箱包/皮具,其它服饰',
    },
    {
      img: WOMEN,
      url: '',
      title: '金华市恒鑫玩具有限公司',
      address: '浙江省 金华市 义乌市',
      product: '服饰,箱包/皮具,其它服饰',
    },
    {
      img: WOMEN,
      url: '',
      title: '金华市恒鑫玩具有限公司',
      address: '浙江省 金华市 义乌市',
      product: '服饰,箱包/皮具,其它服饰',
    },
  ]

  return (
    <div className={styles.excellentFactory}>
      <div className={styles.homeTitle}>遴选工厂展示</div>
      <div className={styles.factoryContent}>
        {list.map((item, idx) => {
          return (
            <div key={idx} className={styles.factoryItem}>
              <img src={item.img} alt="" className={styles.factoryImg} />
              <div className={styles.factoryTitle}>{item.title}</div>
              <div className={styles.factoryAddress}>地址：{item.address}</div>
              <div className={styles.factoryProduct}>生产：{item.product}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExcellentFactory
