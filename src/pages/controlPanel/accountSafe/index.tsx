import React, { useState, useRef, useEffect } from 'react'
import { Input, message, Button } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import PwdModal from './pwdModal'
import PhoneModal from './phoneModal'
import EmailModal from './emailModal'
import UnbindModal from './unbindModal'
import { getCurrentUser } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import UploadFile from './upload'

const Title = ({ title }) => (
  <div className={styles.title}>
    <div className={styles.titleLine}></div>
    {title}
  </div>
)

const AccountSafe = () => {
  const history = useHistory()
  const { controlPanelStore } = useStores()
  const { getAccountInfo, changeUserInfo } = controlPanelStore

  const currentUser = getCurrentUser()
  const nameRef = useRef<Input>()

  const [changeFlag, setChangeFlag] = useState(false)
  const [name, setName] = useState(currentUser.nickName)
  const [modalKey, setModalKey] = useState(0)
  const [userInfo, setUserInfo] = useState<any>({})

  const userMobile = currentUser.mobilePhone || ''

  const showTel = userMobile.substr(0, 3) + '****' + userMobile.substr(7)

  useEffect(() => {
    ;(async () => {
      const user =
        (await getAccountInfo({
          userId: currentUser.userId
        })) || {}
      setUserInfo(user)
    })()
  }, [])

  const flagChange = () => {
    setChangeFlag(f => !f)
  }

  const showLogs = () => {
    history.push(`/control-panel/logs/${currentUser.userId}`)
  }

  const nameChange = event => {
    const { value } = event.target
    setName(value)
  }

  const nameBlur = async event => {
    const { value } = event.target
    const params = {
      nickName: value,
      userId: currentUser.userId
    }
    const res = await changeUserInfo(params)
    if (res) {
      setName(value)
      const newCurrentUser = cloneDeep(currentUser)
      newCurrentUser.nickName = value
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser))
    }
    flagChange()
  }

  const copyName = () => {
    nameRef.current.select()
    document.execCommand('Copy')
    message.success('用户名复制成功~')
    nameRef.current.blur()
  }

  const configs = [
    {
      title: '登录密码',
      icon: 'jack-dlmm',
      text: '安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码'
    },
    {
      title: '手机绑定',
      icon: 'jack-sjbd',
      text: `您已绑定了手机${showTel}。[您的手机号可以直接用于登录、找回密码等]`
    }
    // {
    //   title: '邮箱绑定',
    //   icon: 'jack-youxiang1',
    //   text: '您还未设置电子邮箱。'
    // }
  ]

  const otherPart = [
    {
      label: '微信',
      icon: 'jack-weixin1',
      status: 0
    }
    // {
    //   label: '支付宝',
    //   icon: 'jack-zhifubao',
    //   status: 0
    // },
    // {
    //   label: '优产',
    //   icon: 'jack-you',
    //   status: 1
    // }
  ]

  const showModals = index => {
    if ([3, 4, 5, 6].includes(index)) {
      message.error('该功能暂未开放~')
      return
    }
    setModalKey(index)
  }

  const thirdPartClick = (status, index) => {
    const count = !index ? 5 : index + 4
    showModals(count)
    if (status === 1) {
    }
  }

  const changeAvatar = async url => {
    const params = {
      userFaceUrl: url,
      userId: currentUser.userId
    }
    const res = await changeUserInfo(params)
    console.log('🚀 ~ file: index.tsx ~ line 143 ~ AccountSafe ~ res', res)
    if (res) {
      const newUserInfo = cloneDeep(userInfo)
      newUserInfo.userFaceUrl = url
      setUserInfo(newUserInfo)

      const newCurrentUser = cloneDeep(currentUser)
      newCurrentUser.userFaceUrl = url
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser))
    }
  }

  return (
    <div className={styles.accountBox}>
      <div className={styles.accountInfo}>
        <Title title={'账号信息'} />
        <div className={styles.infoBox}>
          <div className={styles.avatarBox}>
            <img src={userInfo.userFaceUrl} className={styles.avatar} alt="" />
            <UploadFile onChange={changeAvatar} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.changeNameItem}>
              {changeFlag ? (
                <div className={styles.changeNameBox}>
                  <Input
                    onChange={nameChange}
                    onBlur={nameBlur}
                    className={styles.changeText}
                    value={name}
                  />
                  <Button
                    className={styles.changeBtn}
                    onClick={nameBlur}
                    size={'small'}
                    type={'primary'}
                  >
                    修改
                  </Button>
                </div>
              ) : (
                <div className={styles.changeName}>{name}</div>
              )}
              <Icon
                onClick={flagChange}
                className={styles.editIcon}
                type={'jack-bianji1'}
              ></Icon>
            </div>
            <div className={styles.changeItem}>
              <Icon
                type={'jack-gerenzhongxin1'}
                className={styles.userInfoIcon}
              ></Icon>
              <div className={styles.changeLabel}>用户名</div>
              <Input
                ref={nameRef}
                value={currentUser.username}
                className={styles.changeText}
              ></Input>
              <div onClick={copyName} className={styles.cText}>
                复制
              </div>
            </div>

            <div className={styles.changeItem}>
              <Icon
                type={'jack-qiyemingcheng'}
                className={styles.userInfoIcon}
              ></Icon>
              <div className={styles.changeLabel}>企业名称</div>
              <div className={styles.changeText}>{userInfo.enterpriseName}</div>
            </div>
            <div className={styles.changeItem}>
              <Icon
                type={'jack-zhuceshijian'}
                className={styles.userInfoIcon}
              ></Icon>
              <div className={styles.changeLabel}>注册时间</div>
              <div className={styles.changeText}>
                {userInfo.registerTime
                  ? moment(userInfo.registerTime).format('YYYY-MM-DD HH:mm:ss')
                  : null}
              </div>
              <div onClick={showLogs} className={styles.cText}>
                登录日志
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.safeSet}>
        <Title title={'安全设置'} />
        <div className={styles.safeBox}>
          {configs.map((item, idx) => {
            return (
              <div key={idx} className={styles.safeItem}>
                <Icon type={item.icon} className={styles.safeImg}></Icon>
                <div className={styles.safeLabelText}>{item.title}</div>
                <div className={styles.safeText}>{item.text}</div>
                <div className={styles.editBox}>
                  <span
                    className={styles.editRight}
                    onClick={() => showModals(idx + 1)}
                  >
                    修改
                  </span>
                  <div className={styles.editSet}>已设置</div>
                </div>
              </div>
            )
          })}
          {/* 电子邮箱绑定 */}
          <div className={styles.safeItem}>
            <Icon type={'jack-yxbd'} className={styles.safeImg}></Icon>
            <span className={styles.safeLabelText}>邮箱绑定</span>
            <div className={styles.safeText}>
              {false
                ? '您已绑定电子邮箱13587760358@163.com。'
                : '您还未设置电子邮箱。'}
            </div>
            <div className={styles.editBox}>
              <span className={false ? styles.editSet : styles.editSet2}>
                {false ? '已设置' : '未设置'}
              </span>
              <span
                className={styles.editRight}
                onClick={() => showModals(false ? 4 : 3)}
              >
                {false ? '解绑' : '设置'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.otherContainer}>
        <Title title={'第三方绑定'} />
        <div className={styles.otherBox}>
          {otherPart.map((item, idx) => {
            return (
              <div
                key={idx}
                className={styles.otherItem}
                onClick={() => thirdPartClick(item.status, idx)}
              >
                <Icon type={item.icon} className={styles.otherIcon}></Icon>
                <div className={styles.otherText}>
                  <Icon
                    type={'jack-bangding'}
                    className={styles.otherTextIcon}
                  ></Icon>
                  {item.status ? '解除绑定' : '立即绑定'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {modalKey === 1 ? (
        <PwdModal cancel={() => showModals(0)}></PwdModal>
      ) : null}
      {modalKey === 2 ? (
        <PhoneModal cancel={() => showModals(0)}></PhoneModal>
      ) : null}
      {modalKey === 3 ? (
        <EmailModal cancel={() => showModals(0)}></EmailModal>
      ) : null}
      {[4, 5, 6].includes(modalKey) ? (
        <UnbindModal
          cancel={() => showModals(0)}
          index={modalKey - 3}
        ></UnbindModal>
      ) : null}
    </div>
  )
}

export default AccountSafe
