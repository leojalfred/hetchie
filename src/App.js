import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import Home from './views/home/Home';
import About from './views/about/About';
import PrivateRoute from './components/PrivateRoute';
import Firms from './views/firms/Firms';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import './App.scss';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

export default function App() {
  const [modalLoginIsOpen, setLoginIsOpen] = React.useState(false);
  function openLoginModal() {
    return setLoginIsOpen(true);
  }
  function closeLoginModal() {
    return setLoginIsOpen(false);
  }

  const [modalRegisterIsOpen, setRegisterIsOpen] = React.useState(false);
  function openRegisterModal() {
    return setRegisterIsOpen(true);
  }
  function closeRegisterModal() {
    return setRegisterIsOpen(false);
  }

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                openLoginModal={openLoginModal}
                openRegisterModal={openRegisterModal}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={(props) => (
              <About {...props} openLoginModal={openLoginModal} />
            )}
          />
          <PrivateRoute exact path="/firms" component={Firms} />
        </Switch>
        <LoginModal
          isOpen={modalLoginIsOpen}
          closeLoginModal={closeLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <RegisterModal
          isOpen={modalRegisterIsOpen}
          closeRegisterModal={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
      </Router>
    </Provider>
  );
}
