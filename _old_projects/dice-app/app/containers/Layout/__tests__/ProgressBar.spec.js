// @flow

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinearProgress from '../../../components/ProgressBar';
import { KOMODOD_STATE_STARTED } from '../../App/constants';
import { ProgressBarUI } from '../ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/Layout/<ProgressBar />', () => {
  it('should render an null', () => {
    let renderedComponent = shallow(<ProgressBarUI />);
    expect(renderedComponent.type()).toEqual(null);
    renderedComponent = shallow(<ProgressBarUI betHistoryLoading />);
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    const renderedComponent = shallow(
      <ProgressBarUI komododState={KOMODOD_STATE_STARTED} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
