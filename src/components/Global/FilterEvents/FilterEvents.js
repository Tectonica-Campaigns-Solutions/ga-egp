import React, { useState, useEffect } from 'react';
import Accordion from '../Accordion/Accordion';
import CardEvent from '../CardEvent/CardEvent';
import { isArray } from '../../../utils';
import yearLeftIcon from '../../Icons/year-left.svg';
import yearRightIcon from '../../Icons/year-right.svg';

import './index.scss';

function FilterEvents({ events, tags }) {
  // current month
  // testing date porpuses
  //const d = new Date("February 6, 2023 11:13:00");
  const d = new Date();
  const defaultMonth = d.getMonth();

  // get years from content
  const yearsFilter = [...new Set(events.map((item) => item.node.year))];

  // states
  const [orderedEvents, setOrderedEvents] = useState([{}]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    let eventsByYear = events.filter((item) => item.node.year === activeYear);
    const groupByMonth = eventsByYear.reduce((group, event) => {
      const { filterDate, tags } = event.node;
      group[filterDate] = group[filterDate] ?? [];

      // TODO: Remove?
      if (activeCategory !== 'All') {
        if (tags.id === activeCategory) {
          group[filterDate].push(event);
        }
      } else {
        group[filterDate].push(event);
      }

      return group;
    }, {});

    const grouped = groupByMonth;
    setOrderedEvents(Object.entries(grouped));
  }, [activeYear, activeCategory]);

  const handlerForm = (event) => {
    const { name, value } = event.target;

    if (name === 'selected_category') {
      setActiveCategory(value);
    } else if (name === 'selected_year') {
      setActiveYear(value);
    }
  };

  const getActiveCategory = () => {
    if (activeCategory === 'All') return 'All';

    const currentCategory = tags.edges.find((tag) => tag.node.id === activeCategory);
    return currentCategory?.node?.title;
  };

  return (
    <div className="container filter-events">
      <form onChange={handlerForm}>
        <div className="row justify-content-between">
          <div className="col-lg-7">
            <div className="filter-action-title">Filter by category</div>
            <div className="category-items">
              {/* <div>
              <input type="checkbox" onChange={() => handlerForm('All')} value="All" />
                <label>All</label>
            </div> */}

              {tags.edges.map((item) => (
                <div>
                  <input id={item.node.id} type="checkbox" name="selected_category" value={item.node.id} />
                  <label for={item.node.id}>{item.node.title}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="filter-action-title">Select Year</div>

            <div className="d-flex align-items-center">
              <img src={yearLeftIcon} alt="Year left arrow icon" />

              {yearsFilter.map((year) => (
                <div className="year-container">
                  <input type="radio" id={year} name="selected_year" value={year} style={{ display: 'none' }} />
                  <label className={`${activeYear === year ? 'active' : ''}`} for={year}>
                    {year}
                  </label>
                </div>
              ))}

              <img src={yearRightIcon} alt="Year right arrow icon" />
            </div>
          </div>
        </div>
      </form>

      {activeCategory && (
        <div className="current-filters">
          <div>
            Filtered by <span>{getActiveCategory()}</span> in <span>{activeYear}</span>
          </div>
        </div>
      )}

      <div className="row mt-5">
        {isArray(orderedEvents) && (
          <Accordion
            defaultActive={defaultMonth}
            items={orderedEvents}
            renderCustomTitle={(item) => {
              const eventMonth = item[0];
              return eventMonth;
            }}
            renderChild={(item) => {
              const events = item[1];

              if (!isArray(events)) return null;

              return (
                <>
                  {events.map((e) => (
                    <CardEvent
                      slug={`/events/${e.node.slug}`}
                      title={e.node.title}
                      day={e.node.date}
                      color={e.node.tags.color}
                      image={e.node.image}
                      tag={e.node.tags.title}
                    />
                  ))}
                </>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default FilterEvents;
