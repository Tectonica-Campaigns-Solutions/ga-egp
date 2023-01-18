import * as React from "react";
import { pathToModel } from "../../../utils";
import './index.scss';

const InnerNavigation = ({ location, innerMenu }) => {

  
  const navLinks = innerMenu.navigationItems;
  return (
    <div className="inner-navigation">
      <div className="container">
        <div className="d-flex pt-3 pb-3">
          {
            navLinks.map(item => {
              console.log(item);
              const link = pathToModel(item.mainLink.content.slug, item.mainLink.content.model.apiKey)
              return ( <div className="pe-5">{ item.label }</div> )
            })
          }
        </div>
      </div>

    </div>
  )

    

};

export default InnerNavigation;