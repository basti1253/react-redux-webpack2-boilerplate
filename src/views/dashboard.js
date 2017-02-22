import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { testAction, testAsync } from '../actions/app';

export class DashboardComponent extends Component {

  static propTypes = {
    asyncData: PropTypes.string,
    asyncLoading: PropTypes.bool,
    counter: PropTypes.number.isRequired,
    // from react-redux connect
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    asyncData: null,
    asyncLoading: false,
  };

  mixins = [
    PureRenderMixin
  ];

  handleAsyncButtonClick() {
    const { dispatch } = this.props;
    dispatch(testAsync());
  }

  handleTestButtonClick() {
    const { dispatch } = this.props;
    dispatch(testAction());
  }

  render() {
    const {
      asyncData,
      asyncLoading,
      counter,
    } = this.props;

    return (
      <div className='Dashboard'>
        <h2>Examples</h2>
        <hr />
        <div>
          <h3>Synchronous action</h3>
          <p>{ counter }</p>
          <button onClick={ () => this.handleTestButtonClick() }>
            Increase counter
          </button>
        </div>
        <hr />
        <div>
          <h3>Async action example</h3>
          <p>{ asyncData }</p>
          { asyncLoading && <p>Loading...</p> }
          <button
            disabled={ asyncLoading }
            onClick={ () => this.handleAsyncButtonClick() }
          >
            Get async data
          </button>
        </div>
        <hr />
        <div>
          <h3>Background image</h3>
          <div className='BackgroundImgExample' />

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asyncData: state.app.get('asyncData'),
  asyncLoading: state.app.get('asyncLoading'),
  counter: state.app.get('counter'),
});

const mapDispatchToProps = (dispatch) => {
  // TODO: use bindActionCreators from redux instead
  // e.g. https://github.com/reactjs/redux/blob/85e2368ea9ff9b308fc873921ddf41929638f130/examples/universal/common/containers/App.js
  return { dispatch };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
