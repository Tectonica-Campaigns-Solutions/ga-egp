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

function CardPerson({ person, animated = false, hasLink = false }) {
  const FinalLink = animated ? AnimateLink : Link;
  const url = pathToModel(person.model.apiKey, person.slug);

  return (
    <div className="card-person">
      {/* <FinalLink to={url}>{person.image && <ImageWrapper image={person.image} />}</FinalLink> */}
      { person.hasDetailPage && <FinalLink to={url}>{person.image && <ImageWrapper image={person.image} />}</FinalLink>}
      { !person.hasDetailPage && person.image && <ImageWrapper image={person.image} />}

      <div>
        {/* <div className="position">head of unit</div> */}
        <h3>{person.name}</h3>

        <div className="job">{person.jobPosition}</div>
        <div className="job">{person.country}</div>
        {/* <SocialLinkList links={person.socialLinks} /> */}

        {person.hasDetailPage && (
          <FinalLink to={url} className="link-read-more">
            Read more
          </FinalLink>
        )}

        {/* {person.phone && <TextIcon icon={iconPhone} text={<a href={getPhoneLink(person.phone)}>{person.phone}</a>} />}
        {person.email && <TextIcon icon={iconEmail} text={<a href={getEmailLink(person.email)}>{person.email}</a>} />} */}
      </div>
    </div>
  );
}

export default CardPerson;
