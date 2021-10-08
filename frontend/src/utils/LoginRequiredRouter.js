import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
export default function LoginRequiredRouter({
  component: Component,
  ...kwargs
}) {
  // const [authenticate, setAutheticate] = useState([]);
  // let isAuthenticate = "";
  // useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     return setAutheticate(JSON.parse(localStorage.getItem("jwtToken")) || []);
  //   });
  // }, []);

  let isAuthenticate = window.localStorage.getItem("jwtToken") ? true : false;
  console.log(isAuthenticate);
  //   return <Route {...kwargs} component={component} />;
  // } else {
  //   return <Route {...kwargs} render={(props) => {if(is)} />;
  // }

  return (
    //리턴 값을 토큰 값이 있냐 없냐로 구분한다.
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticate) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
//const valueToStore = value instanceof Function ? value(storedValue) : value;
