import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import styles from './todo.module.less'
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table
} from 'antd'
// const [form] = Form.useForm()
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
// Table标题
const columns = [
  {
    title: '序号',
    width: 80,

    render(c, r, i) {
      console.log('序号测试', c, r)
      return <>{i + 1}</>
    }
  },

  {
    title: '商品名称',
    dataIndex: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: '商品分类',
    dataIndex: 'ification',
    ellipsis: true
  },
  {
    title: '图片',
    dataIndex: 'picture',
    render(c, Rdata) {
      console.log('测试图片', c)
      return (
        <img className={styles.picture} src={Rdata.picture} alt={Rdata.name} />
      )
    }
  },
  {
    title: 'SPU编号',
    dataIndex: 'SUPnumber'
  },
  {
    title: '数量（件）',
    dataIndex: 'quantity'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render(c, rData) {
      console.log('测试', c, rData)

      return (
        <Space>
          <Button>修改</Button>
          <Button>删除</Button>
        </Space>
      )
    }
  }
]
// Table数据
const data = [
  {
    name: '喜羊羊',
    ification: '羊',
    picture:
      'https://img1.baidu.com/it/u=1398685741,3671763322&fm=26&fmt=auto&gp=0.jpg',
    SUPnumber: Math.random() * 9999,
    quantity: 10086
  },
  {
    name: '灰太狼',
    ification: '狼',
    picture:
      'https://img0.baidu.com/it/u=300375145,2860346276&fm=26&fmt=auto&gp=0.jpg',
    SUPnumber: Math.random() * 9999,
    quantity: 123
  },
  {
    name: ' 鸣人',
    ification: '人',
    picture:
      'https://img0.baidu.com/it/u=2505561597,643891560&fm=26&fmt=auto&gp=0.jpg',
    SUPnumber: Math.random() * 9999,
    quantity: 8848
  }
]

