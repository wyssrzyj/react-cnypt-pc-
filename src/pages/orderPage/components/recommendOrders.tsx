import { OrderCard } from '@/components'
import React from 'react'
import { useHistory } from 'react-router'
import styles from './recommendOrders.module.less'

const RecommondOrders = () => {
  const history = useHistory()

  const list = new Array(10).fill(1)

  const handleCard = () => {
    history.push('/order-detail')
  }

  const describe = '油画少女纯棉小吊带背心外搭'

  const descLits = [
    {
      label: '',
      value: '1500件'
    },
    {
      label: '总价',
      value: '10'
    }
  ]

  return (
    <div>
      <div>合作品牌</div>
      <div className={styles.cards}>
        {list.map((item, index) => (
          <OrderCard
            key={index}
            handleCard={handleCard}
            describe={describe}
            list={descLits}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default RecommondOrders
