// @flow
import React from 'react';
import { TabContainer } from '../../../components/Tabs';
import { useSettingsContext } from '../reducer';
import { selectCurrentTab } from '../selectors';
import AboutTab from './AboutTab';

type IContentProps = {};

function Content(props: IContentProps) {
  const [state, dispatch] = useSettingsContext();

  return (
    <TabContainer selected={selectCurrentTab(state) === 0}>
      <AboutTab />
    </TabContainer>
  );
}

Content.defaultProps = {};

Content.displayName = 'SettingsPage__Content';

export default Content;
