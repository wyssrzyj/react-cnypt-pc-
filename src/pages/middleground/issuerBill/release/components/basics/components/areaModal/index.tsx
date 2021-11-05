import React, { useState, useEffect } from 'react'
import { Modal, Button, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isFunction } from 'lodash'
import { toJS } from 'mobx'
import { useStores, observer } from '@/utils/mobx'
import classNames from 'classnames'
import styles from './index.module.less'
import { isArray } from '_@antv_util@2.0.17@@antv/util'

const AreaModal = props => {
  const { commonStore } = useStores()
  const { allArea } = commonStore
  const wholeCountry = [
    {
      label: '不限',
      value: '0',
      children: [
        {
          label: '不限',
          value: '0',
          children: []
        }
      ]
    }
  ]
  const newAllArea = wholeCountry.concat(toJS(allArea)) //字典数据

  const { visible, handleOk, handleCancel, selectedCity = [] } = props
  const [cityTree, setCityTree] = useState<any>([...newAllArea[0].children])
  const [activeCity, setActiveCity] = useState<any>([...selectedCity])
  const [newData, setNewData] = useState<any>() //最新的数据

  const [leftMethod, setLeftMethod] = useState<any>({}) //父节点数据
  const [color, setColor] = useState(false) //控制字体的颜色
  const [activeProvince, setActiveProvince] = useState<string>(
    newAllArea[0].value
  )
  //  点击左侧显示颜色
  useEffect(() => {
    let res = activeCity.findIndex(item => item.id === leftMethod['value'])
    if (res !== -1) {
      // console.log('数组中有当前父节点，显示全部')
      setColor(true)
    } else {
      // console.log('没有不显示')
      setColor(false)
    }
    setNewData(activeCity)

    // console.log(activeCity)
    // console.log('父节点的id', leftMethod)
    // let num = activeCity.filter(item => item.pid === leftMethod.value)
    // if (leftMethod.children !== undefined) {
    //   if (num.length === leftMethod.children.length) {
    //     console.log('子项全有了')
    //     console.log(num)
    //     console.log(activeCity)
    //     let index = activeCity.filter(item => item.pid !== leftMethod['value'])
    //     let parent = [
    //       {
    //         label: leftMethod['label'],
    //         value: leftMethod['value'],
    //         pid: leftMethod['value']
    //       }
    //     ]
    //     setNewData(index.concat(parent))
    //   }
    // }
  }, [activeCity, leftMethod])

  //

  const selectProvince = id => {
    // 点击的时候当 数组中有当前项的父节点就 为 true  反之false
    // setColor(false) //点击左侧让 全部颜色消失
    setActiveProvince(id)
    const currentCity = newAllArea.find(tree => tree.value === id) || {}
    setLeftMethod(currentCity)

    if (id !== '0') {
      // 父节点数据 添加到子项中
      let parent = [
        {
          label: currentCity['label'],
          value: currentCity['value'],
          pid: currentCity['value']
        }
      ].concat(currentCity['children'])
      setCityTree(parent)
    } else {
      setCityTree(currentCity['children'])
    }
  }

  const selectCity = (params, city) => {
    // 存点击的数据的
    if (params.id === city[0].value) {
      //  点击父级让子级消失
      let fiji = activeCity.filter(item => item.pid === city[0].value) //获取数组中所有当前父节点的子项数据
      //删除数组中他俩的数据
      fiji.forEach(item => {
        const index = activeCity.findIndex(city => city.id === item.id) //
        if (index !== -1) {
          activeCity.splice(index, 1)
        }
      })
    }
    // 子级问题
    let arr = activeCity.findIndex(item => item.id === city[0].value)
    let arr1 = activeCity.findIndex(item => item.id === '0') //删除全国

    if (arr !== -1) {
      activeCity.splice(arr, 1)
    }
    if (arr1 !== -1) {
      activeCity.splice(arr1, 1)
    }

    // 添加
    const index = activeCity.findIndex(city => city.id === params.id) //
    if (index < 0) {
      activeCity.push(params) //  如果是-1就添加
    } else {
      activeCity.splice(index, 1)
    }
    setActiveCity([...activeCity])

    // css 判断数组中是否有父级
    const showAll = activeCity.findIndex(item => item.id === city[0].pid) //
    if (showAll !== -1) {
      setColor(true)
    } else {
      setColor(false)
    }

    // console.log(city[0])
    // const arrlist = activeCity.findIndex(city => city.id === city[0].value) //
    // console.log(arrlist)

    // 全国
    if (params.id === '0') {
      setActiveCity(activeCity.filter(item => item.id === params.id)) //只留全国
    }

    console.log(newData)
    console.log('父节点的id', leftMethod)
    let num = newData.filter(item => item.pid === leftMethod.value)
    if (leftMethod.children !== undefined) {
      if (num.length === leftMethod.children.length) {
        console.log('子项全有了')
        console.log(num)
        console.log(newData)
        if (newData) {
          let index = newData.filter(item => item.pid !== leftMethod['value'])
          let parent = [
            {
              name: leftMethod['label'],
              id: leftMethod['value'],
              pid: leftMethod['value']
            }
          ]
          console.log(index.concat(parent))
          setActiveCity(index.concat(parent))
        }
      }
    }
  }

  const closeTag = id => {
    const index = activeCity.findIndex(city => city.id === id)
    activeCity.splice(index, 1)
    setActiveCity([...activeCity])
  }

  const emptyCity = () => {
    setActiveCity([])
    // isFunction(handleOk) && handleOk([])
  }
  const confirmFn = () => {
    isFunction(handleOk) && handleOk(activeCity)
  }

  return (
    <Modal
      title="请选择地区"
      visible={visible}
      onOk={confirmFn}
      onCancel={handleCancel}
      width={660}
    >
      <div className={styles.hasChosen}>
        <div>
          <span>已选择：</span>
          {activeCity.map(city => (
            <Tag
              key={city.id}
              className={styles.selectedTag}
              closable
              onClose={() => closeTag(city.id)}
            >
              {city.name}
            </Tag>
          ))}
        </div>
        <Button icon={<DeleteOutlined />} onClick={emptyCity}>
          清空
        </Button>
      </div>
      <div className={styles.areaList}>
        <div className={styles.areaLeft}>
          {/* 省 */}
          {newAllArea.map(item => (
            <div
              key={item.value}
              className={classNames(
                styles.provinces,
                item.value === activeProvince ? styles.active : null
              )}
              onClick={() => selectProvince(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.areaRight}>
          {isArray(cityTree) &&
            cityTree.map(city => (
              <span
                key={city.value}
                className={classNames(
                  styles.cityBox,
                  color ? styles.cityActive : null,
                  activeCity.findIndex(val => val.id === city.value) > -1
                    ? styles.cityActive
                    : null
                )}
                onClick={() =>
                  selectCity(
                    { id: city.value, name: city.label, pid: city.pid },
                    cityTree
                  )
                }
              >
                {city.label}
              </span>
            ))}
        </div>
      </div>
    </Modal>
  )
}

export default observer(AreaModal)
