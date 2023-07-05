import React from 'react';
import { isArray } from '../../../utils';
import CardPerson from '../../Global/CardPerson/CardPerson';

import './index.scss';

function GroupPerson({ block }) {
  const { title, useContainer, people = [], isHighlighted = false } = block;
  
  return (
    <div className={`${useContainer ? 'container mt-5' : ''}`}>
      <div className={`group-person ${isHighlighted ? 'highlighted' : ''}`}>
        {title && <h2>{title}</h2>}

        <div className="row gy-5">
          {isArray(people) &&
            people.map((item) => {
              const person = item.person
              const hasLink = person.description && person.description !== '' || item.customBio !== ''
              person.description = item.customBio
              return (
                <div key={person.id} className={`${isHighlighted ? 'col-lg-8' : 'col-lg-4'}`}>
                  <CardPerson person={person} key={person.id} hasLink={hasLink} animated />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default GroupPerson;
