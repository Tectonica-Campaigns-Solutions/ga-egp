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
  console.log(session)
  const { room, title, time, sessionType, speakers = [], date, description } = session;

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      {
        description && <div className="mb-5" dangerouslySetInnerHTML={{__html: description}} />
      }

      {/* Basic information */}
      <div className="row mb-5">
        <div className="col-4">
          <DescriptionIcon title={'Day'} icon={dayIcon} text={date} />
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
              {speakers.map((speaker, i) => {
                const speakerInfo = JSON.parse(speaker.speakerInfo);
                // console.log({ speaker, speakerInfo });

                return (
                  <div className={'row'} key={i}>
                    <div className={`col-4 ${styles.speakerImage}`}>
                      <ImageWrapper image={speaker.photo} />
                    </div>

                    <div className="col">
                      <h6 className={styles.speakerName}>
                        {speakerInfo.name} {speakerInfo.last_name}
                      </h6>

                      {speakerInfo.job_title && <span className={styles.speakerPosition}>{speakerInfo.job_title}</span>}

                      {speakerInfo.bio && (
                        <div
                          className={styles.speakerInformation}
                          dangerouslySetInnerHTML={{ __html: speakerInfo.bio }}
                        />
                      )}

                      {/* <Link className={styles.speakerLink}>Show more</Link> */}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
