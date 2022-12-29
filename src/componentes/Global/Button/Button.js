import React from "react";
import { Link } from "gatsby";

import "./index.scss";

const Button = ({ url, label, isPrimary = true }) => (
  <Link className={`egp-btn ${isPrimary ? "primary" : "secondary"}`} to={url}>
    {label}
  </Link>
);

export default Button;
