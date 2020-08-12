import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import './Select.scss'

export default function HetchieSelect({
  className,
  name,
  options,
  isOptionDisabled,
  placeholder,
  value,
  onChange,
}) {
  const classes = classNames('select', className)
  const components = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }

  return (
    <Select
      className={classes}
      classNamePrefix="select"
      name={name}
      components={components}
      options={options}
      isOptionDisabled={isOptionDisabled}
      isSearchable={true}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
