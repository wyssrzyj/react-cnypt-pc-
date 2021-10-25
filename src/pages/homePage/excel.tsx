import React from 'react'
import { Button } from 'antd'
import XLSX from 'xlsx'

const Excel = () => {
  const onImportExcel = file => {
    const { files } = file.target

    // 通过FileReader对象读取文件
    const fileReader = new FileReader()

    fileReader.onload = event => {
      try {
        const { result } = event.target
        // console.log(result, 'result')
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary', codepage: 936 })
        // console.log(workbook, 'workbook')
        // 存储获取到的数据
        let data = []
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            console.log(workbook.Sheets[sheet], 'workbook.Sheets[sheet]')
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            console.log(JSON.stringify(data))
            localStorage.setItem('countyInfo', JSON.stringify(data))
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        // 最终获取到并且格式化后的 json 数据
        // console.log(data)
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log(e, '~~~~~~~')
      }
    }

    // 以二进制方式打开文件

    fileReader.readAsBinaryString(files[0])
  }

  return (
    <div>
      <Button>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={onImportExcel}
        />

        <span>上传文件</span>
      </Button>
    </div>
  )
}

export default Excel
