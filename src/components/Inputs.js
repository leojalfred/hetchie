import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/buttons/BigButton'
import './Inputs.scss'

export function InputLine({ className, children, ...props }) {
  const classes = classNames(className, 'input-line')
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function InputContainer({ className, children }) {
  const classes = classNames(className, 'input-container')
  return <div className={classes}>{children}</div>
}

export function InputGroup({ className, children }) {
  const classes = classNames(className, 'input-group')
  return <div className={classes}>{children}</div>
}

export function InputIcon({ className, icon }) {
  const classes = classNames(className, 'input-icon')
  return <FontAwesomeIcon className={classes} icon={icon} />
}

export function Input({ className, field, form, ...rest }) {
  const classes = classNames(className, 'input')
  return <input className={classes} {...field} {...rest} />
}

export function Submit({ className, isSubmitting, children }) {
  const classes = classNames(className, 'submit')
  return (
    <Button className={classes} type="submit" disabled={isSubmitting}>
      {children}
    </Button>
  )
}
