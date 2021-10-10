import React, { useState } from 'react'
import { Modal, Button, Input, Col, Table } from 'antd'
import styles from './index.module.less'
import { Icon } from '@/components'
function cooperation() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [value, setValue] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    // 调取接口
    console.log(selectedRowKeys)
    setSelectedRowKeys([])
    // setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const search = () => {
    console.log(value)
  }
  const dataSource = [
    {
      id: 1,
      name: '广东XXX有限公司',
      region: '广东省 / XX市 / XX区',
      category: '毛衣、衬衫、连衣裙、牛仔裤、工装裤',
      record: '累计成交6 单'
    },
    {
      id: 2,
      name: '广东XXX有限公司',
      region: '广东省 / XX市 / XX区',
      category: '毛衣、衬衫、连衣裙、牛仔裤、工装裤',
      record: '累计成交6 单'
    },
    {
      id: 3,
      name: '广东XXX有限公司',
      region: '广东省 / XX市 / XX区',
      category: '毛衣、衬衫、连衣裙、牛仔裤、工装裤',
      record: '累计成交6 单'
    }
  ]

  const columns: any = [
    {
      key: 'name',
      title: '生产商名称',
      dataIndex: 'name'
    },
    {
      key: 'region',
      title: '所在地区',
      dataIndex: 'region'
    },
    {
      key: 'category',
      title: '主营类别',
      dataIndex: 'category',

      render(item) {
        return <div className={styles.txt}>{item}</div>
      }
    },
    {
      key: 'record',
      title: '发单记录',
      dataIndex: 'record',

      render() {
        return (
          <div>
            累计成交<span className={styles.record}>1</span>单
          </div>
        )
      }
    }
  ]

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelection = {
    // SelectedRowKeyss,
    selectedRowKeys,
    // setSelectedRowKeys([])

    onChange: onSelectChange
  }
  return (
    <div className={styles.invitation}>
      <Button type="primary" onClick={showModal}>
        邀请合作伙伴
      </Button>
      <Modal
        centered={true}
        title="选择合作伙伴"
        visible={isModalVisible}
        width={800}
        onOk={handleOk}
        footer={[
          <Button type="primary" onClick={handleOk}>
            邀请
          </Button>
        ]}
        onCancel={handleCancel}
      >
        <div>
          <Button onClick={search} className={styles.search} type="primary">
            搜索
          </Button>
          <Col className={styles.search} span={8}>
            <Input
              placeholder="可按公司名称进行搜索"
              className={styles.input}
              onChange={e => {
                setValue(e.target.value)
              }}
            />
          </Col>
        </div>
        <div>
          <Table
            rowKey={record => record.id}
            className={styles.searchItem}
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              //分页
              showQuickJumper: false, //是否快速查找
              pageSize: 10, //每页条数
              current: 1, //	当前页数
              total: 50, //数据总数
              position: ['bottomCenter'] //居中
              // onChange: Paginationclick //获取当前页码是一个function
            }}
          />
        </div>
      </Modal>
      <div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>

        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
        <div className={styles.cooperate}>
          <span className={styles.company}>广东XXX服装有限公司</span>
          <span>
            <Icon type="jack-shanchu" className={styles.previous} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default cooperation
