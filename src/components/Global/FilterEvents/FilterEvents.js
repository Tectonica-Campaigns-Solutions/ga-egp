import React, { useState, useEffect } from 'react';
import Accordion from '../Accordion/Accordion';
import EventList from '../EventList/EventList';
import { isArray, monthNames } from '../../../utils';
import DateSlider from '../DateSlider/DateSlider';
import openIcon from '../../Icons/event_open.svg';
import closeIcon from '../../Icons/event-close.svg';
import useWindowSize from '../../hooks/useWindowSize';

import './index.scss';

const ALL_CATEGORIES = 'All';

function FilterEvents({ events, tags }) {
  const { width } = useWindowSize();

  // get years from content
  const yearsFilter = [...new Set(events.map((item) => item.node.year))];

  // states
  const [orderedEvents, setOrderedEvents] = useState([{}]);
  const [categoriesFilter, setCategoriesFilter] = useState([ALL_CATEGORIES]);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());
  const [mobileToggleFilter, setMobileToggleFilter] = useState({ category: false, year: false });

  const initialMonth = new Date().getMonth();

  useEffect(() => {
    const eventsByYear = events.filter((item) => item.node.year === activeYear);

    const eventsGroupedByMonths = new Array(12).fill(1).map((_, index) => {
      const currentMonth = monthNames[index];

      const monthEvents = eventsByYear.filter((e) => {
        const { filterDate, tags } = e.node;

        if (!categoriesFilter.includes(ALL_CATEGORIES)) {
          return filterDate === currentMonth && categoriesFilter.some((c) => c === tags.id);
        }

        return filterDate === currentMonth;
      });

      return { month: currentMonth, events: monthEvents ?? [] };
    });

    setOrderedEvents(eventsGroupedByMonths);
  }, [activeYear, categoriesFilter, events]);

  const handlerForm = (event) => {
    const { name, value } = event.target;

    if (name === 'selected_category') {
      const currentCategories = [...categoriesFilter];

      if (currentCategories.find((c) => c === value)) {
        setCategoriesFilter((prev) => prev.filter((c) => c !== value));
      } else {
        setCategoriesFilter((prev) => [...prev, value]);
      }
    } else if (name === 'selected_year') {
      setActiveYear(value);
    }
  };

  const getActiveCategories = () => {
    if (!categoriesFilter.length) return;

    return categoriesFilter
      .filter((c) => c !== ALL_CATEGORIES)
      .map((c) => {
        const currentCategory = tags.edges.find((tag) => tag.node.id === c);
        return currentCategory?.node?.title;
      })
      .join(', ');
  };

  const isCategoryChecked = (category) => {
    return categoriesFilter.find((c) => c === category);
  };

  const handleOnToggleAll = (e) => {
    const { checked } = e.target;

    if (checked) {
      setCategoriesFilter(tags.edges.map((item) => item.node.id));
    } else {
      setCategoriesFilter([]);
    }
  };

  const shouldRenderCategories =
    categoriesFilter.length > 0
      ? categoriesFilter.length === 1 && categoriesFilter.includes(ALL_CATEGORIES)
        ? false
        : true
      : false;

  return (
    <div className="container filter-events">
      <form onChange={handlerForm}>
        {width > 992 ? (
          <div className="desktop-form row justify-content-between">
            <div className="col-lg-7">
              <div className="filter-action-title">Filter by category</div>
              <div className="category-items">
                <div>
                  <input
                    id="all"
                    type="checkbox"
                    name="selected_category"
                    value={ALL_CATEGORIES}
                    onClick={handleOnToggleAll}
                    defaultChecked={isCategoryChecked(ALL_CATEGORIES)}
                  />
                  <label htmlFor="all">All</label>
                </div>

                {tags.edges.map((item) => (
                  <div key={item.node.id}>
                    <input
                      id={item.node.id}
                      type="checkbox"
                      name="selected_category"
                      value={item.node.id}
                      defaultChecked={isCategoryChecked(item.node.id)}
                    />
                    <label htmlFor={item.node.id}>{item.node.title}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-3">
              <div className="filter-action-title">Select Year</div>
              <DateSlider years={yearsFilter} activeYear={activeYear} />
            </div>
          </div>
        ) : (
          <div className="mobile-form">
            {/* Category filter item */}
            <div className="item">
              <div
                className="filter-action-title"
                onClick={() => setMobileToggleFilter((prev) => ({ ...prev, category: !prev.category }))}
              >
                Filter by category
                <img src={mobileToggleFilter.category ? openIcon : closeIcon} alt="open/close icon" />
              </div>

              {mobileToggleFilter.category && (
                <div className="category-items">
                  <div>
                    <input
                      id="all"
                      type="checkbox"
                      name="selected_category"
                      value={ALL_CATEGORIES}
                      onClick={handleOnToggleAll}
                      defaultChecked={isCategoryChecked(ALL_CATEGORIES)}
                    />
                    <label htmlFor="all">All</label>
                  </div>

                  {tags.edges.map((item) => (
                    <div key={item.node.id}>
                      <input
                        id={item.node.id}
                        type="checkbox"
                        name="selected_category"
                        value={item.node.id}
                        defaultChecked={isCategoryChecked(item.node.id)}
                      />
                      <label htmlFor={item.node.id}>{item.node.title}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Year filter item */}
            <div className="item">
              <div
                className="filter-action-title"
                onClick={() => setMobileToggleFilter((prev) => ({ ...prev, year: !prev.year }))}
              >
                Select Year
                <img src={mobileToggleFilter.year ? openIcon : closeIcon} alt="open/close icon" />
              </div>
              {mobileToggleFilter.year && <DateSlider years={yearsFilter} activeYear={activeYear} />}
            </div>
          </div>
        )}
      </form>

      {shouldRenderCategories && (
        <div className="current-filters">
          <div>
            Filtered by <span>{getActiveCategories()}</span> in <span>{activeYear}</span>
          </div>
        </div>
      )}

      <div className="row mt-0 mt-md-5">
        {isArray(orderedEvents) && (
          <Accordion
            defaultActive={initialMonth}
            items={orderedEvents}
            renderCustomTitle={(item) => {
              const eventsOnMonth = item?.events?.length || 0;
              return `${item.month} (${eventsOnMonth})`;
            }}
            renderChild={(item) => {
              const events = item.events;

              if (!isArray(events)) return null;

              return <EventList events={events} />;
            }}
          />
        )}
      </div>
    </div>
  );
}

export default FilterEvents;
