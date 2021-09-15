import React from 'react'
import styles from './index.module.less'
import Icon from '@/components/Icon'
// import { useHistory } from 'react-router'
// import { useStores } from '@/utils/mobx'

const KeyIcon = () => <Icon type="jack-yuechi" className={styles.icon} />

const UserIcon = () => <Icon type="jack-user" className={styles.icon} />

const ExitIcon = () => <Icon type="jack-tuichu" className={styles.icon} />

const Header = () => {
  // const { loginStore } = useStores()
  // const { exit } = loginStore

  // const history = useHistory()

  const exitToLogin = async () => {
    // const res = await exit()
    // res && history.push('/login')
  }

  const infos = [
    { label: '个人中心', icon: UserIcon, key: 'user' },
    { label: '修改密码', icon: KeyIcon, key: 'change' },
    { label: '退出登录', icon: ExitIcon, key: 'exit', onClick: exitToLogin }
  ]

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          className={styles.logImg}
          src="http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png"
          alt="优产云平台"
        />
      </div>
      <div className={styles.headerR}>
        <div className={styles.userInfo}>
          <div className={styles.user}>用户</div>
          <div className={styles.infoModal}>
            {infos.map((item, idx) => {
              if (idx === infos.length - 1) {
                return (
                  <div key={item.key}>
                    <div className={styles.divider} />
                    <div className={styles.modalItem} onClick={item.onClick}>
                      {item.icon()}
                      {item.label}
                    </div>
                  </div>
                )
              }
              return (
                <div key={item.key} className={styles.modalItem}>
                  {item.icon()}
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
