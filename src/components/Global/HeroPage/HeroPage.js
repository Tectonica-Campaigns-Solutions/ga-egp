import React from 'react'
import Breadcrumb from 'gatsby-plugin-breadcrumb/components/Breadcrumb';
import "./index.scss";

function HeroPage({title, context=null, location=null}) {
  
    const {
      breadcrumb: { crumbs },
    } = context
  
    const customCrumbLabel = location.pathname.toLowerCase().replace('-', ' ')
  
  return (
    <div className="hero-page">
      <div className="container">
        {
          context && 
            <div className="breadcrumb">
              <Breadcrumb
                crumbs={crumbs}
                crumbSeparator=" - "
                crumbLabel={customCrumbLabel}
              />
            </div>
        }
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default HeroPage