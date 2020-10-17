import React from 'react'
import classNames from 'classnames'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import './Select.scss'

export default ({ creatable, className, ...props }) => {
  const Selector = creatable ? CreatableSelect : Select
  const classes = classNames('select', className)
  const components = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }

  return (
    <Selector
      className={classes}
      classNamePrefix="select"
      components={components}
      isSearchable={true}
      {...props}
    />
  )
}
