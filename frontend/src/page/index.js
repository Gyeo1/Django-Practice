import React from "react";
import AppLayout from "../components/AppLayout";
import About from "./About";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
//라우팅을 위해 사용, 매칭되는 단하나의 컴포넌트만 라우팅 시키는게 switch
import AccountRoutes from "./accounts";
function Root() {
  return (
    <AppLayout>
      <Route exact={true} path="/" component={Home} />
      <Route exact path="/about" component={About} />
      {/* <Route path="/" /> <About /> */}
      {/* 만약 exact를 사용 안하게 된다면 ==> about으로 이동시 Home도 보여진다. */}
      <Route exact path="/accounts" component={AccountRoutes} />
    </AppLayout>
  );
}
export default Root;
