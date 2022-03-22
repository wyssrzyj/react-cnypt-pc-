import React from 'react'

function index() {
  let list = [
    {
      name: '卢英杰',
      date: '2008',
      id: 197445,
      readings: 999,
      title: '标题'
    }
  ]
  const handleDownload = () => {
    import('./lib/Export2Excel').then(excel => {
      const tHeader = ['身份', '标题', '名字', '价格', '时间'] //标题名称
      const filterVal = ['id', 'title', 'name', 'readings', 'date']
      //   const list = type === "all" ? this.state.list : this.state.selectedRows;
      const data = formatJson(filterVal, list)
      console.log(data)

      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: 'excel-file', //excel-file
        autoWidth: true, //是否自适应 true
        bookType: 'xlsx' //类型 xlsx  csv txt
      })
    })
    console.log(123456)
  }

  //一个方法
  const formatJson = (filterVal, jsonData) => {
    // 只展示 需要的字段 相同的数据
    return jsonData.map(v => filterVal.map(j => v[j]))
  }
  return (
    <div>
      <button onClick={handleDownload}>全部导出</button>
    </div>
  )
}

export default index
