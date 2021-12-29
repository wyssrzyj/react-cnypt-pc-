import React from 'react'
import styles from './todo.module.less'
import { Icon } from '@/components' //路径
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

function machiningData({ data }) {
  const history = useHistory()

  const findOrder = (e, value) => {
    console.log(value)

    if (e === 1) {
      history.push({ pathname: '/control-panel/orderManagement/receiveOrder' })
    } else {
      history.push({
        pathname: '/control-panel/orderDetails',
        state: {
          id: value.purchaserInquiryId,
          supplierInquiryId: value.id
        }
      })
    }
  }
  return (
    <div>
      {data.map(item => (
        <div className={styles.content} key={item.id}>
          <div className={styles.icons}>
            <Icon type="jack-zxdd_icon" className={styles.previous} />
          </div>
          <div className={styles.txt}>
            <div className={styles.test}>
              <div className={styles.announcement}>
                <div className={styles.text}>{item.name}</div>

                <div
                  className={item.status === 1 ? styles.tips : styles.feedback}
                >
                  {item.status === 1 ? '新订单' : '待反馈'}
                </div>
              </div>
              <div className={styles.written}>
                <div className={styles.data}>
                  <div>
                    交货期&nbsp;&nbsp;
                    <span className={styles.typeface}>{item.deliveryDate}</span>
                  </div>
                  <div className={styles.issue}>
                    发单量&nbsp;&nbsp;
                    <span className={styles.typeface}>{item.goodsNum}</span>
                  </div>
                </div>
                <div className={styles.company}>
                  <div>
                    【{' '}
                    {item.enterpriseName
                      ? item.enterpriseName
                      : ' 此订单已失效'}
                    】&nbsp;&nbsp;
                    <span> {item.releaseTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btn}>
              <Button
                type="primary"
                onClick={() => {
                  findOrder(item.status, item)
                }}
                ghost
              >
                {item.status === 1 ? '立即前往' : '修改回复'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default machiningData
