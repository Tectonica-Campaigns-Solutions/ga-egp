import React from 'react'

function BlockDonation({block}) {
  return (
    <div className="">
      <div className="container">
          <h2>{block.title}</h2>
          {
            block.cta && block.cta.length > 0 && 
              block.cta.map(item => (
                <div>CTA</div>
              )
            )
          }
      </div>
    </div>
  )
}

export default BlockDonation