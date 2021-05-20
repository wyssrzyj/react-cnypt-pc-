import React from 'react'
import { Button } from 'antd'
import {
  UserOutlined,
  MobileOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import { DetailHeader, JackCard, Icon } from '@/components'
import styles from './index.module.less'

const clothingHeader = (
  <>
    <span style={{ fontWeight: 'bold' }}>永定区小星家服装店</span>
    <span className={styles.factoryYear}>
      3年&nbsp;&nbsp;|&nbsp;&nbsp;
      <Icon type="jack-xianxingjiangpai" style={{ fontSize: 18 }} />
    </span>
  </>
)
const clothingList = [
  {
    label: '主营类别',
    value: '毛衫服装(细针),毛衫服装(粗针)',
    key: 'man',
  },
  {
    label: '加工行业',
    value: '生产企业或加工个体户',
    key: 'woman',
  },
  {
    label: '生产人数',
    value: '100-499人',
    key: 'kids',
  },
  {
    label: '接单类型',
    value: '经销单',
    key: 'dress',
  },
  {
    label: '工厂地区',
    value: '广东省 东莞市',
    key: 'OEM',
  },
]
const clothingFooter = (
  <>
    <Button>进入工程</Button>
    <Button>关注工厂</Button>
  </>
)

const ourHeader = (
  <>
    <span style={{ fontWeight: 'bold' }}>联系我们</span>
    <span style={{ color: '#EC808D' }}>登录查看联系方式</span>
  </>
)
const ourList = [
  {
    label: '名称',
    value: '企业设置不公开',
    key: 'man',
    icon: <UserOutlined className={styles.ourIcon} />,
  },
  {
    label: '手机',
    value: '企业设置不公开',
    key: 'woman',
    icon: <MobileOutlined className={styles.ourIcon} />,
  },
  {
    label: '电话',
    value: '企业设置不公开',
    key: 'kids',
    icon: <PhoneOutlined className={styles.ourIcon} />,
  },
  {
    label: '邮箱',
    value: '企业设置不公开',
    key: 'dress',
    icon: <MailOutlined className={styles.ourIcon} />,
  },
  {
    label: '地址',
    value: '企业设置不公开',
    key: 'OEM',
    icon: <EnvironmentOutlined className={styles.ourIcon} />,
  },
]
const ourFooter = <Button icon={<CommentOutlined />}>现在聊天</Button>

const OrderDetail = () => {
  return (
    <div className={styles.orderDetail}>
      <DetailHeader />
      <div className={styles.orderContent}>
        <div className={styles.contentLeft}>
          <JackCard
            header={clothingHeader}
            content={clothingList}
            footer={clothingFooter}
          />
          <JackCard header={ourHeader} content={ourList} footer={ourFooter} />
          {/* <JackCard header="sss" /> */}
        </div>
        <div className={styles.contentRight}>
          <div className={styles.orderOverview}></div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
