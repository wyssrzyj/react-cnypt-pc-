import React, { useState } from 'react'
import { Select } from 'antd'
import { toJS } from 'mobx'
import AreaModal from './components/areaModal'
import { observer, useStores } from '@/utils/mobx'
import { isArray } from '_@antv_util@2.0.17@@antv/util'
const { Option } = Select
function region() {
  const { commonStore, demandListStore } = useStores()
  const { allArea } = commonStore
  const { popUpData } = demandListStore
  // -------------------
  //全部地区
  const list = item => {
    let sum = []
    item.forEach(item => {
      sum.push(item)
      if (isArray(item.children)) {
        item.children.forEach(s => {
          sum.push(s)
        })
      }
    })
    return sum
  }
  const children = []

  list(toJS(allArea)).map(item =>
    children.push(
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    )
  )

  // -------------------

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const handleModalOk = cities => {
    popUpData(cities)
    setModalVisible(false)
  }
  return (
    <div>
      <div onClick={() => setModalVisible(true)}>
        <Select
          mode="multiple"
          allowClear
          open={false}
          style={{ width: '100%' }}
          placeholder="请选择地区"
        >
          {children}
        </Select>
      </div>

      {modalVisible && (
        <AreaModal
          visible={modalVisible} //弹窗
          handleCancel={() => setModalVisible(false)} //点击遮罩层或右上角叉或取消按钮的回调
          handleOk={handleModalOk} //确认的回调
        />
      )}
    </div>
  )
}

export default observer(region)
