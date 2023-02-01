import React from 'react';
import './index.scss';

const DateTime = ({ date, time }) => {
  return (
    <div className="date">
      <span>
        {date} | {time}
      </span>
    </div>
  );
};

export default DateTime;