const NewlyAdded = () => {
  return (
    <div className={styles.layer}>
      <div className={styles.top}>
        <span onClick={() => {}} className={styles.LeftOutlined}>
          <LeftOutlined />
        </span>
        <span>新增订单</span>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* 订单信息 */}
        <div className={styles.Orderexternal}>
          <div className={styles.information}></div>
          <span>订单信息</span>
          <Divider style={{ margin: 0 }} />
          {/* <Form.Item label="Input">
          <Input />
            </Form.Item>
            <Form.Item label="下拉">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="期望收货时间">
              <DatePicker />
            </Form.Item> */}
          {/* 订单信息 */}
          <div className={styles.ContentBox}>
            <Form.Item
              className={styles.OrderNmae}
              wrapperCol={{ span: 6 }}
              label="订单名称"
              name="订单名称"
              rules={[{ required: true, message: '请输入订单名称!' }]}
            >
              <Input
                className={styles.OrderNmaeinput}
                placeholder="请输入订单名称"
              />
            </Form.Item>

            <Form.Item
              className={styles.payment}
              label="付款方式"
              name="付款方式"
              rules={[{ required: true, message: '请输入付款方式!' }]}
            >
              <Select className={styles.input} placeholder="请选择付款方式">
                <Select.Option value="卢英杰">卢英杰</Select.Option>
                <Select.Option value="刘心睿">刘心睿</Select.Option>
                <Select.Option value="王若兰">王若兰</Select.Option>
                <Select.Option value="杨紫薇">杨紫薇</Select.Option>
                <Select.Option value="郭伟雅">郭伟雅</Select.Option>
                <Select.Option value="王梦梦">王梦梦</Select.Option>
                <Select.Option value="黄佳宜">黄佳宜</Select.Option>
                <Select.Option value="黄佳珏">黄佳珏</Select.Option>
                <Select.Option value="崔一一">崔一一</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 6 }}
              label="交货方式"
              name="交货方式"
              rules={[{ required: true, message: '请输入交货方式!' }]}
            >
              <Select
                className={styles.OrderNmaeinput}
                placeholder="请选择交货方式"
              >
                <Select.Option value="卢英杰">卢英杰</Select.Option>
                <Select.Option value="刘心睿">刘心睿</Select.Option>
                <Select.Option value="王若兰">王若兰</Select.Option>
                <Select.Option value="杨紫薇">杨紫薇</Select.Option>
                <Select.Option value="郭伟雅">郭伟雅</Select.Option>
                <Select.Option value="王梦梦">王梦梦</Select.Option>
                <Select.Option value="黄佳宜">黄佳宜</Select.Option>
                <Select.Option value="黄佳珏">黄佳珏</Select.Option>
                <Select.Option value="崔一一">崔一一</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.address}
              wrapperCol={{ span: 6 }}
              label="收货地址"
              name="收货地址"
            >
              <Input
                className={styles.inputaddress}
                placeholder="请输入收货地址"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 6 }}
              label="增值税发票"
              name="增值税发票"
              rules={[{ required: true }]}
            >
              <Checkbox>有</Checkbox>
              <Checkbox>否</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 6 }}
              label="销售市场"
              name="销售市场"
              rules={[{ required: true, message: '请选择销售市场!' }]}
            >
              <Select className={styles.market} placeholder="请选择销售市场">
                <Select.Option value="卢英杰">卢英杰</Select.Option>
                <Select.Option value="刘心睿">刘心睿</Select.Option>
                <Select.Option value="王若兰">王若兰</Select.Option>
                <Select.Option value="杨紫薇">杨紫薇</Select.Option>
                <Select.Option value="郭伟雅">郭伟雅</Select.Option>
                <Select.Option value="王梦梦">王梦梦</Select.Option>
                <Select.Option value="黄佳宜">黄佳宜</Select.Option>
                <Select.Option value="黄佳珏">黄佳珏</Select.Option>
                <Select.Option value="崔一一">崔一一</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              className={styles.Processing}
              wrapperCol={{ span: 6 }}
              label="加工类型"
              name="加工类型"
              rules={[{ required: true, message: '请选择加工类型!' }]}
            >
              <Select
                className={styles.inputProcessing}
                placeholder="请选择加工类型"
              >
                <Select.Option value="卢英杰">卢英杰</Select.Option>
                <Select.Option value="刘心睿">刘心睿</Select.Option>
                <Select.Option value="王若兰">王若兰</Select.Option>
                <Select.Option value="杨紫薇">杨紫薇</Select.Option>
                <Select.Option value="郭伟雅">郭伟雅</Select.Option>
                <Select.Option value="王梦梦">王梦梦</Select.Option>
                <Select.Option value="黄佳宜">黄佳宜</Select.Option>
                <Select.Option value="黄佳珏">黄佳珏</Select.Option>
                <Select.Option value="崔一一">崔一一</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.receiving}
              wrapperCol={{ span: 6 }}
              label="期望收货时间"
              name="期望收货时间"
              rules={[{ required: true, message: '请选择期望收货时间!' }]}
            >
              <DatePicker className={styles.inputreceiving} />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 6 }}
              label="物料到货时间"
              name="物料到货时间"
            >
              <DatePicker className={styles.Material} />
            </Form.Item>
          </div>
        </div>

        {/* 商品信息 */}
        <div className={styles.Orderexternal}>
          <div className={styles.information}></div>
          <span>商品信息</span>
          <Divider style={{ margin: 0 }} />
          <div className={styles.ContentBox}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
            ></Table>
            <div className={styles.Total}>
              <span className={styles.price}>
                合计总计 :<span>10086</span>
              </span>
            </div>
          </div>
        </div>
        {/* 联系方式 */}
        <div className={styles.Orderexternal}>
          <div className={styles.information}></div>
          <span>订单信息</span>
          <Divider style={{ margin: 0 }} />
          {/* <Form.Item label="Input">
          <Input />
            </Form.Item>
            <Form.Item label="下拉">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="期望收货时间">
              <DatePicker />
            </Form.Item> */}
          {/* 订单信息 */}
          <div className={styles.Orderexternal}>
            <div className={styles.information}></div>
            <span>订单信息</span>
            <Divider style={{ margin: 0 }} />
            {/* <Form.Item label="Input">
          <Input />
            </Form.Item>
            <Form.Item label="下拉">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="期望收货时间">
              <DatePicker />
            </Form.Item> */}
            {/* 订单信息 */}
            <div className={styles.ContentBox}>
              <Form.Item
                className={styles.OrderNmae}
                wrapperCol={{ span: 6 }}
                label="加工厂名称"
                name="加工厂名称"
                rules={[{ required: true, message: '请输入订单名称!' }]}
              >
                <Select
                  className={styles.OrderNmaeinput}
                  placeholder="请选择交货方式"
                >
                  <Select.Option value="卢英杰">卢英杰</Select.Option>
                  <Select.Option value="刘心睿">刘心睿</Select.Option>
                  <Select.Option value="王若兰">王若兰</Select.Option>
                  <Select.Option value="杨紫薇">杨紫薇</Select.Option>
                  <Select.Option value="郭伟雅">郭伟雅</Select.Option>
                  <Select.Option value="王梦梦">王梦梦</Select.Option>
                  <Select.Option value="黄佳宜">黄佳宜</Select.Option>
                  <Select.Option value="黄佳珏">黄佳珏</Select.Option>
                  <Select.Option value="崔一一">崔一一</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 6 }}
                label="订单创建人"
                name="订单创建人"
                rules={[{ required: true, message: '请输入订单创建人' }]}
              >
                <Input
                  className={styles.OrderNmaeinput}
                  placeholder="订单创建人"
                />
              </Form.Item>
              <Form.Item
                className={styles.Docking}
                wrapperCol={{ span: 6 }}
                label="加工厂对接人"
                name="加工厂对接人"
              >
                <Input
                  className={styles.inputaddress}
                  placeholder="请输入收货地址"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 6 }}
                label="创建人手机号"
                name="创建人手机号"
                rules={[{ required: true, message: '请输入创建人手机号' }]}
              >
                <Input className={styles.phone} placeholder="创建人手机号" />
              </Form.Item>
              <Form.Item
                className={styles.mobile}
                wrapperCol={{ span: 6 }}
                label="对接人手机号"
                name="对接人手机号"
              >
                <Input
                  className={styles.inputaddress}
                  placeholder="对接人手机号"
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default NewlyAdded
