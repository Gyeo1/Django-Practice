import React from "react";
import { Route } from "react-router";
//account에 관한 컴포넌트 호출시 사용한다.
import Login from "./Login";
import Profile from "./Profile";

function AccountRoutes({ match }) {
  //match를 활용해 상위 컴포넌트에서 사용한 url에 이어 붙이기 가능
  return (
    <>
      <Route exact={true} path={match.url + "/profile"} component={Profile} />
      <Route exact={true} path={match.url + "/login"} component={Login} />
    </>
  );
}
export default AccountRoutes;
