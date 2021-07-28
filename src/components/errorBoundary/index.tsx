import React from 'react'

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(_error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }
  componentDidCatch(_error, _errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo)
  }
  render() {
    const { hasError } = this.state
    if (hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
