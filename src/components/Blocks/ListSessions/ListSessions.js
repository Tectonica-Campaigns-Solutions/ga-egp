import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import SessionType from './SessionType/SessionType';
import Accordion from '../../Global/Accordion/Accordion';
import SessionItem from './SessionItem/SessionItem';

function ListSessions(block) {
  console.log(block)
  const items = block.block.sessionItems;

  const data = useStaticQuery(graphql`
    query SessionTypes {
      allDatoCmsSessionType {
        edges {
          node {
            id
            title
            color {
              hex
            }
          }
        }
      }
    }
  `);

  const handleSession = (sessionId) => {
    const parsedId = sessionId.replace('DatoCmsSession-', '');
    navigate(`?item=${parsedId}`);
  };

  return (
    <div>
      <div className="row mb-5">
        {data.allDatoCmsSessionType.edges.map((item) => (
          <div className="col-4" key={item.id}>
            <SessionType item={item} />
          </div>
        ))}
      </div>

      <Accordion
        items={items}
        renderCustomTitle={(item) => item.date}
        renderChild={(item, index) => {
          const sessions = item.session;

          return (
            <React.Fragment key={item.id}>
              {sessions.map((session) => (
                <SessionItem key={session.id} item={session} handleSession={handleSession} />
              ))}
            </React.Fragment>
          );
        }}
      />
    </div>
  );
}

export default ListSessions;
