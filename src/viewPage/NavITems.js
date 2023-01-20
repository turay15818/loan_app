/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import _nav from "../viewPage/NavITems.js"
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";

import { useNavigate } from "react-router-dom";
const NavItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
    }, [isError, navigate]);

    return (
        <div>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <_nav />
        </div>
    );
};

export default NavItems;
