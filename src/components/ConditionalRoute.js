import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const ConditionalRoute = ({ component: Component, condition, ...rest }) => (
  <Route
    render={props =>
      condition ? <Component {...props} {...rest} /> : <Redirect to="/" />
    }
  />
)

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(ConditionalRoute)
