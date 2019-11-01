// @flow

import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

type Props = {
  locale: string,
  // eslint-disable-next-line flowtype/no-weak-types
  messages: Object,
  children: Node
};

export class Provider extends React.PureComponent<Props> {
  render() {
    const { locale, messages, children } = this.props;

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}));

const Index = connect(mapStateToProps)(Provider);

export default Index;
