import React from 'react'
import { Tree } from 'antd'
import {
  PlusCircleOutlined,
  EditOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'

const InfoTree = props => {
  const { operateModal } = props
  const addMinusDepartment = (e, type) => {
    e.stopPropagation()
    operateModal(type)
  }
  const treeData = [
    {
      title: (
        <div className="tree-list">
          <div className="tree-list-left">后台</div>
          <div>
            <PlusCircleOutlined
              className="tree-icon"
              onClick={e => addMinusDepartment(e, 'add')}
            />
          </div>
        </div>
      ),
      key: '0-0',
      children: [
        {
          title: (
            <div className="tree-list">
              <div className="tree-list-left">杭州分公司</div>
              <div>
                <EditOutlined
                  className="tree-icon"
                  onClick={e => addMinusDepartment(e, 'edit')}
                />
                <MinusCircleOutlined
                  className="tree-icon"
                  onClick={e => addMinusDepartment(e, 'minus')}
                />
                <PlusCircleOutlined
                  className="tree-icon"
                  onClick={e => addMinusDepartment(e, 'add')}
                />
              </div>
            </div>
          ),
          key: '0-0-0',
          children: [
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">总经办</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-0-0'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">行政部</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-0-1'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">秘书部</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-0-2'
            }
          ]
        },
        {
          title: (
            <div className="tree-list">
              <div className="tree-list-left">运维部</div>
              <div>
                <EditOutlined className="tree-icon" />
                <MinusCircleOutlined className="tree-icon" />
                <PlusCircleOutlined className="tree-icon" />
              </div>
            </div>
          ),
          key: '0-0-1',
          children: [
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">浙江站</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-1-0'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">江苏站</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-1-1'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">福建站</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-1-2'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">广东站</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-1-3'
            }
          ]
        },
        {
          title: (
            <div className="tree-list">
              <div className="tree-list-left">开发部</div>
              <div>
                <EditOutlined className="tree-icon" />
                <MinusCircleOutlined className="tree-icon" />
                <PlusCircleOutlined className="tree-icon" />
              </div>
            </div>
          ),
          key: '0-0-2',
          children: [
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">测试组</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-2-0'
            },
            {
              title: (
                <div className="tree-list">
                  <div className="tree-list-left">开发组</div>
                  <div>
                    <EditOutlined className="tree-icon" />
                    <MinusCircleOutlined className="tree-icon" />
                    <PlusCircleOutlined className="tree-icon" />
                  </div>
                </div>
              ),
              key: '0-0-2-1'
            }
          ]
        }
      ]
    }
  ]

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info)
  }
  return (
    <div className="tree-container">
      <Tree
        showLine={{ showLeafIcon: false }}
        showIcon={false}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  )
}
export default InfoTree
