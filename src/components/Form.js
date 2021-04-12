import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Notification from 'components/Notification'
import Button from 'components/buttons/BigButton'
import './Form.scss'

export function TopLine({ heading, notification, setNotification }) {
  return (
    <div className="topline">
      <h2 className="topline__heading">{heading}</h2>
      <Notification
        className="topline__notification"
        type={notification.type}
        setNotification={setNotification}
      >
        {notification.text}
      </Notification>
    </div>
  )
}

export function InputLine({ grid, key, children }) {
  return (
    <div className="input-line" key={key}>
      {children}
    </div>
  )
}

export function InputGroup({ title, icon, children }) {
  return (
    <div className="input-group__container">
      {title && <h3 className="input-group__heading">{title}</h3>}
      <div className="input-group">
        <FontAwesomeIcon className="input-group__icon" icon={icon} />
        {children}
      </div>
    </div>
  )
}

export function Input({ className, field, form, ...rest }) {
  return <input className="input" {...field} {...rest} />
}

export function Submit({ className, isSubmitting, children }) {
  const classes = classNames('submit', className)
  return (
    <Button className={classes} type="submit" disabled={isSubmitting}>
      {children}
    </Button>
  )
}
