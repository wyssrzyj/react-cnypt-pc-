import React from 'react'
import { Tag } from 'antd'
// import { LoginOutlined, StarOutlined, EditOutlined } from '@ant-design/icons'
import { Icon } from '@/components'
import styles from './index.module.less'

const FactoryInfo = () => {
  return (
    <div className={styles.factoryInfo}>
      <div className={styles.factoryInfoContent}>
        <div className={styles.slideshow}>
          <img
            className={styles.infoImg}
            src={require('@/static/images/u1653.png')}
            alt=""
          />
        </div>
        <div className={styles.infoRight}>
          <div className={styles.infoTitle}>
            <b className={styles.factoryName}>广州市嵘峥服饰有限公司</b>
            <span className={styles.realName}>
              <Icon className={styles.infoIcon} type="jack-shiming" />
              实名
            </span>
            <span className={styles.inspection}>
              <Icon className={styles.infoIcon} type="jack-shenduyanchan" />
              验厂
            </span>
            <span>
              <b className={styles.score}>4.7</b>分
            </span>
          </div>
          <ul className={styles.factoryInfoList}>
            <li>
              <span>工厂地区：</span>
              <span>广东省广州市白云区</span>
            </li>
            <li>
              <span>加工行业：</span>
              <span>生产企业或加工个体户</span>
            </li>
            <li>
              <span>生产人数：</span>
              <span>101~200人</span>
            </li>
            <li>
              <span>接单类型：</span>
              <span>主要承接经销订单，另外也做清加工订单</span>
            </li>
            <li>
              <span>主营类别：</span>
              <span>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
              </span>
            </li>
            <li>
              <span>企业标签：</span>
              <span>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
                <Tag className={styles.factoryInfoTag} color="#f2f2f2">
                  衬衫
                </Tag>
              </span>
            </li>
            <li>
              <span>空档期：</span>
              <span>2021.11.17 - 2022.01.15</span>
            </li>
            <li>
              <span className={styles.label}>300件起订</span>
              <span className={styles.label}>支持贴牌</span>
              <span className={styles.label}>可接外贸单</span>
              <span className={styles.label}>来样加工</span>
              <span className={styles.label}>来图加工</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.factoryInfoMan}>
        <div className={styles.firstLine}>
          <div>
            <span>联系人：</span>
            <span>廖洪莲</span>
          </div>
          <div>
            <span>手机号码：</span>
            <span>133****5529</span>
          </div>
          <div>
            <span className={styles.firstLineIcon}>
              <Icon className={styles.icon} type="jack-login-settings" />
              登录查看完整联系方式
            </span>
            <span className={styles.firstLineIcon}>
              <Icon className={styles.icon} type="jack-guanzhu" />
              关注
            </span>
            <span className={styles.firstLineIcon}>
              <Icon className={styles.icon} type="jack-liuyan" />
              留言
            </span>
          </div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.secondLineItem}>
            <span>电子邮箱：</span>
            <span>28019*****qq.com</span>
          </div>
          <div className={styles.secondLineItem}>
            <span>联系电话：</span>
            <span>020-6****286</span>
          </div>
        </div>
        <div className={styles.secondLine}>
          <div>
            <span>工厂地址：</span>
            <span>
              广东省广州市白云区 广州市白云区广州市佳吉服装有限公司
            </span>{' '}
            &nbsp;&nbsp;&nbsp;
            <a>地图查看 {'>'}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FactoryInfo
