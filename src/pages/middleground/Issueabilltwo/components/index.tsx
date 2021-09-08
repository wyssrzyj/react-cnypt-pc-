import React from 'react'
import Product from './Allorders/Product'
// const lastname = localStorage.getItem('topkey')

const Component = () => {
  // useEffect(() => {
  //   console.log(lastname)
  // }, [lastname])
  // 静态数据
  const Commoditys = [
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '10000',
      StatusDataJudgment: 1
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '20000',
      StatusDataJudgment: 2
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '30000',
      StatusDataJudgment: 3
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '40000',
      StatusDataJudgment: 4
    },
    {
      orderNumber: '1795037941400163361',
      Time: '2021-05-14 16:24:52',
      FactoryName: '杭州创启服装厂',
      img: 'https://img0.baidu.com/it/u=3745474458,891795346&fm=26&fmt=auto&gp=0.jpg',
      name: '女士梭织连衣裙',
      ProcessingType: '经销单，来图加工',
      OrderCategory: '针织服装（薄料）',
      quantity: '100',
      TotalAmount: '50000',
      StatusDataJudgment: 5
    }
  ]

  //  订单号 orderNumber
  //  时间 Time
  //  厂名字 FactoryName
  //  图片 img
  //  商品名称 name
  //  加工类型 ProcessingType
  //  订单类别  OrderCategory
  //  数量 quantity
  //  总金额 TotalAmount
  //  状态数据 StatusDataJudgment

  return (
    <div>
      {Commoditys.map(item => {
        return <Product data={item} />
      })}
    </div>
  )
}
export default Component
