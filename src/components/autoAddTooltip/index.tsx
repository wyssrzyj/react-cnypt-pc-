import React, { useEffect, useState, useRef } from 'react'
import { Tooltip } from 'antd'

const AutoAddTooltip = props => {
  const { contentFunc, tooltipProps } = props
  const [isAddTooltip, setIsAddTooltip] = useState(false)
  const contentRef = useRef(null)
  useEffect(() => {
    if (contentRef.current) {
      const wrapperDom = contentRef.current
      setIsAddTooltip(wrapperDom.scrollWidth > wrapperDom.clientWidth || wrapperDom.scrollHeight > wrapperDom.clientHeight)
    }
  }, [])
  const content = contentFunc(contentRef)
  return isAddTooltip ? <Tooltip {...tooltipProps}>{content}</Tooltip> : content
}

const autoAddTooltip = (contentFunc, tooltipProps) => {
  return <AutoAddTooltip contentFunc={contentFunc} tooltipProps={tooltipProps} />
}
export default autoAddTooltip
