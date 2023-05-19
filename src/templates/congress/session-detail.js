import * as React from 'react';
import { Link } from 'gatsby';
import { isArray } from '../../utils';
import DescriptionIcon from '../../components/Global/DescriptionIcon/DescriptionIcon';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';

import dayIcon from '../../components/Icons/calendar.svg';
import timeIcon from '../../components/Icons/time.svg';
import locationIcon from '../../components/Icons/location.svg';

import * as styles from './session.module.scss';

const SessionDetail = ({ session }) => {
  const { room, title, time, sessionType, speakers = [] } = session;

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>

      {/* Basic information */}
      <div className="row mb-5">
        <div className="col-4">
          <DescriptionIcon title={'Day'} icon={dayIcon} text={''} />
        </div>
        <div className="col-4">
          <DescriptionIcon title={'Time'} icon={timeIcon} text={time} />
        </div>
        <div className="col-4">
          <DescriptionIcon title={'Room'} icon={locationIcon} text={room} />
        </div>
      </div>

      {/* Speakers section */}
      <div className="row">
        <div className="col">
          <h5 className={styles.speakerTitle}>Speakers</h5>

          {isArray(speakers) && (
            <>
              {speakers.map((speaker) => (
                <div className={'row'} key={speaker.id}>
                  <div className={`col-4 ${styles.speakerImage}`}>
                    <ImageWrapper image={speaker.image} />
                  </div>

                  <div className="col">
                    <h6 className={styles.speakerName}>{speaker.name}</h6>
                    <span className={styles.speakerPosition}>{speaker.jobPosition}</span>
                    <div
                      className={styles.speakerInformation}
                      dangerouslySetInnerHTML={{ __html: speaker.description }}
                    />

                    <Link className={styles.speakerLink}>Show more</Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
