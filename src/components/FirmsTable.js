import React, { useState, useEffect } from 'react'

export default function FirmsTable() {
  const [results, setResults] = useState()
  useEffect(() => {}, [])

  function onDragEnd({ destination, source }) {
    if (!destination || destination.index === source.index) return
  }

  return <div></div>
}
