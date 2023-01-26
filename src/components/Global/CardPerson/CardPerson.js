import React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import SocialLinkList from '../SocialLink/SocialLinkList';
import TextIcon from '../TextIcon/TextIcon';
import iconPhone from '../../Icons/icon_phone.svg';
import iconEmail from '../../Icons/icon_email.svg';

import './index.scss';

function CardPerson({ person }) {
  const url = pathToModel(person.model.apiKey, person.slug);

  return (
    <div className="card-person">
      <Link to={url}>{person.image && <ImageWrapper image={person.image} />}</Link>

      <div>
        <div className="position">head of unit</div>

        <Link to={url}>
          <h3>{person.name}</h3>
        </Link>

        <div className="job">{person.jobPosition}</div>

        <SocialLinkList links={person.socialLinks} />

        {person.phone && <TextIcon icon={iconPhone} text={person.phone} />}
        {person.email && <TextIcon icon={iconEmail} text={person.email} />}
      </div>
    </div>
  );
}

export default CardPerson;
