import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../common/custom-button";
import {axiosApi} from "../api/api-interceptor";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosApi.post("/logout");
      if (response.status === 200) {
        toast.success("logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging out:", error);
    }
  };

  return (
    <>
      <CustomButton title="Logout" onClick={handleLogout} isPrimary={true}>
        Logout
      </CustomButton>
      <ToastContainer />
    </>
  );
};

export default Logout;
