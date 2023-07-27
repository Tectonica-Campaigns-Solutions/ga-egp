import React from 'react'

function EmbedVideo({block}) {
  return (
    <div className="container">
      <iframe src={`//www.youtube.com/embed/${block.video.providerUid}?rel=0`} frameborder="0" allowfullscreen className="w-100"></iframe>
    </div>
  )
}

export default EmbedVideo