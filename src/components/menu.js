import React, { PureComponent } from 'react';
import { IndexLink, Link } from 'react-router';
import { routeCodes } from '../routes';

export default class Menu extends PureComponent {

  render() {
    return (
      <div className='Menu'>
        <IndexLink to={ routeCodes.DASHBOARD }>
          Dashboard
        </IndexLink>
        <Link to={ routeCodes.ABOUT }>
          About
        </Link>
        <Link to='404'>
          404
        </Link>
      </div>
    );
  }
}
