// localohst:3000/about으로 진입시 보여줄 페이지
import React from "react";

function About() {
  localStorage.removeItem("jwtToken"); //로그인으로 들어오면 jwtToken 값은 초기화 시켜준다.
  return <div>About 페이지 입니다</div>;
}
export default About;
