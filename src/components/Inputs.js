import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/buttons/BigButton'
import './Inputs.scss'

export function InputLine({ grid, key, children }) {
  const classes = classNames('input-line', { 'input-line--3': grid === '3' })
  return (
    <div className={classes} key={key}>
      {children}
    </div>
  )
}

export function InputGroup({ title, icon, children }) {
  return (
    <div className="input-line__container">
      {title && <h3 className="input-line__heading">{title}</h3>}
      <div className="input-line__group">
        <FontAwesomeIcon className="input-line__icon" icon={icon} />
        {children}
      </div>
    </div>
  )
}

export function Input({ className, field, form, ...rest }) {
  return <input className="input-line__input" {...field} {...rest} />
}

export function Submit({ className, isSubmitting, children }) {
  const classes = classNames('input-line__submit', className)
  return (
    <Button className={classes} type="submit" disabled={isSubmitting}>
      {children}
    </Button>
  )
}
