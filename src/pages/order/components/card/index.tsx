import React from 'react'
import styles from './index.module.less'

const Card = () => {
  return (<div className={styles.cardContainer}>
    <img className={styles.orderImg} src={require("../../images/u787.png")} />
    <h5 className={styles.orderTitle}>油画少女纯棉小吊带背心外搭</h5>   
    <ul className={styles.orderList}>
      <li><span>发布时间：</span><span>2021-05-13</span></li>
      <li><span>订单类型：</span><span>经销单，来图/来样加工</span></li>
      <li><span>销售市场：</span><span>内销</span></li>
      <li><span>销售件数:</span><span>1500件</span></li>
      <li><span>单价：</span><span>￥ <b className={styles.amount}>10</b></span></li>
    </ul>
    <div className={styles.orderFooter}>
      <span>杭州高酷电子商务...</span>
      <span>浙江 杭州市</span>
    </div>
      
  </div>)
}

export default Card

