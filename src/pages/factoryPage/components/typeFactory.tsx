import React from 'react'
import styles from './typeFactory.module.less'
import CHILD from '../img/child.png'
import FEMALE from '../img/female.png'
import MALE from '../img/male.png'
import CLOTH from '../img/cloth.png'

type FactoryType = {
  title: string
  count: string | number
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
            const style: any = {}
            if (item.color) {
              style.color = item.color
            }
            if (item.border) {
              return (
                <div key={idx} className={styles.cardConcat}>
                  <div style={style} key={idx}>
                    {item.title}
                    &nbsp;&nbsp;
                    {`(${item.count})`}
                  </div>
                  <div className={styles.cardLine} />
                </div>
              )
            }
            return (
              <div style={style} key={idx}>
                {item.title}
                &nbsp;&nbsp;
                {`(${item.count})`}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const FactorySearch = () => {
  const femaleLists: Array<FactoryType> = [
    {
      title: '裤子',
      count: '221',
      border: true,
    },
    {
      title: '半身裙',
      count: '212',
      border: false,
    },
    {
      title: '套装/学生校服/工作支付',
      count: '189',
      border: false,
    },
    {
      title: '大码女装',
      count: '145',
      border: true,
    },
    {
      title: '毛衣',
      count: '132',
      border: false,
    },
    {
      title: '蕾丝衫',
      count: '89',
      border: true,
    },
    {
      title: '其他',
      count: '132',
      border: false,
      color: '#ec808d',
    },
  ]

  const maleLists: Array<FactoryType> = [
    {
      title: '休闲裤',
      count: '221',
      border: true,
    },
    {
      title: 'T恤',
      count: '212',
      border: false,
    },
    {
      title: '针织衫/毛衣',
      count: '189',
      border: false,
    },
    {
      title: '民族服装',
      count: '145',
      border: true,
    },
    {
      title: '夹克',
      count: '132',
      border: false,
    },
    {
      title: '卫衣',
      count: '132',
      border: true,
    },
    {
      title: '其他',
      count: '132',
      border: false,
      color: '#02A7F0',
    },
  ]

  const childLists: Array<FactoryType> = [
    {
      title: '卫衣',
      count: '221',
      border: true,
    },
    {
      title: '绒衫',
      count: '212',
      border: false,
    },
    {
      title: '连身衣/爬服/哈衣',
      count: '189',
      border: false,
    },
    {
      title: '亲子服装',
      count: '145',
      border: true,
    },
    {
      title: '毛衣',
      count: '132',
      border: false,
    },
    {
      title: '棉袄/棉服',
      count: '132',
      border: true,
    },
    {
      title: '其他',
      count: '132',
      border: false,
      color: '#CAF982',
    },
  ]

  const clothLists: Array<FactoryType> = [
    {
      title: '帽子',
      count: '221',
      border: true,
    },
    {
      title: '领带',
      count: '212',
      border: false,
    },
    {
      title: '围巾类',
      count: '189',
      border: true,
    },
    {
      title: '手套',
      count: '189',
      border: false,
    },
    {
      title: '袜子',
      count: '145',
      border: true,
    },
    {
      title: '鞋类',
      count: '132',
      border: false,
    },
    {
      title: '皮带',
      count: '132',
      border: true,
    },
    {
      title: '其他',
      count: '132',
      border: false,
      color: '#FACD91',
    },
  ]

  return (
    <div className={styles.factoryModule}>
      <div className={styles.title}>按品类找工厂</div>
      <div className={styles.moduleContent}>
        <div className={styles.menAndWomen}>
          <FactoryTypes
            title={'女装'}
            children={femaleLists}
            color={'#ec808d'}
            count={7321}
            img={FEMALE}
          ></FactoryTypes>

          <FactoryTypes
            title={'男装'}
            children={maleLists}
            color={'#02A7F0'}
            count={7321}
            img={MALE}
          ></FactoryTypes>
        </div>

        <div className={styles.banners}>
          <img src={''} alt="" className={styles.banner} />
          <img src={''} alt="" className={styles.banner} />
        </div>

        <div className={styles.menAndWomen}>
          <FactoryTypes
            title={'童装'}
            children={childLists}
            color={'#CAF982'}
            count={7321}
            img={CHILD}
          ></FactoryTypes>

          <FactoryTypes
            title={'服饰'}
            children={clothLists}
            color={'#FACD91'}
            count={7321}
            img={CLOTH}
          ></FactoryTypes>
        </div>
      </div>
    </div>
  )
}

const NewFactorys = () => {
  const list = [
    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },
    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },
    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },
    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },

    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },
    {
      name: '中山市沙溪镇倩菲尔制衣厂',
      info: '主要生产:普通梭织薄料服装，真丝/雪纺服/箱包',
    },
  ]

  return (
    <div className={styles.newFactory}>
      <div className={styles.newTitle}>最新工厂</div>
      <div>
        {list.map((item, idx) => {
          return (
            <div key={idx} className={styles.newFactoryItem}>
              <div className={styles.factoryName}>{item.name}</div>
              <div className={styles.factoryInfo}>{item.info}</div>
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
