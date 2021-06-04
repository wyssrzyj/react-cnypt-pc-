import React, { useEffect, useState } from 'react'
import styles from './typeFactory.module.less'
import CHILD from '../img/child.png'
import FEMALE from '../img/female.png'
import MALE from '../img/male.png'
import CLOTH from '../img/cloth.png'
import { useStores } from '@/utils/mobx'

type FactoryType = {
  levelTwoName: string
  statCategory: string | number
  border: boolean
  color?: string
}

type FactoryTypesProps = {
  title: string
  count: string | number
  children: Array<FactoryType>
  color: string
  img: string
}

const FactoryTypes = (props: FactoryTypesProps) => {
  const { title, count, children, color, img } = props

  return (
    <div className={styles.factoryTypeItem}>
      <img src={img} alt="" className={styles.typeImg} />
      <div className={styles.factoryTypeItemR}>
        <div className={styles.typeInfo}>
          <span style={{ color }} className={styles.typeTitle}>
            {title}
          </span>
          <span>{`(${count}家工厂)`}</span>
        </div>
        <div className={styles.typeList}>
          {children.map((item, idx) => {
            const style: any = { marginRight: '8px' }
            if (item.color) {
              style.color = item.color
            }
            if (item.border) {
              return (
                <div key={idx} className={styles.cardConcat}>
                  <div style={style} key={idx}>
                    {item.levelTwoName}
                    &nbsp;&nbsp;
                    {`(${item.statCategory})`}
                  </div>
                  <div className={styles.cardLine} />
                </div>
              )
            }
            return (
              <div style={style} key={idx}>
                {item.levelTwoName}
                &nbsp;&nbsp;
                {`(${item.statCategory})`}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const FactorySearch = props => {
  const { title = '按品类找工厂' } = props

  const { factoryPageStore } = useStores()
  const { getTypeFactorys } = factoryPageStore

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const res = (await getTypeFactorys()) || []
      console.log(res, 'res')
      setData(res)
    })()
  }, [])

  const imgs = new Map()
  imgs.set(0, FEMALE)
  imgs.set(1, MALE)
  imgs.set(2, CHILD)
  imgs.set(3, CLOTH)

  const colors = new Map()
  colors.set(0, '#ec808d')
  colors.set(1, '#02A7F0')
  colors.set(2, '#CAF982')
  colors.set(3, '#FACD91')

  return (
    <div className={styles.factoryModule}>
      <div className={styles.title}>{title}</div>
      <div className={styles.moduleContent}>
        <div className={styles.menAndWomen}>
          {data.slice(0, 2).map((item, idx) => {
            return (
              <FactoryTypes
                key={idx}
                title={item.levelOneName}
                children={item.children}
                color={colors.get(idx)}
                count={item.statCategory}
                img={imgs.get(idx)}
              ></FactoryTypes>
            )
          })}
        </div>

        <div className={styles.banners}>
          <img src={''} alt="" className={styles.banner} />
          <img src={''} alt="" className={styles.banner} />
        </div>

        <div className={styles.menAndWomen}>
          {data.slice(2).map((item, idx) => {
            return (
              <FactoryTypes
                key={idx}
                title={item.levelOneName}
                children={item.children}
                color={colors.get(idx + 2)}
                count={item.statCategory}
                img={imgs.get(idx + 2)}
              ></FactoryTypes>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const NewFactorys = () => {
  const { factoryPageStore } = useStores()
  const { getNewFactorys } = factoryPageStore

  const [list, setList] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const data = await getNewFactorys(7)
      setList(data)
    })()
  }, [])

  return (
    <div className={styles.newFactory}>
      <div className={styles.newTitle}>最新工厂</div>
      <div>
        {list &&
          list.length &&
          list.map((item, idx) => {
            item.factoryCategoryList = item.factoryCategoryList || []
            return (
              <div key={idx} className={styles.newFactoryItem}>
                <div className={styles.factoryName}>{item.factoryName}</div>
                <div className={styles.factoryInfo}>
                  {item.factoryCategoryList.join(',')}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const FactoryChunk = () => {
  return (
    <div className={styles.factoryChunk}>
      <FactorySearch></FactorySearch>
      <NewFactorys></NewFactorys>
    </div>
  )
}

export default FactoryChunk
