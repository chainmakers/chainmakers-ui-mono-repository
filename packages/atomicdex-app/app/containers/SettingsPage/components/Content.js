// @flow
import React from 'react';
import api from 'utils/barterdex-api';
import { TabContainer } from '../../../components/Tabs';
import { useSettingsContext } from '../reducer';
import { selectCurrentTab } from '../selectors';
import { setMM2Version } from '../actions';
import AboutTab from './AboutTab';

function Content() {
  const [state, dispatch] = useSettingsContext();

  async function getMM2Version() {
    const { result } = await api.version();
    dispatch(setMM2Version(result));
  }

  React.useEffect(() => {
    getMM2Version();
  }, []);

  return (
    <TabContainer selected={selectCurrentTab(state) === 0}>
      <AboutTab />
    </TabContainer>
  );
}

Content.defaultProps = {};

Content.displayName = 'SettingsPage__Content';

export default Content;
