import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import Loader from "../miscellaneous/Loader";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Fill All The Fields!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords Do Not Match!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome To Erx Chat App!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error Occurred!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Select an Image!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Select an Image!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setPicLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup-form-groups">
          <div className="signup-form-group">
            <label>Name</label>
            <input
              placeholder="Enter Username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="signup-form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="signup-form-groups">
          <div className="signup-form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup-form-group">
            <label>Password</label>
            <input
              name="confirmPassword"
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </div>
        </div>

        <div className="signup-submit-btn">
          <input
            className="signup-file-upload"
            type="file"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          {
            picLoading === true ? <Loader /> : ""
          }
          <button
            className="signup-btn"
            onClick={submitHandler}
            isLoading={picLoading}
          >
            Sign-Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
