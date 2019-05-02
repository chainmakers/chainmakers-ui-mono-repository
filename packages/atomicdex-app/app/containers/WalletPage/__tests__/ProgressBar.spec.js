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
    const renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    let renderedComponent = shallow(
      <ProgressBar transactionsLoading assetLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
    renderedComponent = shallow(<ProgressBar assetLoading classes={classes} />);
    expect(renderedComponent.type()).toEqual(LinearProgress);
    renderedComponent = shallow(
      <ProgressBar transactionsLoading classes={classes} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
