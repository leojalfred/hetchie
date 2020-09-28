import { useEffect } from 'react'

export function useClose(ref, active, setComponent) {
  useEffect(() => {
    const handleClose = ({ target }) => {
      const body = document.querySelector('body')
      if (
        !body.classList.contains('body--modal-open') &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        if (!target.classList.contains(active) && target.tagName !== 'path') {
          const button = document.querySelector(`.${active}`)
          if (button) button.classList.remove(active)
        }

        setComponent(undefined)
      }
    }

    document.addEventListener('mousedown', handleClose)
    return () => document.removeEventListener('mousedown', handleClose)
  }, [ref, active, setComponent])
}
