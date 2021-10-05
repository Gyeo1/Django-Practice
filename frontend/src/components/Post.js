import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
function Post({ post }) {
  const { id, caption, location, photo } = post;
  //    <div>{JSON.stringify(post)}</div> //object를 직렬화 해서 보여줘야된다.
  return (
    //key를 쓰는 이유 ==>map을 사용해서 전체를 순회? Element의 식별자가 필요로 하다
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} style={{ width: "100px" }} />}
        actions={[<HeartOutlined />]}
      >
        <Card.Meta
          avatar={<Avatar size="large" icon={<UserOutlined />} />}
          title={location}
          description={caption}
        />
      </Card>
      {/* {caption}, {location}
      <img src={photo} alt={caption} style={{ width: "100px" }} /> */}
    </div>
  );
}

export default Post;
