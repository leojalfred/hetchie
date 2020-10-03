import React from 'react'
import classNames from 'classnames'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import './Select.scss'

export default function HetchieSelect({
  creatable,
  className,
  onCreateOption,
  name,
  options,
  isMulti,
  isOptionDisabled,
  placeholder,
  value,
  onChange,
}) {
  const Selector = creatable ? CreatableSelect : Select
  const classes = classNames('select', className)
  const components = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }

  const creatableProps = creatable ? { creatable, onCreateOption } : {}

  return (
    <Selector
      className={classes}
      classNamePrefix="select"
      name={name}
      components={components}
      options={options}
      isMulti={isMulti}
      isOptionDisabled={isOptionDisabled}
      isSearchable={true}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...creatableProps}
    />
  )
}
