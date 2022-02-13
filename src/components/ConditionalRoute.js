import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ConditionalRoute = ({ component: Component, condition, ...rest }) => (
  <Route
    render={props =>
      condition ? <Component {...props} {...rest} /> : <Redirect to="/" />
    }
  />
)

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(ConditionalRoute)
