import { useState, useEffect } from "react"

const useSome = () => {
  const [num, setNum] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setNum(99)
    }, 3000)
  }, [])

  return [num]
}

export default useSome
