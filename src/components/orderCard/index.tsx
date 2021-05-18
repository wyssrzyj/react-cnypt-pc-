import React from 'react'
import styles from './index.module.less'

const OrderCard = (props) => {
  const {list, describe} = props;
  return (<div className={styles.cardContainer}>
    <img className={styles.orderImg} src={require("./images/u787.png")} />
    <h5 className={styles.orderTitle}>{describe}</h5>   
    <ul className={styles.orderList}>
      {list.map((item,index)=>{
        if(item.label === "单价"){
          return <li><span>单价：</span><span>￥ <b className={styles.amount}>{item.value}</b></span></li>
        }else{
          return <li key={index}><span>{item.label}：</span><span>{item.value}</span></li>
        }
      })}
    </ul>
    <div className={styles.orderFooter}>
      <span>杭州高酷电子商务...</span>
      <span>浙江 杭州市</span>
    </div>
      
  </div>)
}

export default OrderCard

