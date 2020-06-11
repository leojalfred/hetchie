import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/home/Home';
import About from './views/about/About';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import './App.scss';

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
  );
}
