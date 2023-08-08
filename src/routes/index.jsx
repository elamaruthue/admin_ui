import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullScreenLoader from "../components/common/loader";
import SignIn from "../auths/sign";
import SideBar from "../components/sideBar";
import Employee from "../screens/employee";
import Home from "../screens/home";
import { Default } from "../screens/pageNotFount";
import Supervisor from "../screens/supervisor";

export default function NavRoute({state}) {
  const { data } = useSelector(({ login }) => login);
  console.log('data..........',data);
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route element={<>{data  ? <SideBar /> : <SignIn />}</>}>
              <Route path="home" element={<Home />} />
              <Route path="" element={<Employee />} />
              <Route path="*" element={<Default />} />
              <Route path="supervisor" element={<Supervisor />} />
            </Route>
            <Route path="login" element={<SignIn />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
