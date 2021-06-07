import React from 'react'
import RouteList from './route'
import { BrowserRouter as Router } from 'react-router-dom'
import { stores } from './stores'
import { Provider } from 'mobx-react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
// import { useStores } from '@/utils/mobx'
import 'nprogress/nprogress.css'
import { AliveScope } from './components/keepAlive'
import './css/reset.css'
import Layout from './layout'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <AliveScope>
      <ConfigProvider locale={zhCN}>
        <Provider {...stores}>
          <Router>
            <Layout>
              <RouteList />
            </Layout>
          </Router>
        </Provider>
      </ConfigProvider>
    </AliveScope>
  )
}

export default App
