import React from 'react';
import Link from '../Link';

import './index.scss';

const Button = ({ url, label, isPrimary = true, customVariant }) => (
  <Link className={`egp-btn ${isPrimary ? 'primary' : 'secondary'} ${customVariant}`} to={url}>
    {label}
  </Link>
);

export default Button;
