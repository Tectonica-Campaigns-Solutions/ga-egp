import React from 'react'
import CardPosition from '../../Global/CardPosition/CardPosition'

function HighlightedPositions({block}) {
  console.log(block)
  return (
    <div className="highlighted-positions">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <h3>{block.pretitle}</h3>
            <h2>{block.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: block.description }} />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {
                block.positions && block.positions.map(item => 
                  <div className="col-lg-2">
                    <CardPosition position={item}/>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightedPositions