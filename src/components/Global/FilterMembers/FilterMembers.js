import React from 'react'
import Link from '../Link'

function FilterMembers({ members, introduction }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4">

          <div
            dangerouslySetInnerHTML={{__html: introduction}}
          />
          {
            members.map(item => {
              return (
                <div>
                  <Link to={item.node.slug}>{item.node.title}</Link>
                </div>  
              )
            })
          }
        </div>
        <div className="col-lg-8">
          Map goes here
        </div>
      </div>

      
    </div>
  )
}

export default FilterMembers