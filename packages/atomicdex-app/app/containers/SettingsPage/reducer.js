// @flow
import React, { useContext } from 'react';
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
import {
  APPLICATION_DIALOG_OPEN,
  APPLICATION_DIALOG_CLOSE,
  MM2_DIALOG_OPEN,
  MM2_DIALOG_CLOSE,
  TAB_SWITCH,
  MM2_SET
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  mm2Version: 'N/A',

  currentTab: 0,

  applicationDialog: {
    open: false
  },

  mm2Dialog: {
    open: false
  }
});

const SettingsContext = React.createContext(initialState);

export const reducer = handleActions(
  {
    [APPLICATION_DIALOG_OPEN]: state =>
      state.setIn(['applicationDialog', 'open'], true),

    [APPLICATION_DIALOG_CLOSE]: state =>
      state.setIn(['applicationDialog', 'open'], false),

    [MM2_DIALOG_OPEN]: state => state.setIn(['mm2Dialog', 'open'], true),

    [MM2_DIALOG_CLOSE]: state => state.setIn(['mm2Dialog', 'open'], false),

    [TAB_SWITCH]: (state, { payload }) => state.set('currentTab', payload.tab),

    [MM2_SET]: (state, { payload }) => state.set('mm2Version', payload.version),

    [LOGOUT]: () => initialState
  },
  initialState
);

export function useSettingsContext() {
  const contextValue = useContext(SettingsContext);

  return contextValue;
}

export default SettingsContext;
