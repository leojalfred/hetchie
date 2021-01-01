import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faUserPlus,
  faLongArrowAltRight,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons'
import Modal from './components/Modal'
import CredentialsForm from './components/CredentialsForm'

export default function RegisterModal({
  isOpen,
  closeRegisterModal,
  openLoginModal,
  openRegisterModal,
}) {
  const initialValues = {
    first: '',
    last: '',
    email: '',
    school: '',
    year: '',
    password: '',
    confirm: '',
  }

  const [privacyIsOpen, setPrivacyIsOpen] = useState(false)
  const openPrivacyModal = () => setPrivacyIsOpen(true)
  const closePrivacyModal = () => setPrivacyIsOpen(false)

  function switchToPrivacy() {
    closeRegisterModal()
    setTimeout(() => openPrivacyModal(), 200)
  }
  function switchToLogin() {
    closeRegisterModal()
    setTimeout(() => openLoginModal(), 200)
  }
  function switchToRegister() {
    closePrivacyModal()
    setTimeout(() => openRegisterModal(), 200)
  }

  return (
    <>
      <Modal
        contentLabel="Register Modal"
        isOpen={isOpen}
        onRequestClose={closeRegisterModal}
        icon={faUserPlus}
      >
        <div className="modal__content">
          <div className="modal__topline">
            <div className="modal__text">
              <h2 className="modal__heading">Get started</h2>
              <p className="modal__description">
                Create an account to start optimizing your bids
              </p>
            </div>

            <FontAwesomeIcon
              className="modal__close"
              icon={faTimesCircle}
              onClick={closeRegisterModal}
            />
          </div>

          <CredentialsForm
            initialValues={initialValues}
            closeModal={closeRegisterModal}
            register={true}
            submit="Register"
          />
        </div>

        <div className="modal__footer">
          <p className="modal__small">
            By registering, you agree to our{' '}
            <button
              className="modal__privacy"
              type="button"
              onClick={switchToPrivacy}
            >
              privacy policy
            </button>
          </p>

          <button
            className="modal__button"
            type="button"
            onClick={switchToLogin}
          >
            Log in
            <FontAwesomeIcon
              className="modal__button-icon"
              icon={faLongArrowAltRight}
            />
          </button>
        </div>
      </Modal>

      <Modal
        contentLabel="Privacy Modal"
        isOpen={privacyIsOpen}
        onRequestClose={closePrivacyModal}
        icon={faUserShield}
      >
        <div className="modal__content">
          <div className="modal__topline modal__topline--privacy">
            <div className="modal__text">
              <h2 className="modal__heading">Privacy policy</h2>
              <p className="modal__description">
                We make sure to be transparent about how we treat your data
              </p>
            </div>

            <FontAwesomeIcon
              className="modal__close"
              icon={faTimesCircle}
              onClick={closePrivacyModal}
            />
          </div>

          <div className="modal__group">
            <h3 className="modal__group-content">
              Hetchie Privacy Policy and Cookie Policy
            </h3>
            <p className="modal__group-content">
              This privacy policy describes the personal data collected or
              generated when you use Hetchie’s website (“Site”). It also
              explains how your personal data is used, shared and protected,
              what choices you have relating to your personal data and how you
              can contact us.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Who is Responsible for the Processing of Your Personal Data?
            </h3>
            <p className="modal__group-content">
              Hetchie processes personal data internally. Hetchie reserves the
              right to outsource the processing of data, prior to which the
              Privacy Policy will be updated to clarifies the parties through
              which personal data is processed. The terms “Hetchie”, “us”, “we”,
              or “our” each refer to Hetchie, Inc.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              What Personal Data Do We Collect When?
            </h3>
            <p className="modal__group-content">
              We ask you for certain personal data to provide you with the
              products or services you request. This includes:
            </p>
            <ul className="modal__group-content">
              <li>Login information, including your password</li>
              <li>Legal name</li>
              <li>
                Contact information, including your email address and phone
                number
              </li>
              <li>
                Personal details, including your law school, grade point average
              </li>
              <li>
                Personal preferences, such as cities and practice areas in which
                you are interested in working
              </li>
            </ul>
            <p className="modal__group-content">
              This data is collected upon input and is used to improve the
              utility of our Site’s tools.
            </p>
            <p className="modal__group-content">
              When interacting with our Site and certain data is automatically
              collected from your device or web browser. More information about
              these practices is included in the “Cookies” section of this
              privacy policy below. This data includes:
            </p>
            <ul className="modal__group-content">
              <li>
                Device IDs, call state, network access, storage information and
                battery information; and
              </li>
              <li>
                Cookies, IP addresses, referrer headers, data identifying your
                web browser and version, and web beacons and tags.
              </li>
            </ul>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Tools to Manage What Personal Data We Collect
            </h3>
            <p className="modal__group-content">
              When using our Site, we also provide in-time notice or obtain
              consent for certain practices.
            </p>
            <p className="modal__group-content">
              In many cases, your web browser or mobile device platform will
              provide additional tools to allow you to control when your device
              collects or shares particular categories of personal data. For
              example, your mobile device or web browser may offer tools to
              allow you to manage cookie usage or location sharing. We encourage
              you to familiarize yourself with and use the tools available on
              your devices.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Why and How Do We Use Your Personal Data?
            </h3>
            <div className="modal__sub-group">
              <p className="modal__group-content">
                We use your personal data in the following ways:
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">
                To Operate, Improve and Maintain our Business, Products and
                Services
              </h4>
              <p className="modal__group-content">
                We use the personal data you provide to us to operate our
                business. For example, the “suggested ranking” feature uses your
                personal information to suggest a preliminary ranking for you,
                which is intended to streamline your research. Personal
                information may be used to suggest relevant jobs for you outside
                of this process. Personal and usage information may also be used
                to improve the design and function of the site.
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">
                To Protect Our or Others' Rights, Property or Safety
              </h4>
              <p className="modal__group-content">
                We may use your data to determine how you use the Hetchie
                website or to detect violations of our TOS or illegal use, and
                to comply with the law, court orders, or government requests.
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">
                For General Research and Analysis Purposes
              </h4>
              <p className="modal__group-content">
                We use data about how our visitors use our Site and services to
                understand user preferences.
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">Other Purposes</h4>
              <p className="modal__group-content">
                We may also use your personal data in other ways and will obtain
                your consent where necessary.
              </p>
            </div>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Sharing of Your Personal Data
            </h3>
            <p className="modal__group-content">
              Hetchie does not have any third-parties with which your personal
              data is shared. If Hetchie begins to employ third-party data
              processers, then the privacy policy will be updated to reflect
              their involvement.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Protection and Management of Your Personal Data
            </h3>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">Encryption & Security</h4>
              <p className="modal__group-content">
                We use a variety of technical and organizational security
                measures, including encryption and authentication tools,
                tomaintain the safety of your personal data.
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">
                International Transfers of your Personal Data
              </h4>
              <p className="modal__group-content">
                The personal data we collect or process will be stored in the
                USA.
              </p>
            </div>
            <div className="modal__sub-group">
              <h4 className="modal__group-content">
                Retention of your Personal Data
              </h4>
              <p className="modal__group-content">
                Your personal information will be kept as long as you keep your
                Hetchie account. Some elements may be kept longer as is
                necessary to carry out the purposes of this privacy policy and
                Hetchie’s Terms of Service, or as required by applicable law.
              </p>
            </div>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Your Rights Relating to Your Personal Data
            </h3>
            <p className="modal__group-content">
              You have the right to request access to your personal data or an
              electronic copy of your personal data. If inaccurate, your
              personal data may be corrected or modified by you through the
              settings and tools available in the website. Youhave the right to
              request deletion or restriction as provided by applicable law of
              your personal data
            </p>
            <p className="modal__group-content">
              If you would like to access a copy of your personal data, please
              email us at{' '}
              <a className="modal__link" href="mailto:contact@hetchie.com">
                contact@hetchie.com
              </a>
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">Direct Communications</h3>
            <p className="modal__group-content">
              Hetchie may but is not obligated to contact you to inform you of
              relevant changes to the site or its services. This includes
              updates to the privacy policy or changes in relevant deadlines.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">Cookies and Pixel Tags</h3>
            <p className="modal__group-content">
              Hetchie collects information, which may include personal data,
              from your browser when you use our Site. We use avariety of
              methods, such as cookies, to collect information.
            </p>
            <p className="modal__group-content">
              This information helps us understand and remember our users’
              preferences, provide and improve users’ online experience, and
              improve our Site’s functionality. This information may include
              your:
            </p>
            <ul className="modal__group-content">
              <li>IP address, cookie identifier, cookie information; and</li>
              <li>Device identifier, device type, domain, browser type; and</li>
              <li>Operating system, system settings, and time zone; and</li>
              <li>
                Previously visited website, referring URLs, information about
                your interaction with our Site such as click behavior and
                indicated preferences, and access times.
              </li>
            </ul>
            <p className="modal__group-content">
              Through your browser settings, you can choose to turn off all
              cookies or have your device warn you each time a cookie is being
              sent. Note that turning off cookies may cause our Site to not
              function properly.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">
              Changes to Our Privacy Policy
            </h3>
            <p className="modal__group-content">
              Applicable law and our practices may change over time. We strongly
              encourage you to read our privacy policy and keep yourself
              informed of our practices.
            </p>
            <p className="modal__group-content">
              If we update our privacy policy, we will post the updated privacy
              policy on our Site and Apps. If we materially change the way in
              which we process your personal data, we will provide you with
              prior notice, or where legally required, request your consent
              prior to implementing such changes.
            </p>
            <p className="modal__group-content">
              This privacy policy was last modified in August 2020.
            </p>
          </div>
          <div className="modal__group">
            <h3 className="modal__group-content">Questions and Feedback</h3>
            <p className="modal__group-content">
              We welcome questions, comments, and concerns about our privacy
              policy. If you wish to provide feedback or if you have questions
              or concerns, please email us at{' '}
              <a className="modal__link" href="mailto:contact@hetchie.com">
                contact@hetchie.com
              </a>
            </p>
          </div>
        </div>

        <div className="modal__footer">
          <button
            className="modal__button"
            type="button"
            onClick={switchToRegister}
          >
            Create your account
            <FontAwesomeIcon
              className="modal__button-icon"
              icon={faLongArrowAltRight}
            />
          </button>
        </div>
      </Modal>
    </>
  )
}
