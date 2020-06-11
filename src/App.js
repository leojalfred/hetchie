import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faLock,
  faLongArrowAltRight,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import Home from './views/home/Home';
import About from './views/about/About';
import Button from './components/BigButton';
import './App.scss';

function App() {
  Modal.setAppElement('#root');

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
            <Home {...props} openLoginModal={openLoginModal} />
          )}
        />
        <Route
          exact
          path="/about"
          component={About}
          render={(props) => (
            <About {...props} openLoginModal={openLoginModal} />
          )}
        />
      </Switch>
      <Modal
        className="modal"
        overlayClassName="modal__overlay"
        contentLabel="Login Modal"
        isOpen={modalLoginIsOpen}
        onRequestClose={closeLoginModal}
        shouldCloseOnOverlayClick={true}
      >
        <div className="modal__image">
          <FontAwesomeIcon className="modal__icon" icon={faSignInAlt} />
        </div>
        <div className="modal__main">
          <div className="modal__wrapper">
            <div className="modal__content">
              <div className="modal__topline">
                <div className="modal__text">
                  <h2 className="modal__heading">Welcome back</h2>
                  <p className="modal__description">
                    Log in to your account to optimize your bids
                  </p>
                </div>
                <FontAwesomeIcon
                  className="modal__close"
                  icon={faTimesCircle}
                />
              </div>

              <Formik>
                {({ isSubmitting }) => (
                  <Form className="modal__form">
                    <div className="modal__input-group">
                      <FontAwesomeIcon
                        className="modal__input-icon"
                        icon={faEnvelope}
                      />
                      <Field
                        className="modal__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="modal__input-group">
                      <FontAwesomeIcon
                        className="modal__input-icon"
                        icon={faLock}
                      />
                      <Field
                        className="modal__input"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <Button
                      className="modal__submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Log in
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>

            <button className="modal__button" type="button">
              Create your account <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
          </div>
        </div>
      </Modal>
    </Router>
  );
}

export default App;
