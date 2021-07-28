import { useStores } from '@/utils/mobx'
import React, { useEffect } from 'react'
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

const ProductDynamic = ({ factoryId }) => {
  const { factoryStore } = useStores()
  const { getFactoryData, getFactoryMachineData, getFactoryBoard } =
    factoryStore

  useEffect(() => {
    ;(async () => {
      await getFactoryData(factoryId)
      await getFactoryMachineData(factoryId)
      await getFactoryBoard(factoryId)
    })()
  }, [])

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
