import React from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'
import { useHistory } from 'react-router-dom'
import { Table, Carousel } from 'antd'
function index({ NumberCooperation, newData, topName }) {
  const { push } = useHistory()
  const columns: any = [
    {
      dataIndex: 'name1',
      align: 'center',
      key: 'name1',
      render: _text => (
        <>
          <div className={styles.outerCircle}>
            <div className={styles.circle}></div>
          </div>
        </>
      )
    },
    {
      title: '发布日期',
      dataIndex: 'year',
      align: 'center',
      key: 'name',
      render: (_text, _v) => (
        <>
          <div className={styles.timeFont}>{_v.monthDay}</div>
          <div className={styles.timeColor}>{_v.year}</div>
        </>
      )
    },
    {
      title: '订单信息',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
      render: (_text, _v) => (
        <>
          <div className={styles.commoditysTable}>
            <div className={styles.commoditys}>
              <div className={styles.yuan}></div>
              <div className={styles.commodityData}>{_v.name}</div>
            </div>
            <div className={styles.commodity}>
              <div className={styles.yuan}></div>
              <div className={styles.commodityData}>
                商品品类: <span>{_v.categoryCodes.join('、')}</span>
              </div>
            </div>
            <div className={styles.commodity}>
              <div className={styles.yuan}></div>
              <div className={styles.commodityData}>
                订单数量: <span>{_v.goodsNum}</span>
              </div>
            </div>
            <div className={styles.commodity}>
              <div className={styles.yuan}></div>
              <div className={styles.commodityData}>
                地区要求: <span>{_v.regionalIdList.join('、')}</span>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: '截止时间',
      dataIndex: 'address',
      align: 'center',
      key: 'address',
      render: (_text, _v) => (
        <>
          <div>
            <div>
              <span>{_v.surplus}</span> 天
            </div>
            <div>剩余时间</div>
          </div>
        </>
      )
    },
    {
      title: '反馈数量',
      align: 'center',
      key: 'tags',
      dataIndex: 'tags',
      render: (_text, _v) => (
        <>
          <div>
            <div>
              <span>
                {_v.enterprisePendingNum ? _v.enterprisePendingNum : '0'}&nbsp;
              </span>
              　家
            </div>
            <div>已反馈工厂</div>
          </div>
        </>
      )
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (_text, _record) => (
        <span
          className={styles.color}
          onClick={() => {
            DemandOrderDetail(_record.id)
          }}
        >
          查看详情
        </span>
      )
    }
  ]
  // 查看订单信息
  const DemandOrderDetail = e => {
    push({ pathname: '/control-panel/orderDetails', state: { id: e } })
  }
  return (
    <div>
      <div className={styles.carousel}>
        <Carousel autoplay={true}>
          {topName.publicityImagesList !== undefined
            ? topName.publicityImagesList.map(item => (
                <div key={item.thumbUrl}>
                  <img className={styles.img} src={item.thumbUrl} alt="" />
                </div>
              ))
            : null}
        </Carousel>
      </div>

      <br />

      <div className={styles.cooperation}>
        <div className={styles.content}>
          <div>
            <Icon type="jack-yhzcs" className={styles.previous} />
          </div>
          <div className={styles.bottom}>
            <div>
              <span className={styles.tex}>
                {NumberCooperation.cooperationNum}
              </span>
              次
            </div>
            <div>已合作数</div>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <Icon type="jack-yqrsps" className={styles.previous} />
          </div>
          <div className={styles.bottom}>
            <div>
              <span className={styles.tex}>
                {NumberCooperation.confirmCategoryNum}
              </span>
              件
            </div>
            <div>已确认商品数量</div>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <Icon type="jack-ljfbdds" className={styles.previous} />
          </div>
          <div className={styles.bottom}>
            <div>
              <span className={styles.tex}>
                {NumberCooperation.cumulativeReleaseOrderNum}
              </span>
              单
            </div>
            <div>累计发布订单数</div>
          </div>
        </div>
      </div>
      <br />
      {/* 数据 */}
      <div className={styles.data}>
        <div className={styles.dataTop}>
          <div className={styles.title}>
            最新订单&nbsp;&nbsp;
            <span className={styles.test}>
              (生效中订单
              <span className={styles.color}>
                {NumberCooperation.inEffectNum}
              </span>
              )
            </span>
          </div>
          <Table
            columns={columns}
            dataSource={newData}
            pagination={{
              //分页
              showQuickJumper: false, //是否快速查找
              // pageSize: 10, //每页条数
              // current: 1, //	当前页数
              // total: 20, //数据总数
              position: ['bottomCenter'] //居中
            }}
            // onChange={tableChange} //获取当前页码是一个function
          />
        </div>
      </div>
    </div>
  )
}

export default index
