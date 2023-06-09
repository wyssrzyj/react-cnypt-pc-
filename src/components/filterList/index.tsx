import React, { useState, useEffect } from 'react'
import { toJS } from 'mobx'
import { Select, Tag, Button, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { isEmpty, find, isNil } from 'lodash'
import moment from 'moment'
import { useStores, observer } from '@/utils/mobx'
import { AreaModal } from './components'
import styles from './index.module.less'
import { useHistory } from 'react-router'

// const { TabPane } = Tabs
const { Option } = Select

const areaCategory = [
  { id: '440100', name: '广州市' },
  { id: '440300', name: '深圳市' },
  { id: '441900', name: '东莞市' },
  { id: '110100', name: '北京市' },
  { id: '310100', name: '上海市' },
  { id: '330100', name: '杭州市' },
  { id: '330200', name: '宁波市' },
  { id: '330700', name: '金华市' },
  { id: '330300', name: '温州市' },
  { id: '320100', name: '南京市' }
]

export const setUpTimeMap = [
  { label: '1年内', value: '0,1' },
  { label: '1~3年', value: '1,3' },
  { label: '3~5年', value: '3,5' },
  { label: '5~10年', value: '5,10' },
  { label: '10年以上', value: '10' }
]

export const updateTimeMap = [
  { label: '1天内', value: 1 },
  { label: '7天内', value: 6 },
  { label: '30天内', value: 29 },
  { label: '90天内', value: 89 },
  { label: '180天内', value: 179 },
  { label: '1年内', value: 364 }
]

const FilterList = props => {
  const history = useHistory()
  const { location } = history
  const { onFilterChange } = props
  const { factoryStore, commonStore } = useStores()
  const { dictionary, allArea } = commonStore
  const {
    effectiveLocation = [],
    processType = [],
    plusMaterialType = [],
    goodsNum = []
  } = dictionary
  const { productCategoryList } = factoryStore
  // const [factoryType, setFactoryType] = useState('all')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [activeArea, setActiveArea] = useState<any>([])
  const [activeProcessing, setActiveProcessing] = useState<any>({}) //加工类型
  const [activeTabs, setActiveTabs] = useState<any>([]) //主要数据
  const [mainCategory, setMainCategory] = useState<any>([
    { id: '', name: '全部' }
  ])
  const [deputyCategory, setDeputyCategory] = useState<any>([
    { id: '', name: '全部' }
  ])
  const [activeMainCategory, setActiveMainCategory] = useState<string>('')
  const [activeDeputyCategory, setActiveDeputyCategory] = useState<any>({
    id: '',
    name: '全部'
  })

  const [moreParams, setMoreParams] = useState<any>({})
  const [setUpTime, setSetUpTime] = useState<string>(null)
  const [updateTime, setUpdateTime] = useState<string>(null)
  // const [newTypeList, setNewTypeList] = useState<any[]>([])

  // const newTypeList = ['/factory-search', '/producer-search'].includes(
  //   location.pathname
  // )
  //   ? processType
  //   : processType
  const newTypeList = processType

  const newTime =
    location.pathname === '/factory-search' ? '更新时间' : '发布时间'

  const emptyFn = () => {
    // const newData = toJS(productCategoryList)
    // 清空子类
    // setActiveMainCategory('')
    // setActiveDeputyCategory({ id: '', name: '全部' })
    // setActiveArea([])
    setActiveProcessing({})
    // 清空已选标签
    setActiveTabs([])
    // 向上清空父组件的状态
    onFilterChange({
      cityIds: [],
      processType: '',
      mainCategoryParentId: '',
      mainCategoryChildId: ''
    })
    // 清空本组件的状态
    setActiveMainCategory('')
    setActiveDeputyCategory({ id: '', name: '全部' })
    setActiveArea([])
    setActiveProcessing({})
  }
  const cutMainCategory = id => {
    if (id) {
      const current =
        find(mainCategory, function (o) {
          return o.id === id
        }) || {}
      setActiveMainCategory(id)
      const newDeputyCategory = [{ id: '', name: '全部' }, ...current.children]
      setDeputyCategory([...newDeputyCategory])
      onFilterChange({ mainCategoryParentId: id, mainCategoryChildId: '' })
      setActiveDeputyCategory({ id: '', name: '全部' })
    } else {
      setActiveMainCategory(id)
      setDeputyCategory([])
      setActiveTabs([])
      onFilterChange({ mainCategoryParentId: '', mainCategoryChildId: '' })
    }
  }
  const selectActiveArea = params => {
    if (activeArea.length >= 8) {
      message.error('最多可选8个地区')
    } else {
      const index = activeArea.findIndex(area => area.id === params.id)
      if (index < 0) {
        activeArea.push(params)
      } else {
        activeArea.splice(index, 1)
      }
      onFilterChange({ cityIds: activeArea.map(item => item.id) })
      setActiveArea([...activeArea])
    }
  }

  const handleModalOk = cities => {
    setActiveArea([...cities])
    onFilterChange({ cityIds: cities.map(item => item.id) })
    setModalVisible(false)
  }
  const selectAllArea = () => {
    setActiveArea([])
    onFilterChange({ cityIds: [] })
  }

  const selectAllProcessing = () => {
    setActiveProcessing({})
    onFilterChange({ processType: '' })
  }

  // const onTabChange = activeKey => {
  //   setFactoryType(activeKey)
  //   onFilterChange({ factoryType: activeKey === 'all' ? '' : activeKey })
  // }
  const onProductChange = params => {
    setActiveDeputyCategory({ ...params })

    onFilterChange({
      mainCategoryChildId: params.id,
      mainCategoryParentId: activeMainCategory
    })
  }
  const onProcessingChange = params => {
    setActiveProcessing({ ...params })
    onFilterChange({ processType: params.id })
  }
  const onFactorySizeChange = (value, field) => {
    setMoreParams({
      ...moreParams,
      [field]: value
    })
    onFilterChange({
      [field]: value
    })
  }

  //成立时间
  const onSetUpTimeChange = value => {
    setSetUpTime(value)
    let start
    let end
    if (value) {
      const newValue = value.split(',')
      if (newValue.length > 1) {
        start = moment().add(-Number(newValue[1]), 'y').format('x')
        end = moment().add(-Number(newValue[0]), 'y').format('x')
      } else {
        start = ''
        end = moment().add(-Number(newValue[0]), 'y').format('x')
      }
    }
    onFilterChange({
      establishedTimeStart: start,
      establishedTimeEnd: end
    })
  }

  //更新时间
  const onUpdateTimeChange = value => {
    const start =
      location.pathname === '/factory-search'
        ? 'updateTimeStart'
        : 'releaseTimeStart'
    const end =
      location.pathname === '/factory-search'
        ? 'updateTimeEnd'
        : 'releaseTimeEnd'
    setUpdateTime(value)
    if (!isNil(value)) {
      onFilterChange({
        [start]: moment().subtract('days', value).format('x'),
        [end]: moment().format('x')
      })
    } else {
      onFilterChange({
        [start]: undefined,
        [end]: undefined
      })
    }
  }

  const closeTag = params => {
    const { id } = params
    //产品类别
    if (activeDeputyCategory.id === id) {
      setActiveDeputyCategory({ id: '' })
      onFilterChange({
        mainCategoryParentId: activeMainCategory,
        mainCategoryChildId: ''
      })
    }
    //地区分类
    const index = activeArea.findIndex(area => area.id === id)
    if (index > -1) {
      activeArea.splice(index, 1)
      onFilterChange({ cityIds: activeArea.map(item => item.id) })
      setActiveArea([...activeArea])
    }
    // 加工类型
    if (activeProcessing.id === id) {
      setActiveProcessing({})
      onFilterChange({ processType: '' })
    }
  }

  useEffect(() => {
    const newActiveTabs = [
      activeDeputyCategory, //产品类别
      activeProcessing, //加工类型
      ...activeArea //地区
    ].filter(item => item.name && item.name !== '全部')
    setActiveTabs([...newActiveTabs])
  }, [activeArea, activeProcessing, activeDeputyCategory])

  useEffect(() => {
    if (!isEmpty(productCategoryList)) {
      const newData = toJS(productCategoryList)

      const { location } = history
      const state: any = location.state || {}
      // 首页跳转初始化类别
      if (state && state.mainCategoryChildId && state.mainCategoryParentId) {
        setMainCategory([{ id: '', name: '全部' }, ...newData])
        setActiveMainCategory(state.mainCategoryParentId)
        const targetCategory = toJS(productCategoryList).find(
          item => item.id === state.mainCategoryParentId
        )
        if (targetCategory && targetCategory.children) {
          setDeputyCategory([...targetCategory.children])
          const target = targetCategory.children.find(
            i => i.id === state.mainCategoryChildId
          )
          if (target) {
            setActiveDeputyCategory({ id: target.id, name: target.name })
            onFilterChange({
              mainCategoryParentId: state.mainCategoryParentId,
              mainCategoryChildId: state.mainCategoryChildId
            })
          }
          return
        }
      }

      setMainCategory([{ id: '', name: '全部' }, ...newData])
      // setActiveMainCategory(newData[0].id)
      // const newDeputyCategory = [...deputyCategory, ...newData[0].children]
      // setDeputyCategory([...newDeputyCategory])
      setDeputyCategory([])
    }
  }, [productCategoryList])

  useEffect(() => {
    // 首页跳转 初始化地区
    const { location } = history

    const state: any = location.state || {}
    const { cityIds } = state
    let targetArea = []
    let targetCitys = []
    if (state && cityIds && cityIds.length) {
      cityIds.forEach(item => {
        const t = toJS(allArea).find(i => i.value === item[0]) //  目标省份

        if (t && t.children) {
          const target = t.children.find(i => i.value === item[1])
          target.id = target.value
          target.name = target.label
          if (target && target.children) {
            delete target.children
            targetArea.push(target)
            targetCitys.push(item[1])
          }
        }
      })
    }
    setActiveArea(targetArea)
    !isEmpty(targetCitys) && onFilterChange({ cityIds: targetCitys })
  }, [])

  return (
    <div className={styles.filterList}>
      <div className={styles.classification}>
        <div className={styles.classificationLabel}>产品类别</div>
        <div
          className={classNames(styles.classificationItem, styles.classesBox)}
        >
          <div>
            {mainCategory.map(item => (
              <span
                key={item.id}
                className={classNames(
                  styles.classificationSpan,
                  item.id === activeMainCategory ? styles.active : null
                )}
                onClick={() => cutMainCategory(item.id)}
              >
                {item.name}
              </span>
            ))}
          </div>
          <div>
            {deputyCategory.map(item => (
              <span
                key={item.id}
                className={classNames(
                  styles.classificationSpan,
                  item.id === activeDeputyCategory.id ? styles.active : null
                )}
                onClick={() =>
                  onProductChange({ id: item.id, name: item.name })
                }
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.classification}>
        <div className={styles.classificationLabel}>地区分类</div>
        <div
          className={classNames(styles.classificationItem, styles.areaCategory)}
        >
          <div>
            <span
              className={classNames(
                styles.classificationSpan,
                isEmpty(activeArea) ? styles.active : null
              )}
              onClick={selectAllArea}
            >
              全部
            </span>
            {areaCategory.map(item => (
              <span
                key={item.id}
                className={classNames(
                  styles.classificationSpan,
                  activeArea.findIndex(val => val.id === item.id) > -1
                    ? styles.active
                    : null
                )}
                onClick={() => selectActiveArea(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
          <Button
            style={{ color: '#999999' }}
            disabled={!toJS(allArea).length}
            onClick={() => setModalVisible(true)}
          >
            更多
          </Button>
        </div>
      </div>
      <div className={styles.classification}>
        <div className={styles.classificationLabel}>加工类型</div>
        <div className={styles.classificationItem}>
          <span
            className={classNames(
              styles.classificationSpan,
              isEmpty(activeProcessing) ? styles.active : null
            )}
            onClick={selectAllProcessing}
          >
            全部
          </span>
          {newTypeList.map(item => (
            <span
              key={item.id}
              className={classNames(
                styles.classificationSpan,
                item.value === activeProcessing.id ? styles.active : null
              )}
              onClick={() =>
                onProcessingChange({ id: item.value, name: item.label })
              }
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.classification}>
        <div className={styles.classificationLabel}>更多选项</div>
        <div className={styles.classificationItem}>
          {location.pathname === '/factory-search' && (
            <Select
              allowClear
              placeholder="成立时间"
              value={setUpTime}
              className={styles.moreSelect}
              onChange={onSetUpTimeChange}
            >
              {setUpTimeMap.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
          <Select
            allowClear
            placeholder={
              '有效车位'
              // location.pathname === '/factory-search' ? '有效车位' : '工厂规模'
            }
            className={styles.moreSelect}
            value={moreParams.effectiveLocation}
            onChange={value => onFactorySizeChange(value, 'effectiveLocation')}
          >
            {effectiveLocation.map(item => (
              <Option key={item.id} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          {location.pathname === '/order-search' && (
            <Select
              allowClear
              placeholder="面料类型"
              className={styles.moreSelect}
              value={moreParams.plusMaterialType}
              onChange={value => onFactorySizeChange(value, 'plusMaterialType')}
            >
              {plusMaterialType.map(item => (
                <Option key={item.id} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
          <Select
            allowClear
            value={updateTime}
            onChange={onUpdateTimeChange}
            placeholder={newTime}
            className={styles.moreSelect}
          >
            {updateTimeMap.map(item => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          {location.pathname === '/order-search' && (
            <Select
              allowClear
              style={{ width: 140 }}
              placeholder="订单数量"
              className={styles.moreSelect}
              value={moreParams.goodsNum}
              onChange={value => onFactorySizeChange(value, 'goodsNum')}
            >
              {goodsNum.map(item => (
                <Option key={item.id} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
      <div className={styles.classification}>
        <div className={styles.classificationLabel}>已选条件</div>
        <div className={styles.classificationItem}>
          {activeTabs.map(item => (
            <Tag
              className={styles.activeTab}
              closable
              key={item.id + 'tag'}
              onClose={() => closeTag(item)}
            >
              {item.name}
            </Tag>
          ))}
          {!isEmpty(activeTabs) && (
            <Button
              style={{ color: '#999999' }}
              icon={<DeleteOutlined />}
              onClick={emptyFn}
            >
              清空
            </Button>
          )}
        </div>
      </div>

      {modalVisible && (
        <AreaModal
          visible={modalVisible} //弹窗
          // selectedCity={activeArea}
          handleCancel={() => setModalVisible(false)} //点击遮罩层或右上角叉或取消按钮的回调
          handleOk={handleModalOk} //确认的回调
        />
      )}
    </div>
  )
}
export default observer(FilterList)
