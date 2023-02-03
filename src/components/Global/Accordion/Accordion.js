import React, { useState } from 'react';
import accordionOpen from '../../Icons/accordion_open.svg';
import accordionClose from '../../Icons/accordion_close.svg';

import './index.scss';

function Accordion({ items, renderChild, renderCustomTitle = null, defaultActive = 0 }) {
  const [activeItem, setActiveItem] = useState(defaultActive);

  const handleOnChangeAccordion = (newIndex) => setActiveItem(newIndex);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`item ${activeItem === index ? 'active' : ''}`} onClick={() => handleOnChangeAccordion(index)}>
          <div className="ac-title">
            <h3>{renderCustomTitle ? renderCustomTitle(item) : item?.title}</h3>
            <img src={activeItem === index ? accordionClose : accordionOpen} alt="Accordion close/open icon" />
          </div>

          <div className="ac-content">{renderChild(item, index)}</div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
