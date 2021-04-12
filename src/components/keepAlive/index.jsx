import React, { createContext, useState, useEffect, useRef, useContext, useMemo } from "react"

const Context = createContext({})

export const AliveScope = (props) => {
  const [state, setState] = useState({})
  let ref = useMemo(() => {
    return {}
  }, [])

  useEffect(() => {}, [])

  const keep = useMemo(() => {
    return (id, children) =>
      new Promise((resolve) => {
        setState((pre) => ({
          ...pre,
          [id]: { id, children },
        }))
        setTimeout(() => {
          //需要等待setState渲染完拿到实例返回给子组件。
          resolve(ref[id])

          const tableData = []
          const target = tableData.map((item) => {
            let num = tableData.reduce((prev, i) => {
              if (i.guid === item.guid) {
                return prev + 1
              }
              return prev
            }, 0)
            item.num = num

            return item
          })

          target.forEach((item) => {
            target.forEach((i) => {
              if (item.num === i.num && i[3] !== item[3]) {
                item.num = 0
              }
            })
          })
        })
      })
  }, [ref])
  return (
    <Context.Provider value={keep}>
      {props.children && props.children}
      <div>
        {Object.values(state).map(({ id, children }) => {
          return (
            <div
              key={id}
              ref={(node) => {
                ref[id] = node
              }}
            >
              {children && children}
            </div>
          )
        })}
      </div>
    </Context.Provider>
  )
}

const KeepAlive = (props) => {
  const keep = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    ;(async () => {
      const init = async ({ id, children }) => {
        const realContent = await keep(id, children)
        if (ref.current && realContent) {
          ref.current.appendChild(realContent)
        }
      }
      await init(props)
    })()
  }, [props, keep])

  return <div ref={ref} />
}

export default KeepAlive
