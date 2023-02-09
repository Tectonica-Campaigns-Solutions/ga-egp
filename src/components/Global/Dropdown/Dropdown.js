import React, { useState } from 'react';
import * as styles from './dropdown.module.css';

const Dropdown = ({ activeValue, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="dropdown">
      <button
        className={`btn ${styles.egpDropdown}  dropdown-toggle ${isOpen ? 'show' : ''}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded={`${isOpen ? 'open' : 'false'}`}
        onClick={toggleOpen}
      >
        {activeValue}
      </button>

      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {options.map((option) => {
          return (
            <li>
              <a class="dropdown-item" onClick={option.onClick}>
                {option.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
