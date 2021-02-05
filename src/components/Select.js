import React from 'react'
import classNames from 'classnames'
import CreatableSelect from 'react-select/creatable'
import ReactSelect from 'react-select'
import './Select.scss'

export default function Select({ creatable, className, form, ...props }) {
  const Selector = creatable ? CreatableSelect : ReactSelect
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
