import { useEffect } from 'react'

export function useClose(ref, setComponent) {
  useEffect(() => {
    const handleClose = event => {
      const body = document.querySelector('body')
      if (
        !body.classList.contains('body--modal-open') &&
        ref.current &&
        !ref.current.contains(event.target)
      )
        setComponent(undefined)
    }

    document.addEventListener('mousedown', handleClose)
    return () => document.removeEventListener('mousedown', handleClose)
  }, [ref, setComponent])
}
