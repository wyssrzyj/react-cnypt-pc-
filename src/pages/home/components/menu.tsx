import React, { useState, useCallback, useRef } from 'react'
import styles from '../index.module.less'
import { observer } from '@/utils/mobx'
import classNames from 'classnames'

const MenuCard = ({ data, mouseEnter }) => {
  const { title, children = [] } = data
  return (
    <div className={styles.menuItem} onMouseEnter={() => mouseEnter(data)}>
      <div className={styles.menuItemTitle}>{title}</div>
      <div className={styles.menuContent}>
        {children.map((item, idx: number) => {
          return (
            <div className={styles.child} key={idx}>
              {item.label}
              <div className={styles.menuLine} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

type MenuChildType = { label: string; id: number; count: number }
type MenuItemType = {
  label: string
  id: number
  children?: Array<MenuChildType>
}
type MenusType = {
  title: string
  children: Array<MenuItemType>
  [key: string]: any
}

const Menu = () => {
  const menuTitle = '服装及订单解决方案'
  const seeAll = '查看全部'
  const modalRef = useRef<HTMLDivElement>()

  const menus: Array<MenusType> = [
    {
      title: '工厂及产能',
      children: [
        {
          label: '行业类型',
          id: 1,
          children: [
            {
              label: '梭织梭织',
              id: 3,
              count: 500,
            },
            {
              label: '针织',
              id: 4,
              count: 500,
            },
            {
              label: '内内衣',
              id: 5,
              count: 500,
            },
            {
              label: '梭梭织',
              id: 3,
              count: 500,
            },
            {
              label: '针织',
              id: 4,
              count: 500,
            },
            {
              label: '内衣',
              id: 5,
              count: 500,
            },
            {
              label: '梭织织',
              id: 3,
              count: 500,
            },
            {
              label: '针织',
              id: 4,
              count: 500,
            },
            {
              label: '内衣',
              id: 5,
              count: 500,
            },
          ],
        },
        {
          label: '产能类型',
          id: 2,
          children: [
            {
              label: '梭织1',
              id: 6,
              count: 500,
            },
            {
              label: '针织1',
              id: 7,
              count: 500,
            },
            {
              label: '内衣1',
              id: 8,
              count: 500,
            },
          ],
        },
        {
          label: '产能类型',
          id: 111,
          children: [
            {
              label: '梭织1',
              id: 6,
              count: 500,
            },
            {
              label: '针织1',
              id: 7,
              count: 500,
            },
            {
              label: '内衣1',
              id: 8,
              count: 500,
            },
          ],
        },
        {
          label: '产能类型',
          id: 222,
          children: [
            {
              label: '梭织1',
              id: 6,
              count: 500,
            },
            {
              label: '针织1',
              id: 7,
              count: 500,
            },
            {
              label: '内衣1',
              id: 8,
              count: 500,
            },
          ],
        },
      ],
    },
    // {
    //   title: '样板服务',
    //   children: [{ label: '暂时不考虑，涉及到报价相关', id: null }],
    // },
    // {
    //   title: '面辅料采购',
    //   children: [{ label: '暂不考虑，涉及到供应链解决方案', id: null }],
    // },
    // {
    //   title: '快速下单',
    //   children: [{ label: '暂不考虑，涉及报价，产品类，工艺等', id: null }],
    // },
    // {
    //   title: '生产与大数据',
    //   children: [{ label: '展示杰克物联网数据', id: null }],
    // },
  ]

  const [cardVisible, setCardVisible] = useState<boolean>(false)
  const [cardData, setCardData] = useState<Array<MenuItemType>>([])

  const mouseEnter = useCallback((target) => {
    modalRef.current.style.transition = 'all ease 0.3s'
    const data = target.children || []
    setCardData(data)
    setCardVisible(true)
  }, [])

  const mouseLeave = useCallback(() => {
    modalRef.current.style.transition = 'none'
    setCardVisible(false)
  }, [])

  return (
    <div className={styles.menu} onMouseLeave={mouseLeave}>
      <div className={styles.menuTitle}>{menuTitle}</div>
      {menus.map((item: any, idx: number) => (
        <MenuCard mouseEnter={mouseEnter} data={item} key={idx}></MenuCard>
      ))}
      <div className={styles.seeAll}>{seeAll}</div>

      <div
        className={classNames(
          styles.modalCard,
          cardVisible && styles.modalCardShow
        )}
        ref={modalRef}
      >
        {cardData.map((item) => {
          return (
            <div key={item.id} className={styles.modalItem}>
              <div className={styles.modalTitle}>{item.label}</div>
              <div className={styles.itemContent}>
                {item.children &&
                  item.children.length &&
                  item.children.map((i, t: number) => {
                    return (
                      <div key={t} className={styles.itemChild}>
                        {i.label} &nbsp;{`(${i.count})`}
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default observer(Menu)
