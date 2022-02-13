import {
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import './Notification.scss'

export default function Notification({
  className,
  type,
  setNotification,
  children,
}) {
  const notification = useRef()
  useEffect(() => {
    if (notification.current !== null && type !== 'hidden') {
      setTimeout(() => {
        notification.current.classList.remove('notification--hidden')
        setTimeout(() => {
          if (notification.current !== null && type !== 'hidden') {
            notification.current.classList.add('notification--hidden')
            setTimeout(() => setNotification({ type: 'hidden', text: '' }), 200)
          }
        }, 2500)
      }, 0)
    }
  }, [type, setNotification])

  let classes, icon
  if (type === 'success') {
    classes = classNames(
      className,
      'notification',
      'notification--success',
      'notification--hidden'
    )
    icon = faCheckCircle
  } else if (type === 'failure') {
    classes = classNames(
      className,
      'notification',
      'notification--failure',
      'notification--hidden'
    )
    icon = faExclamationCircle
  }

  return (
    type !== 'hidden' && (
      <div className={classes} ref={notification}>
        <FontAwesomeIcon className="notification__icon" icon={icon} />
        <span className="notification__text">{children}</span>
      </div>
    )
  )
}
