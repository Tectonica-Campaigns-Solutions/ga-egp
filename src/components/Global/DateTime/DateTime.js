import React from 'react';
import './index.scss';

const DateTime = ({ manualDate, date, time }) => {
  return (
    <div className="date">
      {manualDate ? (
        <span>{manualDate}</span>
      ) : (
        <span>
          {date} | {time}
        </span>
      )}
    </div>
  );
};

export default DateTime;
