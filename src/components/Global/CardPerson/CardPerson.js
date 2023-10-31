import React from 'react';
import { getEmailLink, getPhoneLink, pathToModel } from '../../../utils';
import Link from '../Link';
import AnimateLink from '../Link/AnimateLink';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import SocialLinkList from '../SocialLink/SocialLinkList';
import TextIcon from '../TextIcon/TextIcon';
import iconPhone from '../../Icons/icon_phone.svg';
import iconEmail from '../../Icons/icon_email.svg';
import iconPhoneWhite from '../../Icons/icon_phone_white.svg';
import iconEmailWhite from '../../Icons/icon_email_white.svg';

import './index.scss';

function CardPerson({ person, animated = false, hasLink = false, highlighted = false }) {
  // console.log({ person });
  const { hasDetailPage, image, name, jobPosition, country, model, slug, socialLinks = [], phone, email } = person;

  const FinalLink = animated ? AnimateLink : Link;
  const url = pathToModel(model.apiKey, slug);

  return (
    <div className={`card-person ${highlighted ? 'highlighted' : ''}`}>
      {hasDetailPage && <FinalLink to={url}>{image && <ImageWrapper image={image} />}</FinalLink>}
      {!hasDetailPage && image && <ImageWrapper image={image} />}

      <div>
        {highlighted && jobPosition && <div className="position">{jobPosition}</div>}

        {name && <h3>{name}</h3>}

        {!highlighted && jobPosition && <div className="job">{jobPosition}</div>}
        {country && <div className="job">{country}</div>}
        {!highlighted && socialLinks && <SocialLinkList links={socialLinks} />}

        {hasDetailPage && (
          <FinalLink to={url} className="link-read-more">
            Read more
          </FinalLink>
        )}

        {phone && (
          <TextIcon icon={highlighted ? iconPhoneWhite : iconPhone} text={<a href={getPhoneLink(phone)}>{phone}</a>} />
        )}
        {email && (
          <TextIcon icon={highlighted ? iconEmailWhite : iconEmail} text={<a href={getEmailLink(email)}>{email}</a>} />
        )}
      </div>
    </div>
  );
}

export default CardPerson;
