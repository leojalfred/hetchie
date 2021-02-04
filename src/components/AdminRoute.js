import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    render={props =>
      user.data.role === 'admin' ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(AdminRoute)
