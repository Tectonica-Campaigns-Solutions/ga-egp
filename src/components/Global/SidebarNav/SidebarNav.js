import React from 'react'
import Link from '../Link'

function SidebarNav({ menu, location }) {
  return (
    <div className="sidebarNav">
      {
        menu.map(item => <div><Link to={item.node.slug}>{ item.node.title }</Link></div>)
      }
    </div>
  )
}

export default SidebarNav