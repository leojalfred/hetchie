import { useEffect } from 'react'

export function useClose(ref, active, setActive) {
  useEffect(() => {
    const handleClose = ({ target }) => {
      const body = document.querySelector('body')
      if (
        !body.classList.contains('body--modal-open') &&
        ref.current &&
        !ref.current.contains(target)
      ) {
        const blocked = ['path', 'svg']
        if (
          !target.classList.contains(active) &&
          !blocked.includes(target.tagName)
        ) {
          const button = document.querySelector(`.${active}`)
          if (button) button.classList.remove(active)

          setActive(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClose)
    return () => document.removeEventListener('mousedown', handleClose)
  }, [ref, active, setActive])
}
