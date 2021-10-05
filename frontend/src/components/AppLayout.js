import React from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
function AppLayout({ children }) {
  return (
    //최상위 컴포넌트로 부터 받는 값이 children이다.
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
export default AppLayout;
