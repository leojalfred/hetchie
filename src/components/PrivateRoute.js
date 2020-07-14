import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    render={props =>
      user.loggedIn === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(PrivateRoute)
