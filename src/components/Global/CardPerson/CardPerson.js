import React from 'react';
import { getEmailLink, getPhoneLink, pathToModel } from '../../../utils';
import Link from '../Link';
import AnimateLink from '../Link/AnimateLink';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import SocialLinkList from '../SocialLink/SocialLinkList';
import TextIcon from '../TextIcon/TextIcon';
import iconPhone from '../../Icons/icon_phone.svg';
import iconEmail from '../../Icons/icon_email.svg';

import './index.scss';

function CardPerson({ person, animated = false }) {
  const FinalLink = animated ? AnimateLink : Link;
  const url = pathToModel(person.model.apiKey, person.slug);

  return (
    <div className="card-person">
      <FinalLink to={url}>{person.image && <ImageWrapper image={person.image} />}</FinalLink>

      <div>
        <div className="position">head of unit</div>

        <FinalLink to={url}>
          <h3>{person.name}</h3>
        </FinalLink>

        <div className="job">{person.jobPosition}</div>
        <SocialLinkList links={person.socialLinks} />

        {person.phone && <TextIcon icon={iconPhone} text={<a href={getPhoneLink(person.phone)}>{person.phone}</a>} />}
        {person.email && <TextIcon icon={iconEmail} text={<a href={getEmailLink(person.email)}>{person.email}</a>} />}
      </div>
    </div>
  );
}

export default CardPerson;
