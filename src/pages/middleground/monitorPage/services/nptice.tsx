import axios from '@/utils/axios'

/**
 *  获取数据列表
 * @returns
 */
export const listDataAPI = () =>
  axios.post('/api/factory/factory-camera/list-camera-org-info')

/**
 *  获取设备品牌
 * @param param0
 * @returns
 */
export const insertModelAPI = ([]) =>
  axios.post('/api/admin/manage/dict-item/list/dict-code', [])

/**
 * 获取设备部门
 * @returns
 */
export const equipmentDepartmentAPI = () =>
  axios.get('/api/basic/department/department-tree')

/**
 * 删除事件
 * @param id
 * @returns
 */
export const moveAPI = id =>
  axios.delete('/api/factory/factory-camera/delete', { id })

/**
 *  新增数据
 * @param data
 * @returns
 */
export const newlyAddedAPI = data =>
  axios.post('/api/factory/factory-camera/save', data)
