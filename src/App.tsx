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
  // const [loading, setLoading] = useState(false)
  // const popstate = event => {
  //   const { target } = event
  //   const { location } = target

  //   if (location.pathname === '/home') {
  //     location.reload()
  //   }
  //   setLoading(true)
  // }

  // useEffect(() => {
  //   setLoading(true)
  //   window.addEventListener('popstate', popstate, false)

  //   return () => {
  //     window.removeEventListener('popstate', popstate, false)
  //   }
  // }, [])

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
