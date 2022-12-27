import React from 'react';
import { Link } from 'gatsby';

export default function Cta({ url, label, isButton = false }) {
  return (
    <div>
      <Link className={`btn ${isButton ? 'btn-primary' : ''}`} to={url}>
        {label}
      </Link>
    </div>
  );
}
