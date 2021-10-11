import React from 'react'
import { Checkbox, Divider } from 'antd'

const CheckboxGroup = Checkbox.Group
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']
function index() {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = React.useState(true)
  const [checkAll, setCheckAll] = React.useState(false)

  const onChange = list => {
    console.log(list) //单选选择的

    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = e => {
    console.log(e.target.checked)

    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
  return (
    <div>
      <>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
        <Divider />

        <CheckboxGroup
          options={plainOptions}
          value={checkedList} //初始值
          onChange={onChange}
        />
      </>
    </div>
  )
}

export default index
