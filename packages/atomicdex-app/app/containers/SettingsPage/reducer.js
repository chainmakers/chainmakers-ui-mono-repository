// @flow
import React, { useContext } from 'react';
import { fromJS } from 'immutable';

// The initial state of the App
export const initialState = fromJS({
  applicationDialog: {
    open: false
  },

  mm2Dialog: {
    open: false
  }
});

const SettingsContext = React.createContext(initialState);

export function useSettingsContext() {
  const contextValue = useContext(SettingsContext);

  return contextValue;
}

export default SettingsContext;
