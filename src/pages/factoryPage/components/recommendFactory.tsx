import React from 'react'
import styles from './recommendFactory.module.less'
import { Icon } from '@/components'

type FactoryCard = {
  name: string
  real: boolean
  check: boolean
  address: string
  productMen: number | string
  mainProduct: string
  tags: Array<string>
}

const FactoryCard = (props: FactoryCard) => {
  const {
    name,
    real,
    check,
    address,
    productMen,
    mainProduct,
    tags = [],
  } = props

  return (
    <div className={styles.card}>
      <img src={''} alt="" className={styles.img} />
      <div className={styles.info}>
        <div className={styles.name}>
          {name}
          {real && <span className={styles.realTag}>实名</span>}
          {check && <span className={styles.checkTag}>验厂</span>}
        </div>

        <div className={styles.address}>
          <Icon type={'jack-weizhi'} className={styles.addressIcon} />
          <span>{address}</span>
        </div>

        <div className={styles.productMen}>生产人数：{productMen}</div>

        <div className={styles.mainProduct}>主要生产：{mainProduct}</div>

        <div className={styles.tags}>
          {tags.map((item, idx) => (
            <span key={idx} className={styles.tag}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const RecommendFactory = () => {
  const list: Array<FactoryCard> = [
    {
      name: '石狮市一叶知秋服饰有限公司',
      real: true,
      check: true,
      address: '福建省 泉州市 石狮市',
      productMen: '10000人以上',
      mainProduct: '服饰',
      tags: ['佐丹奴代工', '打板', '良好生产环境', 'ISO 9000认证'],
    },
    {
      name: '石狮市一叶知秋服饰有限公司',
      real: true,
      check: true,
      address: '福建省 泉州市 石狮市',
      productMen: '10000人以上',
      mainProduct: '服饰',
      tags: ['佐丹奴代工', '打板', '良好生产环境', 'ISO 9000认证'],
    },
    {
      name: '石狮市一叶知秋服饰有限公司',
      real: true,
      check: true,
      address: '福建省 泉州市 石狮市',
      productMen: '10000人以上',
      mainProduct: '服饰',
      tags: ['佐丹奴代工', '打板', '良好生产环境', 'ISO 9000认证'],
    },
    {
      name: '石狮市一叶知秋服饰有限公司',
      real: true,
      check: true,
      address: '福建省 泉州市 石狮市',
      productMen: '10000人以上',
      mainProduct: '服饰',
      tags: ['佐丹奴代工', '打板', '良好生产环境', 'ISO 9000认证'],
    },
  ]
  return (
    <div className={styles.recommentFactory}>
      <div className={styles.title}>推荐工厂</div>

      <div className={styles.cards}>
        {list.map((item, idx) => (
          <FactoryCard key={idx} {...item}></FactoryCard>
        ))}
      </div>
    </div>
  )
}

export default RecommendFactory
