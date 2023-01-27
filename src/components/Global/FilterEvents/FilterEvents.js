import React, { useState, useEffect} from 'react'
import CardEvent from '../CardEvent/CardEvent'

function FilterEvents({ events, tags }) {
  console.log(events);
  const [orderedEvents, setOrdenedEvents] = useState([{}])
  const handlerForm = () => {
    console.log('clicked')
  }
  useEffect(() => {
    
    const groupByMonth = events.reduce((group, event) => {
      const { filterDate } = event.node;
      group[filterDate] = group[filterDate] ?? [];
      group[filterDate].push(event);
      return group;
    }, {});
    
    const grouped = groupByMonth
    setOrdenedEvents(Object.entries(grouped));
  }, [])
  return (
      <div className="container">
        <div className="row justify-content-between">
            <div className="col-lg-7">
                <div className="d-flex">
                    {
                      tags.edges.map( item => <div><input type="checkbox" onChange={handlerForm} value=""/><label>{item.node.title}</label></div>)
                    }
                </div>
            </div>
            <div className="col-lg-4">
                2022
            </div>
        </div>
        <div className="row mt-5">
          { orderedEvents.map(item => 
            <div className="mt-5">
              <h3>{ item[0] }</h3>
              { item[1] && item[1].length > 0 && item[1].map(el => 
                <CardEvent 
                  slug={`/events/${el.node.slug}`} 
                  title={el.node.title} 
                  day={ el.node.date }
                  color={el.node.tags.color}
                  image={el.node.image}
                  tag={el.node.tags.title}
                />
              )}
            </div>
          )}
        </div>
      </div>
    
  )
}

export default FilterEvents