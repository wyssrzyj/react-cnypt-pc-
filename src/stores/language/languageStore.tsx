import { makeAutoObservable } from 'mobx'
import zh from '@/locale/zh'
import en from '@/locale/en'

export default class LanguageStore {
  constructor() {
    makeAutoObservable(this)
  }
  lEnv = 'en'
  localeSource = zh

  setEnv = () => {
    this.lEnv = this.lEnv === 'en' ? 'zh' : 'en'
    this.localeSource = this.lEnv === 'en' ? zh : en
  }
}

export const languageStore = new LanguageStore()
