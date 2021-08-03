import React from 'react'
import {
  MonthProduceChart,
  MoveChart,
  PassPercent,
  PieChart,
  PinNumber,
  PresserFoot,
  ProductEffect,
  ShearLine
} from './components'
import ScrollTable from './components/scrollTable'
import styles from './index.module.less'

const ProductDynamic = () => {
  return (
    <div>
      <div className={styles.charts}>
        <PieChart></PieChart>
        <MoveChart></MoveChart>
        <MonthProduceChart></MonthProduceChart>
        <ProductEffect></ProductEffect>
        <PassPercent></PassPercent>
        <PinNumber></PinNumber>
        <ShearLine></ShearLine>
        <PresserFoot></PresserFoot>
      </div>

      <ScrollTable></ScrollTable>
    </div>
  )
}

export default ProductDynamic
