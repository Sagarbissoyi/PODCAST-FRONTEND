

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
 import deploylink from '../../deplomentvaraible/title';

const Header = () => {
  const [userData, setUserData] = useState(null); // Initialize state with null
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${deploylink}/api/v1/user-details`, {
          withCredentials: true, // Include credentials (cookies)
        });
        setUserData(res.data.user); // Update user data state
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserData(null); // Clear user data on failure
      }
    };
    fetchUserDetails();
  }, []);

  // Handle Logout
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${deploylink}/api/v1/logout`,
        {},
        { withCredentials: true } // Include credentials (cookies)
      );
      dispatch(authActions.logout()); // Dispatch Redux logout action
      setUserData(null); // Clear user data locally
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {userData && (
        <div className="bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {userData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{userData.email}</p>
          </div>
          <div>
            <button
              className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
