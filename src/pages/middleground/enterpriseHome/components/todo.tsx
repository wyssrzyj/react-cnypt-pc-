import React, { useEffect, useState } from 'react'
import { Title } from '../../controlPanel/accountSafe'
import styles from './todo.module.less'
import { Button } from 'antd'

import { Icon } from '@/components' //路径
import { getUserInfo } from '@/utils/tool'
import { useStores, toJS, observer } from '@/utils/mobx'
import moment from 'moment'
import MachiningData from './machiningData'
import ProcessingAgency from './processingAgency'
import IssuingData from './IssuingData'
import IssuingAgent from './IssuingAgent'
import { getTrees } from './method/index'
import { useHistory } from 'react-router-dom'

const EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/zwyp_bg.png'

const Todo = () => {
  const emptyFlag = false
  const userInfo = getUserInfo() || {}
  const { enterpriseType, enterpriseId } = userInfo
  const { demandListStore, commonStore, enterpriseStore } = useStores()
  const { dictionary } = toJS(commonStore)
  const { goodsNum = [], processType = [] } = toJS(dictionary)
  const { push } = useHistory()

  const { enterpriseTips, processingFactoryData, applicationList } =
    demandListStore

  const { productCategory } = enterpriseStore
  const [enterpriseids, setEnterprise] = useState()
  const [enterpriseStatus, setEnterpriseStatus] = useState()
  const [name, setName] = useState()
  const [information, setInformation] = useState<any>({})
  const [machiningData, setMachiningData] = useState<any>([]) //加工厂数据
  const [enterpriseInformation, setEnterpriseInformation] = useState({})
  const [issuingData, setIssuingData] = useState<any>([]) //发单处理数据

  useEffect(() => {
    setEnterprise(enterpriseId) //企业id
    arr()
  }, [])

  const arr = async () => {
    let data = await enterpriseTips({ enterpriseId: enterpriseId })
    const machining = await processingFactoryData({})
    // 加工厂数据处理
    machining.map(item => {
      item.deliveryDate = moment(item.deliveryDate).format('YYYY-MM-DD')
      if (goodsNum) {
        item.goodsNum = goodsNum.filter(i => i.value === item.goodsNum)[0].label
      }
      item.releaseTime = moment(item.releaseTime).format('YYYY-MM-DD HH:mm:ss')
    })
    setMachiningData(machining)
    setEnterpriseInformation(data)
    setEnterpriseStatus(data.infoApprovalStatus) //状态
    setName(data.enterpriseName) //企业名称
    setInformation(data)

    // 发单商数据
    let arr1 = await applicationList({ status: 2 })
    const category = await productCategory() //主营类别
    const list = arr1.data.records
    list.map(res => {
      //主营类别
      if (category) {
        res.factoryCategoryList =
          getTrees(res.factoryCategoryList, category, 'code', 'name').join(
            '、'
          ) || '暂无'
      }
      //加工类型
      if (processType) {
        res.processTypeValues = getTrees(
          res.processTypeValues,
          processType,
          'value',
          'label'
        ).join('、')
      }
    })
    setIssuingData(list)
  }
  const findOrder = () => {
    push({ pathname: '/control-panel/panel/enterprise' })
  }

  return (
    <div className={styles.todo}>
      <Title title={'待办事项'}></Title>
      <div className={styles.todoContent}>
        {/* 判断企业、工厂是否入驻 */}
        {enterpriseids ? (
          //企业、工厂已入驻
          <div>
            {enterpriseType === '0' ? (
              <div>
                {/* 加工厂待办事项 */}
                <ProcessingAgency
                  enterpriseStatus={enterpriseStatus}
                  enterpriseId={enterpriseId}
                  information={information}
                  name={name}
                ></ProcessingAgency>
                {/* 加工厂数据 */}
                <MachiningData data={machiningData}></MachiningData>
              </div>
            ) : null}
            {enterpriseType === '1' ? (
              <div>
                <IssuingAgent
                  data={enterpriseInformation}
                  enterpriseId={enterpriseId}
                  name={name}
                ></IssuingAgent>
                {/* 发单商数据 */}
                <IssuingData issuingData={issuingData}></IssuingData>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {/* 企业/工厂未入住 */}
            <div className={styles.content}>
              <div className={styles.icons}>
                <Icon type="jack-xttz_icon" className={styles.previous} />
              </div>
              <div className={styles.txt}>
                <div className={styles.test}>
                  <div className={styles.announcement}>系统通知</div>
                  <div className={styles.written}>
                    尊敬的用户您好，欢迎来到优产云平台，请您前往
                    <span className={styles.cont}>企业信息</span>
                    ,按您的实际情况前往完善企业信息，以方便我们为您提供更优质的服务。
                  </div>
                </div>
                <div className={styles.btn}>
                  <Button
                    type="primary"
                    onClick={() => {
                      findOrder()
                    }}
                    ghost
                  >
                    立即前往
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 为空的时候展示 */}
        {emptyFlag ? (
          <div className={styles.emptyContent}>
            <img src={EMPTY} alt="" className={styles.emptyImg} />
            <div>您目前没有任何待办事项哦 ~</div>
          </div>
        ) : null}
      </div>
      <div className={styles.testx}>
        <div className={styles.scrollbar}></div>
      </div>
    </div>
  )
}

export default observer(Todo)
