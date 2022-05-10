import React from "react";
import "./StoryList.scss";
import { Card } from "antd";
const StoryList = ({ style }) => {
  return (
    <div style={style}>
      <Card title="Stories" size="small">
        {" "}
        보여주고 싶은 Story를 활성화 시키세요{" "}
      </Card>
    </div>
  );
};

export default StoryList;
