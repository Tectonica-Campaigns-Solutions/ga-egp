import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export default class Link extends React.Component {
  render() {
    const { to, children, ...rest } = this.props;
    //check for string in case link recieve hardoced link on templates ex: logo
    if (to?.content?.slug || typeof to === 'string') {
      return (
        <GatsbyLink to={`${to?.content?.slug ? '/' + to?.content?.slug : to}`} {...rest}>
          {children}
        </GatsbyLink>
      );
    } else {
      return (
        <a href={to?.url} {...rest}>
          {children}
        </a>
      );
    }
  }
}
