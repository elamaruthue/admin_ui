import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "../auths/sign";
import SideBar from "../components/sideBar";
import Employee from "../screens/employee";
import Home from "../screens/home";
import { Default } from "../screens/pageNotFount";

export default function NavRoute() {
  const isLogin = true;
  return (
    <div>
      <Routes>
        {!isLogin ? (
          <Route path="/login" element={<SignIn />} />
        ) : (
          <Route element={<SideBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="*" element={<Default />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}
