import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.scss';

const navigationItem = props => {
  return (
    <div>
      <li className={classes.NavigationItem}>
        <NavLink
          to={props.link}
          exact={props.exact}
          activeClassName={classes.active}
        >
          {props.children}
        </NavLink>
      </li>
    </div>
  );
};

export default navigationItem;
