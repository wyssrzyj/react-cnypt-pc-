import React, { useState, useEffect } from 'react'
import { Icon } from '@/components'
import Title from '../controlPanel/components/title'
import styles from './index.module.less'
import { Form, Col, Row, Table, Button } from 'antd'
import FormNode from '@/components/FormNode'
import { useHistory } from 'react-router'

const FormItem = Form.Item

const keys = [
  'type',
  'options',
  'keys',
  'maxImgs',
  'maxSize',
  'tips',
  'placeholder',
  'disabled',
  'max',
  'min'
]

const ProductPage = props => {
  return <div className={styles.orderPage}>ProductPage</div>
}

export default ProductPage
