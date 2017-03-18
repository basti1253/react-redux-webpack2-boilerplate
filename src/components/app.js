import React, { PureComponent, PropTypes } from 'react';

import Menu from './menu';

export default class App extends PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <Menu />

        <div className='Page'>
          { children }
        </div>
      </div>
    );
  }
}
