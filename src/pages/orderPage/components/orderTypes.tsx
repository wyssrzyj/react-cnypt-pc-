import React from 'react'
import styles from './orderTypes.module.less'
import ORDER1 from '../img/order1.png'
import ORDER2 from '../img/order2.png'
import ORDER3 from '../img/order3.png'
import ORDER4 from '../img/order4.png'
import ORDER5 from '../img/order5.png'

type OrderType = {
  title: string
  code?: string | number
  children?: Array<OrderType>
}

type OrderTypes = Array<{
  title: string
  children: Array<OrderType>
}>

const OrderTypes = () => {
  const configs: OrderTypes = [
    {
      title: '女装市场',
      children: [
        {
          title: '裤装',
          children: [
            { title: '牛仔裤', code: '' },
            { title: '休闲裤', code: '' },
            { title: '短裤', code: '' },
          ],
        },
        {
          title: '群装',
          children: [
            { title: '连衣裙', code: '' },
            { title: '时尚套装', code: '' },
            { title: '半身裙', code: '' },
          ],
        },
        {
          title: '特色女装',
          children: [
            { title: '外贸女装', code: '' },
            { title: '中老年女装', code: '' },
            { title: '大码女装', code: '' },
          ],
        },
      ],
    },
    {
      title: '男装市场',
      children: [
        {
          title: '大码货',
          children: [
            { title: '大码裤装', code: '' },
            { title: '大码T恤', code: '' },
            { title: '大码衬衫', code: '' },
          ],
        },
        {
          title: '内搭',
          children: [
            { title: 'T恤', code: '' },
            { title: '背心', code: '' },
            { title: 'polo衫', code: '' },
          ],
        },
        {
          title: '特色货',
          children: [
            { title: '民族服装', code: '' },
            { title: '防护服', code: '' },
            { title: '动漫二次元', code: '' },
          ],
        },
      ],
    },
  ]

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderTypes}>
        <div className={styles.orderTypesTitle}>订单品类</div>
        {configs.map((item: OrderType, idx: number) => {
          return (
            <div key={idx}>
              <div className={styles.typesTitle}>{item.title}</div>
              <div>
                {item.children &&
                  item.children.length > 0 &&
                  item.children.map((i: OrderType, t: number) => (
                    <div key={t} className={styles.orderType}>
                      <div className={styles.orderTypeTitle}>{i.title}</div>
                      <div className={styles.orderTypeItems}>
                        {i.children &&
                          i.children.map((it: OrderType, k: number) => (
                            <div key={k} className={styles.orderTypeItem}>
                              {it.title}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.orderCenterContent}>
        <div className={styles.orderImgs}>
          <img src={ORDER1} className={styles.orderImg1} alt="" />
          <div className={styles.orderImgsMiddle}>
            <img src={ORDER2} alt="" className={styles.orderImg2} />
            <img src={ORDER3} alt="" className={styles.orderImg3} />
          </div>
          <div className={styles.orderImgsRight}>
            <div className={styles.orderImgsRightT}>入驻平台</div>
            <img src={ORDER4} alt="" className={styles.orderImg4} />
          </div>
        </div>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoTitle}>最新数据</div>
          <div className={styles.orderInfoInner}>
            <div className={styles.orderInfoItem}>
              <span className={styles.infoItemT}>总订单数</span>
              <span className={styles.infoItemN}>111,234</span>个
            </div>
            <div className={styles.orderInfoItem}>
              <span className={styles.infoItemT2}>新增</span>
              <span className={styles.infoItemN}>111,234</span>个
            </div>
            <div className={styles.orderInfoItem}>
              <span className={styles.infoItemT}>已完成</span>
              <span className={styles.infoItemN}>111,234</span>个
            </div>
            <div className={styles.orderInfoItem}>
              <span className={styles.infoItemT2}>新增</span>
              <span className={styles.infoItemN}>111,234</span>个
            </div>
          </div>
        </div>
      </div>
      <img src={ORDER5} className={styles.orderImg5} alt="" />
    </div>
  )
}

export default OrderTypes
