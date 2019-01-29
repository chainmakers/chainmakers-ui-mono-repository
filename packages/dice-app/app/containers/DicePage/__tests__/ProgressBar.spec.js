// @flow
// @docs
// - https://airbnb.io/enzyme/docs/api/ShallowWrapper/type.html
// - https://github.com/react-boilerplate/react-boilerplate/tree/master/app/containers/HomePage/tests
// - https://storybook.js.org/testing/react-ui-testing/
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinearProgress from '../../../components/ProgressBar';
import { KOMODOD_STATE_STARTED } from '../../App/constants';
import { ProgressBar } from '../ProgressBar';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/DicePage/<ProgressBar />', () => {
  it('should render an null', () => {
    const renderedComponent = shallow(<ProgressBar />);
    expect(renderedComponent.type()).toEqual(null);
  });

  it('should render an LinearProgress component', () => {
    let renderedComponent = shallow(
      <ProgressBar komododState={KOMODOD_STATE_STARTED} />
    );
    expect(renderedComponent.type()).toEqual(LinearProgress);

    renderedComponent = shallow(<ProgressBar betHistoryLoading />);
    expect(renderedComponent.type()).toEqual(LinearProgress);
  });
});
