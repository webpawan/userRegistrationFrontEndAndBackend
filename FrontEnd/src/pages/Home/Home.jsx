import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [editing, setEditing] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setData(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  const handleRename = async () => {
    const userId = data._id;

    if (!name)
      return toast.error("please change the name", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    try {
      const { data } = await toast.promise(
        axios.put(`/api/user/rename`, {
          userId,
          name,
        }),
        {
          pending: "name is changing",
          success: "name change is successfully!",
          error: "An error occurred while changeing name.",
        }
      );
      setData(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      setEditing(true);
    } catch (error) {
      res.status(404).send("problem with rename  try again");
    }
    setName("");
  };

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid vh-100 vw-100  d-flex flex-column justify-content-center align-items-center"
        style={{ background: "#ed5627" }}
      >
        {editing ? (
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex  align-items-center">
              <h1 className="display-3 mb-3 mx-2">Welcome</h1>
              <h2 className="  text-center text-white display-5">
                {data.name}
              </h2>
            </div>
            <span
              className=" mx-2 pen"
              onClick={() => setEditing(false)}
              data-toggle="tooltip"
              data-placement="top"
              title="click here and change your name"
            >
              <i className="fa-solid fa-pen text-white"></i>
            </span>
          </div>
        ) : (
          <div className="flex items-center my-2">
            {" "}
            <input
              type="text"
              className="input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <span
              className="mx-2 pen"
              onClick={handleRename}
              data-toggle="tooltip"
              data-placement="top"
              title=" click for save"
            >
              <i className="fa-solid fa-pen"></i>
            </span>
          </div>
        )}
        <h5>email: {data.email}</h5>
        <button className="btn  btn-outline-light mt-5" onClick={logOut}>
          LogOut
        </button>
      </div>
    </>
  );
};

export default Home;
