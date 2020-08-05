import React from 'react'
import './FirmRow.scss'

export default function FirmRow({ innerRef, draggableProps, dragHandleProps }) {
  return (
    <tr ref={innerRef} {...draggableProps} {...dragHandleProps}>
      dick
    </tr>
  )
}
