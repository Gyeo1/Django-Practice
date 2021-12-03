import React from "react";
import "./AppLayout.scss";
import { Input, Menu } from "antd";
import SuggestionList from "./SuggestionList";
import StoryList from "./StoryList";
function AppLayout({ children, sidebar }) {
  let style1 = {
    display: "inline-block",
    width: "150px",
    height: "50px",
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img
            src="https://fontmeme.com/images/instagram-new-logo.png"
            style={style1}
            alt="Logo"
          />
        </h1>
        <div className="serach">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            {/* mode로 메뉴를 수평적으로 설정 원래는 아래로 가있었다.  */}
            <Menu.Item>메뉴1</Menu.Item>
            <Menu.Item>메뉴2</Menu.Item>
            <Menu.Item>메뉴3</Menu.Item>
          </Menu>
        </div>
      </div>

      <div className="contents">{children}</div>
      <div className="sidebar">
        {sidebar}
        {/* <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList style={{ marginBottom: "1rem" }} /> */}
      </div>
      <div className="footer">&copy; 2021. Gyeol</div>
    </div>
  );
}
export default AppLayout;
