import React from 'react'
import styles from './qualifications.module.less'

const Qualifications = () => {
  const list = [
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
    {
      img: '',
      name: '商业社会标准认证 BSCI',
    },
  ]
  return (
    <div className={styles.qualifications}>
      <div className={styles.title}>资质工厂</div>
      <div className={styles.cards}>
        {list.map((item, idx) => {
          return (
            <div key={idx} className={styles.card}>
              <img src={item.img} className={styles.img} alt="" />
              <div className={styles.name}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Qualifications
