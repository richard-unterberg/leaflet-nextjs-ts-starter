import { useEffect, useState } from 'react'

const useLeafletWindow = () => {
  const [leafletWindow, setLeafletWindow] = useState(typeof window === 'undefined' ? undefined : window.L)

  // todo: check if we can replace/set this within MapContext
  // check produced window object every 100ms -> set as soon it's defined
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.L) {
        setLeafletWindow(window.L)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return leafletWindow
}

export default useLeafletWindow
