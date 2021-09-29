import React, { Suspense } from 'react'
import RouteList from './route'
import { BrowserRouter as Router } from 'react-router-dom'
import { stores } from './stores'
import { Provider } from 'mobx-react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'nprogress/nprogress.css'
import { AliveScope } from './components/keepAlive'
import './css/reset.css'
import Layout from './layout'
// import 'antd/dist/antd.min.css'
import { Loading } from './pages/home/renderHome'

const App = () => {
  return (
    <AliveScope>
      <ConfigProvider locale={zhCN}>
        <Provider {...stores}>
          <Suspense fallback={<Loading></Loading>}>
            <Router>
              <Layout>
                <RouteList />
              </Layout>
            </Router>
          </Suspense>
        </Provider>
      </ConfigProvider>
    </AliveScope>
  )
}

export default App
