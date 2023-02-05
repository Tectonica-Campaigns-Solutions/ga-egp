import React from 'react'

function TextSimple({ block }) {
  return (
    <div className="textSimple" dangerouslySetInnerHTML={{ __html: block.text }} />
  )
}

export default TextSimple