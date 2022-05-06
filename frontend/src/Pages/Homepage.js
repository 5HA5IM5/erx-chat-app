import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import '../Styles/GlobalStyleSheet.css'
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Fade from 'react-reveal/Fade';


function Homepage() {
  const history = useHistory();
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <>
      <div className="homepage">
        <div className="homepage-left">
          <div className="homepage-left-content">
            <img
              alt="erx-logo"
              className="homepage-left-image"
              src="https://dev-portal.evolutionrx.us/assets/admin/media/logos/admin_logo.png"
            />
            <h3 className="homepage-left-heading">
              Comprehensive Technology platform for Clinical Trials
            </h3>
            <p className="homepage-left-text">
              Our Unified Platform with SSO capabilities is your gateway to decentralized trials.
            </p>
          </div>
        </div>
        <div className="homepage-right">
          <h1 className="homepage-right-heading">ERX CHAT APP</h1>
          <div className="homepage-right-tabs">
            <button className={`tab-link ${login && 'active'}`} onClick={() => (setlogin(true) & setsignup(false))}>Log-In</button>
            <button className={`tab-link ${signup && 'active'}`} onClick={() => (setsignup(true) & setlogin(false))} >Sign-Up</button>
          </div>
          <span className={`${login ? ' show' : 'hide'}`}>
            <Fade >
              <Login />
            </Fade>
          </span>
          <span className={`${signup ? ' show' : 'hide'}`}>
            <Fade >
              <Signup />
            </Fade>
          </span>
        </div>
      </div>

    </>
  );
}

export default Homepage;
