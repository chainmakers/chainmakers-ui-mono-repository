// https://airbnb.io/enzyme/docs/api/ShallowWrapper/type.html
// https://github.com/react-boilerplate/react-boilerplate/tree/master/app/containers/HomePage/tests
// https://storybook.js.org/testing/react-ui-testing/
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LOADING } from '../../../constants';
import LinearProgress from '../../../components/ProgressBar';
import { ProgressBarUI as ProgressBar } from '../ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/OrderPage/<ProgressBar />', () => {
  const classes = {
    linearprogress: 'fakeCssClass'
  };
  it('should render an null', () => {
    let renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.type()).toEqual(null);
    renderedComponent = shallow(
      <ProgressBar balanceLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    let renderedComponent = shallow(
      <ProgressBar orderbookFetchStatus={LOADING} classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);

    renderedComponent = shallow(
      <ProgressBar
        balanceLoading
        orderbookFetchStatus={LOADING}
        classes={classes}
      />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
    renderedComponent = shallow(
      <ProgressBar
        balanceLoading
        cancelingOrderModalFetchStatus={LOADING}
        classes={classes}
      />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
