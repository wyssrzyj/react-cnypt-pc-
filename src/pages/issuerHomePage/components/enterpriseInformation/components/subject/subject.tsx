import React from 'react'
import styles from './subject.module.less'
import { Icon } from '@/components' //路径
import classNames from 'classnames'
import BusinessAddressCom from './businessAddressCom/index'

function swiperFactorys({ informationData }) {
  const data = [
    {
      icon: 'jack-clock',
      name: '成立时间',
      // content: moment(config.establishedTime).format('YYYY-MM-DD'),
      content: informationData.establishedTime,
      company: '',
      style: ''
    },
    {
      icon: 'jack-Customermanagement',
      name: '企业角色',
      content: informationData.roleCodes,
      company: '',
      style: ''
    },
    {
      icon: 'jack-map',
      name: '所在地区',
      content: informationData.provinceId,
      company: '',
      style: ''
    },
    {
      icon: 'jack-home',
      name: '详细地址',
      content: informationData.address,
      company: '',
      style: ''
    },
    {
      icon: 'jack-data',
      name: '年发单量',
      content: informationData.yearOrderTransaction,
      style: ''
    },
    {
      icon: 'jack-tool',
      name: '主营类别',
      content: informationData.mainCategoriesList,
      style: ''
    },
    {
      icon: 'jack-signboard',
      name: '类别说明',
      content: informationData.mainProductCategoriesDesc
        ? informationData.mainProductCategoriesDesc
        : '--',
      style: ''
    },
    {
      icon: 'jack-discount',
      name: '订单品牌',
      content: informationData.orderBrand ? informationData.orderBrand : '--',
      style: ''
    }
  ]
  const sum = {
    address: '浙江省杭州市临平区龙王塘路67号',
    location: informationData.longitude
  }
  return (
    <div className={styles.top}>
      <div className={styles.content}>
        <div>
          {data.map(item => (
            <div className={styles.contents} key={item.name}>
              <div className={styles.address}>
                <Icon type={item.icon} className={classNames(styles.table)} />
                {item.name}
              </div>
              <span>
                <span className={item.style !== '' ? styles.texColor : ''}>
                  {item.content}&nbsp;
                </span>
              </span>
            </div>
          ))}
        </div>
        <div>
          <BusinessAddressCom list={sum}></BusinessAddressCom>
        </div>
      </div>
    </div>
  )
}

export default swiperFactorys
