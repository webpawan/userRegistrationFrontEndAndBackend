import React, { useState } from "react";
import "./style/registration.css";
import img from "../../assets/images/flat design.jpg";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpAndSignIn = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [newPassword, setnewPassword] = useState();

  const submitHandler = async (e) => {
    if (!name || !email || !password) {
      return toast.error("Fill the all fields", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        // theme: "dark",
      });
    }

    try {
      const { data } = await toast.promise(
        axios.post("/api/user/signup", { name, email, password }),
        {
          pending: "registration in process",
          success: "registration is completed",
          error: "try with different email'id ",
        }
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      } else {
        res.status(400).send("user trying with same email id");
      }
    } catch (error) {
      res.status(400).send("signUp Problem");
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Fill the all fields", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
      });
    }

    try {
      const { data } = await toast.promise(
        axios.post("/api/user/signin", { email, password }),
        {
          pending: "signin in process",
          success: "signin is completed",
          error: "please enter valid user details ",
        }
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      }
    } catch (error) {
      res.status(400).json("signin Problem");
    }
  };

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || !newPassword) {
      return toast.error("Fill the all fields", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      const { data } = await toast.promise(
        axios.put("/api/user/password", { email, password, newPassword }),
        {
          pending: "create new password in process",
          success: " password successfully changed",
          error: "please enter valid user details ",
        }
      );

      if (data) {
        localStorage.removeItem("userInfo");
        navigate("/");
        res.status(200).json("user logout");
      } else {
        res.status(400).json("password create  Problem");
      }
    } catch (error) {
      res.status(400).send("password create  Problem");
    }
  };

  if (page === 0) {
    return (
      <>
        <ToastContainer />

        <section
          className="vh-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#17182f" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src={img}
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form>
                          <h5
                            className="fw-normal mb-3 pb-3 display-6"
                            style={{ letterSpacing: "1px" }}
                          >
                            Create Your Account
                          </h5>
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              name
                            </label>
                          </div>
                          <div className="form-outline mb-2">
                            <input
                              type="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Email address
                            </label>
                          </div>

                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="button"
                              onClick={submitHandler}
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <p className="small mb-5 pb-lg-2  mx-auto">
                    <a
                      className="text-secondary"
                      href="#!"
                      onClick={() => setPage(2)}
                    >
                      Forgot password?
                    </a>
                  </p>
                  <div className="  mx-auto text-dark  ">
                    <p className="mb-2">
                      Do you have already account please{" "}
                      <button
                        className="mx-2 btn btn-dark btn-lg btn-block"
                        type="button"
                        onClick={() => setPage(1)}
                      >
                        Log in
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (page === 1) {
    return (
      <>
        <ToastContainer />

        <section
          className="vh-100  d-flex justify-content-center align-items-center "
          style={{ backgroundColor: "#17182f" }}
        >
          <div className="container  h-70 overflow-hidden">
            <div className="row d-flex justify-content-center align-items-center h-70">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your email and password!
                      </p>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label my-1" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>
                      <div className="form-outline form-white my-1">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a
                          className="text-white-50"
                          href="#!"
                          onClick={() => setPage(2)}
                        >
                          Forgot password?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        onClick={loginSubmitHandler}
                      >
                        Login
                      </button>
                    </div>
                    <div>
                      <p className="mb-0 mt-2">
                        Don't have an account?{" "}
                        <a
                          href="#"
                          className="text-white-50 fw-bold"
                          onClick={() => setPage(0)}
                        >
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <ToastContainer />

        <section className="vh-100 bg-primary d-flex justify-content-center align-items-center ">
          <div className="container  h-70 overflow-hidden">
            <div className="row d-flex justify-content-center align-items-center h-70">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className=" ">
                      <h2 className=" mb-5 text-uppercase">Make new Password</h2>

                      <div className="form-outline form-white mb-3">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label my-1" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          old Password
                        </label>
                      </div>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          onChange={(e) => setnewPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          New Password
                        </label>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        onClick={forgetPasswordHandler}
                      >
                        Create New Password
                      </button>
                    </div>
                    <div>
                      <p className="mb-0 mt-3">
                        Don't have an account?{" "}
                        <a
                          href="#!"
                          className="text-white-50 fw-bold"
                          onClick={() => setPage(0)}
                        >
                          Sign Up
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 mt-3">
                        Back to Login page
                        <a
                          href="#!"
                          className="text-white-50 fw-bold"
                          onClick={() => setPage(1)}
                        >
                          LogIn
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default SignUpAndSignIn;
