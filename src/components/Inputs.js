import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/buttons/BigButton'
import './Inputs.scss'

export function InputLine({ grid, children }) {
  console.log(grid)
  const classes = classNames('input-line', { 'input-line--3': grid === '3' })
  return <div className={classes}>{children}</div>
}

export function InputGroup({ title, type, icon, children }) {
  const heading =
    type === 'sub' ? (
      <h4 className="input-line__heading">{title}</h4>
    ) : (
      <h3 className="input-line__heading">{title}</h3>
    )

  return (
    <div className="input-line__container">
      {heading}
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
  return (
    <Button
      className="input-line__submit"
      type="submit"
      disabled={isSubmitting}
    >
      {children}
    </Button>
  )
}
