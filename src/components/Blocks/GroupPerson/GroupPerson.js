import React from 'react';
import { isArray } from '../../../utils';
import CardPerson from '../../Global/CardPerson/CardPerson';

import './index.scss';

function GroupPerson({ block }) {
  const isHighlighted = block.highlighted;

  return (
    <div className={`group-person ${isHighlighted ? 'highlighted' : ''}`}>
      {block.title && <h2>{block.title}</h2>}

      <div className="row">
        {isArray(block.people) &&
          block.people.map((person) => {
            return (
              <div className={`${isHighlighted ? 'col-lg-8' : 'col-lg-4'}`}>
                <CardPerson person={person} key={person.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GroupPerson;
