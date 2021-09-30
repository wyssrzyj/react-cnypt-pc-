import { observable, action, makeAutoObservable } from 'mobx'
import axios from '@/utils/axios'
import { ResponseProps } from '@/utils/axios/types'
import { message } from 'antd'

export default class DepartmentStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable name = 'amin'

  @action getDepartmentTree = async params => {
    try {
      const res: ResponseProps = await axios.get(
        `/api/basic/department/department-tree`,
        params
      )
      if (res.fail) {
        message.success('获取失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 查询单个部门信息
  @action getDepartmentDetail = async id => {
    try {
      const res: ResponseProps = await axios.get(`/api/basic/department/get`, {
        id
      })
      if (res.fail) {
        message.success('获取失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // /api/admin/sys-department/manage-department-save
  @action editDepartment = async params => {
    try {
      const res: ResponseProps = await axios.post(
        `/api/basic/department/save`,
        params
      )
      if (res.code !== 200) {
        message.success('操作失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // /api/admin/manage/user/page-user-info
  @action getUsers = async () => {
    try {
      const res: ResponseProps = await axios.post(`/api/basic/staff/list`)
      if (res.code !== 200) {
        message.success('获取失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  // 删除部门
  @action queryDepartment = async deptId => {
    try {
      const res: ResponseProps = await axios.delete(
        `/api/basic/department/delete`,
        { deptId }
      )
      if (res.code !== 200) {
        message.success('获取失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }

  //
  @action delDepartment = async params => {
    try {
      const res: ResponseProps = await axios.delete(
        `/api/admin/sys-department/manage-department-delete`,
        params
      )
      if (res.code !== 200) {
        message.success('获取失败')
      }
      return res.data
    } catch (e) {
      return e
    }
  }
}

export const departmentStore = new DepartmentStore()
