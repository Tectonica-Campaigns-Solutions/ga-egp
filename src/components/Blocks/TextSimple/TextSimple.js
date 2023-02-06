import React from 'react'

function TextSimple({ block }) {
  return (
    <div className="container">
      <div className="textSimple" dangerouslySetInnerHTML={{ __html: block.text }} />
    </div>
  )
}

export default TextSimple