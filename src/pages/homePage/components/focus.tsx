import React from 'react'
import styles from './focus.module.less'
import IMG1 from '../img/focus1.png'
import IMG2 from '../img/focus2.png'
import IMG3 from '../img/focus3.png'
import IMG4 from '../img/focus4.png'
import IMG5 from '../img/focus5.png'
import IMG6 from '../img/focus6.png'
import IMG7 from '../img/focus7.png'
import IMG8 from '../img/focus8.png'
import IMG9 from '../img/focus9.png'
import IMG10 from '../img/focus10.png'
import IMG11 from '../img/focus11.png'

const Focus = () => {
  const focusImgs = [
    null,
    IMG1,
    null,
    IMG2,
    null,
    null,
    null,
    IMG3,
    IMG4,
    null,
    null,
    IMG5,
    IMG6,
    IMG7,
    IMG8,
    IMG9,
    null,
    IMG10,
    IMG11,
    null
  ]
  return (
    <div className={styles.focusInner}>
      <div className={styles.focusLeft}>
        <div>产业聚集地</div>
        <div>INDUSTRIAL CLUSTER</div>
        <div>童装</div>
        <div>佛山 | 织里 | 石狮</div>
      </div>
      <div className={styles.focusRight}>
        {focusImgs.map((item, idx) =>
          item ? (
            <div className={styles.focusImgBox} key={idx + 'img'}>
              <img src={item} alt="" className={styles.focusImg} />
              <div className={styles.focusMask}>
                <div className={styles.maskTitle}>童装</div>
                <div className={styles.maskText}>佛山 | 织里 | 石狮</div>
              </div>
            </div>
          ) : (
            <div className={styles.focusImgHidden} key={idx + 'img'}></div>
          )
        )}
      </div>
    </div>
  )
}

export default Focus
