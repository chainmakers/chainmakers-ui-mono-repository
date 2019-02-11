// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import { NavigationLayout } from '../Layout';
import { routes } from '../../constants';

type INotFoundPageProps = {};

class NotFoundPage extends React.Component<INotFoundPageProps> {
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
