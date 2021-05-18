import React, {useState, useEffect} from 'react'
import { Tabs, Select, Tag, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import {isEmpty} from 'lodash'
import styles from './index.module.less'

const { TabPane } = Tabs;
const { Option } = Select;

const dressTypes = [{
	type: '男装',
	key: 'man'
},{
	type: '女装',
	key: 'woman'
},{
	type: '童装',
	key: 'kids'
},{
	type: '服饰',
	key: 'dress'
}];

const productCategory = ["全部", "裤子", "半身裙", "套装/学生校服/工作制服", "大码女装", "毛衣", "蕾丝衫", "其他男装"];
const areaCategory = ["全部", "广州市", "深圳市", "东莞市", "北京市", "上海市", "杭州市", "宁波市"]
const orderAmount = ["全部", '1-500件', '501-1000件', '1001-2000件', '2001-5000件', '5001-10000件', '10000件以上'];
const processingType = ["全部", '清加工单', '经销单']

const FliterList = () => {
	const [activeProduct, setActiveProduct] = useState("全部")
	const [activeArea, setActiveArea] = useState("全部")
	const [activeOrder, setActiveOrder] = useState("全部")
	const [activeProcessing, setActiveProcessing] = useState("全部")
	const [activeTabs, setActiveTabs] = useState([])

	const emptyFn = () => {
		setActiveTabs([])
	}

	useEffect(() => {
		const newActiveTabs = [activeProduct, activeArea, activeOrder,activeProcessing].filter(item=>item!=="全部");
		setActiveTabs([...newActiveTabs])
		
	}, [activeProduct,activeArea,activeOrder,activeProcessing])
	return (
		<div className={styles.filterList}>
			<Tabs defaultActiveKey="man" type="card">
				{dressTypes.map(dressType=><TabPane tab={dressType.type} key={dressType.key}>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>产品类别</div>
						<div className={styles.classificationItem}>
							{productCategory.map((item,index)=><span 
								key={index}
								className={classNames(styles.classificationSpan, item===activeProduct ? styles.active: null)}
								onClick={()=>setActiveProduct(item)}
							>
								{item}
							</span>)}
						</div>
					</div>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>地区分类</div>
						<div className={styles.classificationItem}>
							{areaCategory.map((item,index)=><span
								key={index}
								className={classNames(styles.classificationSpan, item===activeArea ? styles.active: null)}
								onClick={()=>setActiveArea(item)}
							>
								{item}
							</span>)}
						</div>
					</div>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>订单数量</div>
						<div className={styles.classificationItem}>
							{orderAmount.map((item,index)=><span 
								key={index}
								className={classNames(styles.classificationSpan, item===activeOrder ? styles.active: null)}
								onClick={()=>setActiveOrder(item)}
							>
								{item}
							</span>)}
						</div>
					</div>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>加工类型</div>
						<div className={styles.classificationItem}>
							{processingType.map((item,index)=><span 
								key={index}
								className={classNames(styles.classificationSpan, item===activeProcessing ? styles.active: null)}
								onClick={()=>setActiveProcessing(item)}
							>
								{item}
							</span>)}
						</div>
					</div>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>更多选项</div>
						<div className={styles.classificationItem}>
							<Select defaultValue="lucy" className={styles.moreSelect}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">销售市场</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
							<Select defaultValue="lucy" className={styles.moreSelect}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">工厂类型</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
							<Select defaultValue="lucy" className={styles.moreSelect}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">工厂规模</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
							<Select defaultValue="lucy" className={styles.moreSelect}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">更新时间</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
						</div>
					</div>
					<div className={styles.classification}>
						<div className={styles.classificationLabel}>已选条件</div>
						<div className={styles.classificationItem}>
							{activeTabs.map((item,index)=><Tag 
								color="orange" 
								className={styles.activeTab}
								closable
								key={index}
							>
								{item}
							</Tag>)}
							{!isEmpty(activeTabs) && <Button icon={<DeleteOutlined />} onClick={emptyFn}>清空</Button>}
						
						</div>
					</div>
				</TabPane>)}
			</Tabs>
				
		</div>
	)
}
export default FliterList