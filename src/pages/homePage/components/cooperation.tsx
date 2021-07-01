import React from 'react'
import styles from './cooperation.module.less'
import COOP1 from '../img/pinpai_1.png'
import COOP2 from '../img/pinpai_2.png'
import COOP3 from '../img/pinpai_3.png'
import COOP4 from '../img/pinpai_4.png'
import COOP5 from '../img/pinpai_5.png'
import COOP6 from '../img/pinpai_6.png'
import COOP7 from '../img/pinpai_7.png'
import COOP8 from '../img/pinpai_8.png'
import OIMG from '../img/operateImg.png'

// 合作品牌
const Cooperation = () => {
  const datas = [COOP1, COOP2, COOP3, COOP4, COOP5, COOP6, COOP7, COOP8]
  return (
    <div className={styles.cooperation}>
      <div className={styles.header}>
        <div className={styles.oTitle}>合作品牌</div>
        <div className={styles.oText}>COOPERATIVE BRAND</div>
        <img src={OIMG} alt="" className={styles.img} />
      </div>
      <div className={styles.coopImgs}>
        {datas.map((item, idx) => (
          <img src={item} key={idx + '='} alt="" className={styles.coopImg} />
        ))}
      </div>
    </div>
  )
}

export default Cooperation
