// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import { NavigationLayout } from '../Layout';
import routes from '../../constants/routes.json';

type Props = {};

class NotFoundPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <React.Fragment>
        NotFoundPage
        <br />
        <Link to={routes.HOME}>to HomePage</Link>
      </React.Fragment>
    );
  }
}

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <NotFoundPage />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
