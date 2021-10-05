import React from "react";
import AppLayout from "../components/AppLayout";
import About from "./About";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
//라우팅을 위해 사용, 매칭되는 단하나의 컴포넌트만 라우팅 시키는게 switch
// import AccountRoutes from "./accounts/index";
import Signup from "./accounts/Signup";
import Login from "./accounts/Login";
import Profile from "./accounts/Profile";

function Root() {
  return (
    <AppLayout>
      {/* <Route exact={true} path="/accounts" component={AccountRoutes} /> */}
      {/* 아래 3줄은 accounts 관련 경로이다. */}
      <Route exact={true} path="/accounts/signup" component={Signup} />
      <Route exact={true} path="/accounts/login" component={Login} />
      <Route exact={true} path="/accounts/Profile" component={Profile} />

      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/about" component={About} />
    </AppLayout>
  );
}
export default Root;
