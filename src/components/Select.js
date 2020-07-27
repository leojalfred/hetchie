import React from 'react'
import Select from 'react-select'
import './Select.scss'

export default function HetchieSelect({
  name,
  options,
  isOptionDisabled,
  placeholder,
  value,
  onChange,
}) {
  const components = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }

  return (
    <Select
      className="select"
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
