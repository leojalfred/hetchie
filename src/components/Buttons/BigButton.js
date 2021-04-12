import classNames from 'classnames'
import Button from './Button'
import './BigButton.scss'

function BigButtonLink({ className, link = false, to, children, ...props }) {
  const classes = classNames(className, 'button--big')
  return (
    <Button className={classes} link={link} to={to} {...props}>
      {children}
    </Button>
  )
}

export default BigButtonLink
