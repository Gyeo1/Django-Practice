import React from "react";
import AppLayout from "../components/AppLayout";
import About from "./About";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
//라우팅을 위해 사용, 매칭되는 단하나의 컴포넌트만 라우팅 시키는게 switch
// import AccountRoutes from "./accounts/index";
import Signup from "./accounts/Signup_antd";
import Login from "./accounts/Login";
import Profile from "./accounts/Profile";
import LoginRequiredRouter from "../utils/LoginRequiredRouter";
function Root() {
  return (
    <AppLayout>
      <LoginRequiredRouter exact path="/" component={Home} />
      <Route exact path="/accounts/signup" component={Signup} />
      <Route exact path="/accounts/login" component={Login} />
      <LoginRequiredRouter exact path="/accounts/profile" component={Profile} />
      <Route exact={true} path="/about" component={About} />
    </AppLayout>
  );
}
export default Root;
