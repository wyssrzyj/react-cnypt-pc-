import React from 'react'

const NoData = props => {
  const {
    bgColor = '#fff',
    height = 560,
    width = 560,
    logoWidth = 200,
    float = 'inherit'
  } = props
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float,
        background: bgColor
      }}
    >
      <img
        style={{ width: logoWidth }}
        src={require('@/static/images/noData.png')}
        alt=""
      />
    </div>
  )
}
export default NoData
