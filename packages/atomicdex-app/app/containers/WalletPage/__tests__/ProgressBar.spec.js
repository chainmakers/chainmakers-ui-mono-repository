import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinearProgress from '../../../components/ProgressBar';
import { ProgressBarUI as ProgressBar } from '../ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/WalletPage/<ProgressBar />', () => {
  const classes = {
    linearprogress: 'fakeCssClass'
  };
  it('should render an null', () => {
    let renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.type()).toEqual(null);
    renderedComponent = shallow(<ProgressBar priceLoading classes={classes} />);
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    let renderedComponent = shallow(
      <ProgressBar transactionsLoading priceLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
    renderedComponent = shallow(
      <ProgressBar transactionsLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
