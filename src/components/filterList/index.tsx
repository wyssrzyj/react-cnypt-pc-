import React, { useState, useEffect } from 'react'
import { toJS } from 'mobx'
import { Tabs, Select, Tag, Button, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { isEmpty, find } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { AreaModal } from './components'
import styles from './index.module.less'

const { TabPane } = Tabs
const { Option } = Select

const areaCategory = [
  { id: '1966', name: '广州市' },
  { id: '1989', name: '深圳市' },
  { id: '2092', name: '东莞市' },
  { id: '3', name: '北京市' },
  { id: '803', name: '上海市' },
  { id: '935', name: '杭州市' },
  { id: '949', name: '宁波市' },
  { id: '994', name: '金华市' },
  { id: '961', name: '温州市' },
  { id: '822', name: '南京市' }
]

const setUpTime = [
  { label: '1年内', value: '1年内' },
  { label: '1~3年', value: '1~3年' },
  { label: '3~5年', value: '3~5年' },
  { label: '5~10年', value: '5~10年' },
  { label: '10年以上', value: '10年以上' }
]

const updateTime = [
  { label: '1天内', value: '1天内' },
  { label: '7天内', value: '7天内' },
  { label: '30天内', value: '30天内' },
  { label: '90天内', value: '0天内' },
  { label: '180天内', value: '180天内' },
  { label: '1年内', value: '1年内' }
]

const FilterList = props => {
  const { types, onFilterChange } = props
  const { factoryStore, commonStore } = useStores()
  const { dictionary } = commonStore
  console.log('🚀 ~ file: index.tsx ~ line 48 ~ dictionary', dictionary)
  const { prodType = [], factoryStaffNumber = [] } = toJS(dictionary)
  const { productCategoryList } = factoryStore
  const [factoryType, setFactoryType] = useState('all')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [activeArea, setActiveArea] = useState<any>([])
  const [activeProcessing, setActiveProcessing] = useState<any>({}) //加工类型
  const [activeTabs, setActiveTabs] = useState<any>([])
  const [mainCategory, setMainCategory] = useState<any>([])
  const [deputyCategory, setDeputyCategory] = useState<any>([
    { id: '', name: '全部' }
  ])
  const [activeMainCategory, setActiveMainCategory] = useState<string>('')
  const [activeDeputyCategory, setActiveDeputyCategory] = useState<any>({
    id: '',
    name: '全部'
  })
  const [factorySize, setFactorySize] = useState<string>(null)

  const emptyFn = () => {
    const newData = toJS(productCategoryList)
    // 清空已选标签
    setActiveTabs([])
    // 向上清空父组件的状态
    onFilterChange({
      cityIds: [],
      prodType: '',
      mainCategoryParentId: newData[0].id,
      mainCategoryChildId: ''
    })
    // 清空本组件的状态
    setActiveMainCategory(newData[0].id)
    setActiveDeputyCategory({ id: '', name: '全部' })
    setActiveArea([])
    setActiveProcessing({})
  }
  const cutMainCategory = id => {
    const current =
      find(mainCategory, function (o) {
        return o.id === id
      }) || {}
    setActiveMainCategory(id)
    const newDeputyCategory = [{ id: '', name: '全部' }, ...current.childList]
    setDeputyCategory([...newDeputyCategory])
    onFilterChange({ mainCategoryParentId: id, mainCategoryChildId: '' })
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
    onFilterChange({ prodType: '' })
  }

  const onTabChange = activeKey => {
    setFactoryType(activeKey)
    onFilterChange({ factoryType: activeKey === 'all' ? '' : activeKey })
  }
  const onProductChange = params => {
    setActiveDeputyCategory({ ...params })
    onFilterChange({
      mainCategoryChildId: params.id,
      mainCategoryParentId: activeMainCategory
    })
  }
  const onProcessingChange = params => {
    setActiveProcessing({ ...params })
    onFilterChange({ prodType: params.id })
  }
  const onFactorySizeChange = value => {
    setFactorySize(value)
    if (value) {
      const newValue = value.split(',')
      onFilterChange({
        staffNumberStart: newValue[0],
        staffNumberEnd: newValue[1]
      })
    } else {
      onFilterChange({
        staffNumberStart: '',
        staffNumberEnd: ''
      })
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
      setMainCategory([...newData])
      setActiveMainCategory(newData[0].id)
      const newDeputyCategory = [...deputyCategory, ...newData[0].childList]
      setDeputyCategory([...newDeputyCategory])
    }
  }, [productCategoryList])

  return (
    <div className={styles.filterList}>
      <Tabs
        type="card"
        size="large"
        activeKey={factoryType}
        onChange={onTabChange}
      >
        {types.map(dressType => (
          <TabPane
            tab={
              <span>
                {dressType.icon}
                {dressType.type}
              </span>
            }
            key={dressType.key}
          >
            <div className={styles.classification}>
              <div className={styles.classificationLabel}>产品类别</div>
              <div className={styles.classificationItem}>
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
                        item.id === activeDeputyCategory.id
                          ? styles.active
                          : null
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
                className={classNames(
                  styles.classificationItem,
                  styles.areaCategory
                )}
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
                <Button onClick={() => setModalVisible(true)}>更多</Button>
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
                {prodType.map(item => (
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
                <Select
                  allowClear
                  placeholder="成立时间"
                  className={styles.moreSelect}
                >
                  {setUpTime.map(item => (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  allowClear
                  placeholder="工厂规模"
                  className={styles.moreSelect}
                  value={factorySize}
                  onChange={onFactorySizeChange}
                >
                  {factoryStaffNumber.map(item => (
                    <Option key={item.id} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  allowClear
                  placeholder="更新时间"
                  className={styles.moreSelect}
                >
                  {updateTime.map(item => (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles.classification}>
              <div className={styles.classificationLabel}>已选条件</div>
              <div className={styles.classificationItem}>
                {activeTabs.map(item => (
                  <Tag
                    color="orange"
                    className={styles.activeTab}
                    closable
                    key={item.id}
                  >
                    {item.name}
                  </Tag>
                ))}
                {!isEmpty(activeTabs) && (
                  <Button icon={<DeleteOutlined />} onClick={emptyFn}>
                    清空
                  </Button>
                )}
              </div>
            </div>
          </TabPane>
        ))}
      </Tabs>
      {modalVisible && (
        <AreaModal
          visible={modalVisible}
          selectedCity={activeArea}
          handleCancel={() => setModalVisible(false)}
          handleOk={handleModalOk}
        />
      )}
    </div>
  )
}
export default observer(FilterList)
