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

export function InputGroup({ className, title, type = 3, icon, children }) {
  const classes = classNames(className, 'input-line__group')
  const heading =
    type === 3 ? (
      <h3 className="input-line__heading">{title}</h3>
    ) : (
      <h4 className="input-line__heading">{title}</h4>
    )

  return (
    <div className="input-line__container">
      {heading}
      <div className={classes}>
        <FontAwesomeIcon className="input-line__icon" icon={icon} />
        {children}
      </div>
    </div>
  )
}

export function Input({ className, field, form, ...rest }) {
  const classes = classNames(className, 'input-line__input')
  return <input className={classes} {...field} {...rest} />
}

export function Submit({ className, isSubmitting, children }) {
  const classes = classNames(className, 'input-line__submit')
  return (
    <Button className={classes} type="submit" disabled={isSubmitting}>
      {children}
    </Button>
  )
}
