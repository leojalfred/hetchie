import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(PrivateRoute);
