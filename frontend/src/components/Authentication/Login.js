import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import '../../Styles/GlobalStyleSheet.css'
import Loader from "../miscellaneous/Loader";



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Fill All The Fields!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      Swal.fire({
        icon: "success",
        title: 'Login Successful.',
        text: 'Welcome To Erx Chat App!',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/chats");
        }
      })

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Oops...',
        text: 'Something Went Wrong submit handler!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-form-group">
          <label>Username/Email</label>
          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="Enter Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-submit-btn">
          {
            loading === true ? <Loader /> : ""
          }
          <button
            className="login-btn"
            onClick={submitHandler}
            isLoading={loading}
          >
            Log-In
          </button>
          <span className="forgot-pass">Forgot Password?</span>
        </div>
      </div>
    </>
  );
};

export default Login;
