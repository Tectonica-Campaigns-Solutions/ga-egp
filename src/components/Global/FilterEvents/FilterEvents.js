import React, { useState, useEffect } from 'react';
import Accordion from '../Accordion/Accordion';
import CardEvent from '../CardEvent/CardEvent';
import { isArray, monthNames } from '../../../utils';
import yearLeftIcon from '../../Icons/year-left.svg';
import yearRightIcon from '../../Icons/year-right.svg';

import './index.scss';

const ALL_CATEGORIES = 'All';

function FilterEvents({ events, tags }) {
  // get years from content
  const yearsFilter = [...new Set(events.map((item) => item.node.year))];

  // states
  const [orderedEvents, setOrderedEvents] = useState([{}]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());

  const initialMonth = new Date().getMonth();

  useEffect(() => {
    const eventsByYear = events.filter((item) => item.node.year === activeYear);

    const eventsGroupedByMonths = new Array(12).fill(1).map((_, index) => {
      const currentMonth = monthNames[index];

      const monthEvents = eventsByYear.filter((e) => {
        const { filterDate, tags } = e.node;

        if (activeCategory !== ALL_CATEGORIES) {
          return filterDate === currentMonth && tags.id === activeCategory;
        }

        return filterDate === currentMonth;
      });

      return { month: currentMonth, events: monthEvents ?? [] };
    });

    setOrderedEvents(eventsGroupedByMonths);
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
            defaultActive={initialMonth}
            items={orderedEvents}
            renderCustomTitle={(item) => item.month}
            renderChild={(item) => {
              const events = item.events;

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
