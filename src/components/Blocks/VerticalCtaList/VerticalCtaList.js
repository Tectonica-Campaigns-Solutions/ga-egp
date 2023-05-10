import * as React from 'react';
import { isArray } from '../../../utils';
import Cta from '../../Global/Cta/Cta';
import { pathToModel } from '../../../utils';

const VerticalCtaList = ({ block }) => {
  const { item } = block;

  return (
    <div>
      {isArray(item) && (
        <div className="row gap-4">
          {item.map((link) => {
            // TODO
            const url = pathToModel(link.model, '');

            return (
              <div>
                <Cta label={link.title} isButton={link.isButton} key={link.label} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerticalCtaList;
