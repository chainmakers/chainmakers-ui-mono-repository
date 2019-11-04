import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TabContainer } from '../TabContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Tabs/<TabContainer />', () => {
  const classes = {
    tabContainer: 'fakeCssClass'
  };

  it('should render an TabContainer but it hide', () => {
    const renderedComponent = shallow(
      <TabContainer classes={classes}>children</TabContainer>
    );
    expect(renderedComponent.hasClass(classes.tabContainer)).toEqual(true);
  });

  it('should render an TabContainer but it show', () => {
    const renderedComponent = shallow(
      <TabContainer classes={classes} selected>
        children
      </TabContainer>
    );
    expect(renderedComponent.hasClass(classes.tabContainer)).toEqual(true);
    expect(renderedComponent.hasClass('isActive')).toEqual(true);
  });
});
