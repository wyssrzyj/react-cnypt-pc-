import React from 'react'
import Title from '../../controlPanel/components/title'
import { Form, Button } from 'antd'
import styles from './index.module.less'
import Basics from './components/basics'
import Commodity from './components/commodity'
import Terms from './components/terms'
import Address from './components/address'

const DemandSheet = () => {
  const [form] = Form.useForm()
  return (
    <div className={styles.demand}>
      <Form
        form={form}
        onFinish={v => {
          console.log(v)
        }}
      >
        <h1>发布需求单</h1>
        <section>
          <Title title={'基础信息'}></Title>
          <Basics />
        </section>
        <section className={styles.commodity}>
          <Title title={'商品信息'}></Title>
          <Commodity />
          <span className={styles.payment}>
            上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件
          </span>
          <span className={styles.extension}>
            支持扩展名：.rar .zip .doc .docx .pdf .jpg...
          </span>
        </section>
        <section>
          <Title title={'交易条件'}></Title>
          <Terms />
        </section>
        <section>
          <Title title={'地址与联系人'}></Title>
          <Address />
        </section>

        <div className={styles.formConfirm}>
          <Button className={styles.button}>保存草稿</Button>
          <Button
            className={styles.button}
            type={'primary'}
            htmlType={'submit'}
          >
            确认发布
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default DemandSheet
